import { readFileSync } from "fs";
let data = readFileSync('testinput', "utf-8").split('\n')?.map(x => x.split(':'));
// npx ts-node index.ts 
// const operators = ['+', '*'];
const operators = ['+', '*', '||'];
let calibrationResult = 0

console.log(data)

function checkIfThereIsValidOperatorCombinationResult(equation: number[], calibrationResult: number) : boolean {
    
    const recursive = (index : number, currentValue: number) => {
        // save result
        if (index === equation.length - 1) {
            return currentValue === calibrationResult
        }

        for (const operator of operators) {
            if (operator === "+") {
                if (recursive(index + 1, currentValue + equation[index + 1])) return true; // Stop further recursion if a valid result is found
                
            } else if (operator === "*") {
                if (recursive(index + 1, currentValue * equation[index + 1])) return true; // Stop further recursion if a valid result is found
            } 
        }

        return false; // No valid combination found
    }

    return recursive(0, equation[0]);
}

for (let index = 0; index < data.length; index++) {
    const result = Number(data[index][0]);
    const operation = data[index][1].split(' ').map(x => Number(x));
    
    const x = checkIfThereIsValidOperatorCombinationResult(operation, result);
    if(x) calibrationResult += result;
    // console.log(data[index] , ` ::: `, x)

}

console.log(calibrationResult)