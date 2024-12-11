import { readFileSync } from "fs";
let data = readFileSync('input', "utf-8").split('\n')?.map(x => x.split(':'));
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
        
        if (recursive(index + 1, currentValue + equation[index + 1])) return true; // Stop further recursion if a valid result is found
        if (recursive(index + 1, currentValue * equation[index + 1])) return true; // Stop further recursion if a valid result is found

        return false; // No valid combination found
    }

    return recursive(0, equation[0]);
}


function checkIfThereIsValidOperatorCombinationResult2(equation: number[], calibrationResult: number) : boolean {
    let equasionBackup = structuredClone(equation);
    
    const recursive = (index : number, currentValue: number) => {
        // save result
        if (index === equation.length - 1) {
            return currentValue === calibrationResult
        }


        if (recursive(index + 1, currentValue + equation[index + 1])) return true; // +
        if (recursive(index + 1, currentValue * equation[index + 1])) return true;  // *
        
        // "||" operator (combine current and next numbers)
        const combinedValue = Number(`${currentValue}${equation[index + 1]}`);
        if (recursive(index + 1, combinedValue)) return true;

        return false; // No valid combination found
    }

    return recursive(0, equation[0]);
}

for (let index = 0; index < data.length; index++) {
    const result = Number(data[index][0]);
    const operation = data[index][1].split(' ').map(x => Number(x));
    
    const x = checkIfThereIsValidOperatorCombinationResult2(operation, result);
    if(x) calibrationResult += result;
    // console.log(data[index] , ` ::: `, x)

}

console.log(calibrationResult)