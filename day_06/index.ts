import { dir } from "console";
import { access, readFileSync } from "fs";
let matrix = readFileSync('input', "utf-8").split('\n')?.map(x => x.split(''));
// npx ts-node index.ts 

type Direction = '^' | 'v' | '<' | '>';

const findCoordinates = (matrix: string[][], target: string): number[] | null => {
    for (let x = 0; x < matrix.length; x++) {
        // const element = matrix[X];
        for (let y = 0; y < matrix[x].length; y++) {
            const pos = matrix[x][y];
            if(pos === target) return [x, y]
        }
    }
    return null;
}

let guard : Direction = '^';
let guardIsPatrolling = true;

let guardPosition : number[] = findCoordinates(matrix, guard) ?? [0, 0]; // TODO FIND INITIAL BASED ON MATRIX CHAR '^'
let totalDistinctPositions = 0;


function avoidObstacle() : Direction {
    if(guard === '^') return '>';
    else if(guard === '>') return 'v';
    else if(guard === 'v') return '<';
    else return '^';
}

function getNextPosition(currentPosition: number[]) {
    if(guard === '^') return  [currentPosition[0] - 1, currentPosition[1]]; 
    else if(guard === 'v') return [currentPosition[0] + 1, currentPosition[1]]; 
    else if(guard === '<') return [currentPosition[0], currentPosition[1] - 1]; 
    else return [currentPosition[0], currentPosition[1] + 1]; 
}

while(guardIsPatrolling){
    // let nextPos = structuredClone(guardPosition);
    let nextPos = getNextPosition(structuredClone(guardPosition));
    console.log(nextPos, guard);
    // console.log('current position ', guardPosition, ' // next position', nextPos);
    try {

        const tile = matrix[nextPos[0]][nextPos[1]];

        if(tile === '#' ) {
            guard = avoidObstacle();
            continue;
        } else if(tile === 'X'){
            totalDistinctPositions -= 1;
        }

        totalDistinctPositions += 1;

        guardPosition = nextPos;
        matrix[nextPos[0]][nextPos[1]] = 'X';

        if(nextPos[0] < 0 || nextPos[0] > matrix.length -1 || nextPos[1] < 0 || nextPos[1] > matrix[0].length -1) throw `manual error: ${nextPos}`;


    } catch (error) {
        console.log('left the premise', error);
        guardIsPatrolling = false;
    }
    
}

// let newtotal = 0;
// for (let y = 0; y < matrix.length; y++) {
//    for (let x = 0; x < matrix[y].length; x++) {
//         const element = matrix[y][x];
//         if(element === 'X') newtotal++;
//    }
// }

// 4432 ==> too low

console.table(matrix);
console.log(totalDistinctPositions);
// console.log(newtotal);




