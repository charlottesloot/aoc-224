import { access, readFileSync } from "fs";
const input = readFileSync('input', "utf-8");
// npx ts-node index.ts 

const regex = /mul\([0-9]{1,3},[0-9]{1,3}\)/g;
const matches = input.match(regex) || [];
let total = 0

for (let index = 0; index < matches.length; index++) {
    const element = matches[index];
    let [x,y] = element.substring(4, element.length - 1).split(',')
    total += (parseInt(x) * (parseInt(y)))
}

console.log(matches);
console.log('total', total);
