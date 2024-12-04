import { access, readFileSync } from "fs";
const matrix = readFileSync('input', "utf-8").split('\n')?.map(x => x.split(''));
// npx ts-node index.ts 

console.table(matrix);

const xmas = ['X', 'M', 'A', 'S']
const mas = ['M', 'A', 'S'];
const centerLetter = mas.at(mas.length/2);
let total = 0;


const isXmas = (searchArr: string[]) : boolean => {
    const xmasString = xmas.join('');
    const correct = (searchArr.join('') === xmasString || searchArr.reverse().join('') === xmasString);
    return correct
}
const isMasInX = (searchArr: string[]) : boolean => {
    const masString = mas.join('');
    const correct = (searchArr.join('') === masString || searchArr.reverse().join('') === masString);
    return correct
}

for (let x = 0; x < matrix.length; x++) {
    const row = matrix[x];

    // console.log('==============');
    for (let y = 0; y < row.length; y++) {
   
        const letter = row[y];

        const diagonal1 : string[] = [];
        const diagonal2 : string[] = [];

        if(letter !== centerLetter) continue;

        //check if possible

        const topleftExists = (x - 1 >= 0) && (y - 1 >= 0);
        const bottomRightExists = (x + 1 < matrix.length) && (y + 1 < row.length);

        const topRightExists = (x - 1 >= 0) && (y + 1 < row.length);
        const bottomLeftExists = (x + 1 < matrix.length) && (y - 1 >= 0);


        if(topleftExists && bottomRightExists && topRightExists && bottomLeftExists){
            diagonal1.push(matrix[x - 1][y - 1], letter, matrix[x + 1][y + 1]);
            diagonal2.push(matrix[x - 1][y + 1], letter, matrix[x + 1][y - 1]);
        }
        

        // for (let index = 0; index < Math.floor(mas.length / 2); index++) {
        //     // if(x + index < matrix.length) {
        //     //     vertical.push(matrix[x + index][y]);
        //     //     // // DIAGONAL DOWNWARDS
        //     //     if(y - index >= 0) diagonal_downleft.push(matrix[x + index][y - index]);
        //     //     if(y + index < row.length) diagonal_downright.push(matrix[x + index][y + index]);
        //     // } else {
        //     //     continue;
        //     // }
        // }

        if(isMasInX(diagonal1) && isMasInX(diagonal2)) total += 1;
        // if(isXmas(horizontalStr)) total += 1;
        // if(isXmas(vertical)) total += 1;
        // if(isXmas(diagonal_downleft)) total += 1;
        // if(isXmas(diagonal_downright)) total += 1;
    }


}

console.log('total', total);
