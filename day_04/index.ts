import { access, readFileSync } from "fs";
const matrix = readFileSync('input', "utf-8").split('\n')?.map(x => x.split(''));
// npx ts-node index.ts 

console.table(matrix);

const xmas = ['X', 'M', 'A', 'S']
let total = 0;


const isXmas = (searchArr: string[]) : boolean => {
    const xmasString = xmas.join('');
    const correct = (searchArr.join('') === xmasString || searchArr.reverse().join('') === xmasString);
    return correct
}


for (let x = 0; x < matrix.length; x++) {
    const row = matrix[x];

    // console.log('==============');
    for (let y = 0; y < row.length; y++) {
        
        // HORIZONTAL
        let horizontalStr = row.slice(y, y + xmas.length);        
        
        // VERTICAL
        let vertical = []
        
        //DIAGONAL
        let diagonal_downleft = []
        let diagonal_downright = []
        


        for (let index = 0; index < xmas.length; index++) {

            if(x + index < matrix.length) {
                vertical.push(matrix[x + index][y]);

                // // DIAGONAL DOWNWARDS
                if(y - index >= 0) diagonal_downleft.push(matrix[x + index][y - index]);
                if(y + index < row.length) diagonal_downright.push(matrix[x + index][y + index]);
            } else {
                continue;
            }
        }

        if(isXmas(horizontalStr)) total += 1;
        if(isXmas(vertical)) total += 1;
        if(isXmas(diagonal_downleft)) total += 1;
        if(isXmas(diagonal_downright)) total += 1;
    }


}

console.log('total', total);

// horizontal = 5