import { access, readFileSync } from "fs";
const input = readFileSync('input', "utf-8").split('\n');

//run npx ts-node index.ts 

const isBetweenDelimiters = (current: number, next?: number) : boolean => {
    if(!next) return true;
    return Math.abs(current - next) > 0 && Math.abs(current - next) <= 3;
}

const isIncreasing = (value: number, index: number, arr: number[]) : boolean => {
    let nextValue = arr[index + 1];
    return nextValue? value > nextValue : true;

}
const isDecreasing = (value: number, index: number, arr: number[]) : boolean => {
    let nextValue = arr[index + 1];
    return nextValue ? value < nextValue: true;
}

const isSafe = (report: number[]) => {
    const validReport = report.every((level, index, arr) => isBetweenDelimiters(level, arr[index + 1])) && (report.every(isIncreasing) || report.every(isDecreasing));
    if(validReport) return validReport;
    
    // do check
    const validAfterAll = report.some((value, index) => {
        const copy = structuredClone(report);
        copy.splice(index, 1);

        const isLinear = (copy.every(isIncreasing) || copy.every(isDecreasing));
        const validBetweenDelimiters = copy.every((copyLevel, copyIndex, copyArray) => isBetweenDelimiters(copyLevel, copyArray[copyIndex + 1]))

        return isLinear && validBetweenDelimiters;
    })

    return validAfterAll;
    
}

const reports = input.map(report => report.split(' ').map(Number));
const validReports = reports. filter(report => report.length ? isSafe(report) : false)

console.log('valid reports', validReports.length);