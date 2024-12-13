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


function avoidObstacle(currentDirection: Direction) : Direction {
    if(currentDirection === '^') return '>';
    else if(currentDirection === '>') return 'v';
    else if(currentDirection === 'v') return '<';
    else return '^';
}

function getNextPosition(currentPosition: number[], direction: Direction) {
    if(direction === '^') return  [currentPosition[0] - 1, currentPosition[1]]; 
    else if(direction === 'v') return [currentPosition[0] + 1, currentPosition[1]]; 
    else if(direction === '<') return [currentPosition[0], currentPosition[1] - 1]; 
    else return [currentPosition[0], currentPosition[1] + 1]; 
}

const visitedPositions = new Set<string>([]);


function attemptedInception(startPosition : number[], startDirection: Direction){
    let position = startPosition;
    let direction = startDirection;
    let goingStrong = true;

    // const visitedPositions = new Set<string>([]);
    visitedPositions.clear()
    let isLoop = false;

    do {
        
        const nextPosition = getNextPosition(position, direction);
        if(nextPosition[0] < 0 || nextPosition[0] >= matrix.length || nextPosition[1] < 0 || nextPosition[1] >= matrix[0].length ) {
            isLoop = false;
            goingStrong = false;
            return false;
        };
        

        const tile = matrix[nextPosition[0]][nextPosition[1]];
        if(tile === '#' ) {
            direction = avoidObstacle(direction);
            continue;
        } 

        const uniquePositionCode : string = `x=${nextPosition[0]}, y=${[nextPosition[1]]} ${direction}`;
        if(visitedPositions.has(uniquePositionCode)) {
            // console.log('NU WEL');
            isLoop = true;
            goingStrong = false;
            return true;
        };

        visitedPositions.add(uniquePositionCode);
        position = nextPosition;
        
    } while (goingStrong);

    return isLoop;
}

let infiniteLoopOptions = new Set<string>([]);

while(guardIsPatrolling){
    // let nextPos = structuredClone(guardPosition);
    let nextPos = getNextPosition(structuredClone(guardPosition), guard);
    // console.log(nextPos, guard);
    // console.log('current position ', guardPosition, ' // next position', nextPos);
    try {

        const tile = matrix[nextPos[0]][nextPos[1]];
        

        if(tile === '#' ) {
            guard = avoidObstacle(guard);
            continue;
        } else if(tile === 'X'){
            totalDistinctPositions -= 1;
        }

        // console.log('************* ', guardPosition, guard, ' *************');

        // ****** PART 2 ***********
        matrix[nextPos[0]][nextPos[1]] = '#';
        const isSuccessfulLoop = attemptedInception(structuredClone(guardPosition), structuredClone(guard));
        if(isSuccessfulLoop){
            infiniteLoopOptions.add(`x=${nextPos[0]}, y=${nextPos[1]}`); // infiniteLoopOptions is a SET.
        }
        matrix[nextPos[0]][nextPos[1]] = tile; // reset to original tile
        // ****** PART 2 - END ***********


        totalDistinctPositions += 1;

        guardPosition = nextPos;
        matrix[nextPos[0]][nextPos[1]] = 'X';

        if(nextPos[0] < 0 || nextPos[0] > matrix.length -1 || nextPos[1] < 0 || nextPos[1] > matrix[0].length -1) throw `manual error: ${nextPos}`;


    } catch (error) {
        console.log('left the premise', error);
        guardIsPatrolling = false;
    }
    
}

// 4432 ==> too low
// 1680 ==> too high
// 1560 ==> too high

console.table(matrix);
console.log(totalDistinctPositions, infiniteLoopOptions.size);
// console.log(newtotal);




