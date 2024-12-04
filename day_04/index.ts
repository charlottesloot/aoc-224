import { access, readFileSync } from "fs";
const matrix = readFileSync('testinput', "utf-8").split('\n')?.map(x => x.split(''));
// npx ts-node index.ts 

console.table(matrix);

const xmas = ['X', 'M', 'A', 'S']
let total = 0;


const isXmas = (searchArr: string[]) : boolean => {
    // const searched = searchArr.join('');
    const xmasString = xmas.join('');
    // return searched === xmasString || searched.searchArr.join('');
    const correct = (searchArr.join('') === xmasString || searchArr.reverse().join('') === xmasString);

    console.log('test: ', searchArr.join(''), 'OR', searchArr.reverse().join(''), ' ===> ', xmasString, correct);

    return correct
}


for (let x = 0; x < matrix.length; x++) {
    const row = matrix[x];

    console.log('==============');
    for (let y = 0; y < row.length; y++) {
        
        // HORIZONTAL CHECK get current + next 3 
        let horizontalStr = row.slice(y, y + xmas.length);        
        
        // VERTICAL
        let verticalUP = []
        let verticalDOWN = []

        //DIAGONAL
        let diagonalUP_left = []
        let diagonalUP_right = []
        let diagonalDOWN_left = []
        let diagonalDOWN_right = []
        


        for (let index = 0; index < xmas.length; index++) {


            if(x - index >= 0) {
                // UPWARDS
                verticalUP.push(matrix[x - index][y]);

                // DIAGONAL UPWARDS
                if(y - index >= 0) diagonalUP_left.push(matrix[x - index][y - index]);
                if(y + index < row.length) diagonalUP_right.push(matrix[x - index][y + index]);
            }

            if(x + index < matrix.length) {
                // DOWNWARDS
                verticalDOWN.push(matrix[x + index][y]);

                // DIAGONAL DOWNWARDS
                if(y - index >= 0) diagonalDOWN_left.push(matrix[x + index][y - index]);
                if(y + index < row.length) diagonalDOWN_right.push(matrix[x + index][y + index]);
            }
        }

  
        if(isXmas(horizontalStr)) total += 1;
        if(isXmas(verticalUP)) total += 1;
        if(isXmas(verticalDOWN)) total += 1;
        if(isXmas(diagonalUP_left)) total += 1;
        if(isXmas(diagonalUP_right)) total += 1;
        if(isXmas(diagonalDOWN_left)) total += 1;
        if(isXmas(diagonalDOWN_right)) total += 1;
    }


}

console.log('total', total);