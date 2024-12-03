import { access, readFileSync } from "fs";
const input = readFileSync('input', "utf-8");
// npx ts-node index.ts 

const regex = /mul\([0-9]{1,3},[0-9]{1,3}\)/g;
const extendedRegex = /(mul\((\d+),(\d+)\)|do\(\)|don't\(\))/g;
const matches = input.match(extendedRegex) || [];
let total = 0
let enabled : boolean = true
for (let index = 0; index < matches.length; index++) {
    const element = matches[index];
    if(element === 'do()') {
        enabled = true; 
        continue;
    }
    if(element.includes('don')) {
        enabled = false; 
        continue;
    }
    if(!enabled) continue;
    let [x,y] = element.substring(4, element.length - 1).split(',');
    total += (parseInt(x) * (parseInt(y)))
}

console.log(matches);
console.log('total', total);
