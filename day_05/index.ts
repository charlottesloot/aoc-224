import { log } from "console";
import { access, readFileSync } from "fs";
let [rules, updates] = readFileSync('input', "utf-8").split('\n\n').map(x => x.split('\n').map(x => x.replace('|', ',')).map(x => x.split(',').map(x => Number(x))))
const set = Array.from(new Set(rules.flat()));
// npx ts-node index.ts 

console.log(rules)
console.log(updates)

let total = 0;


for (let index = 0; index < updates.length; index++) {
    const update = updates[index]
    let valid = true;

    console.log('---------', update,'------------')

    // const valid = set.every(pagenum => update.includes(pagenum));
    // console.log('valid', valid);

    // x = vind index van rule[0] in update. 
    // y = vind index van rule[1] in update. 
    // als x < y  ? VALID  : INVALID  + skip next

    for (let i = 0; i < rules.length; i++) {
        if(!valid) break;

        const rule = rules[i];
        const [first, second] = [update.indexOf(rule[0]), update.indexOf(rule[1])]

        console.log('VALID rule check ', rule, ' // first : ', first, ' - second : ', second);

        if(first === -1 || second === -1 ) continue;
        if(first < second) continue;

        valid = false;
    }
    
    if(valid){
        console.log('valid! ', update);
    } else {
        console.log('not valid;;; ', update);
    }
    if(!valid) continue;

    // get middle number
    total += update.at(update.length/2) || 0;
    
}

console.log('total', total);