import { log } from "console";
import { access, readFileSync } from "fs";
let [rules, updates] = readFileSync('input', "utf-8").split('\n\n').map(x => x.split('\n').map(x => x.replace('|', ',')).map(x => x.split(',').map(x => Number(x))))
const set = Array.from(new Set(rules.flat()));
// npx ts-node index.ts 

console.log(rules)
// console.log(updates)

let total = 0;


for (let index = 0; index < updates.length; index++) {
    const update = updates[index]
    let valid = true;

    console.log('---------UPDATE------------')

    for (let i = 0; i < rules.length; i++) {
        if(!valid) break;

        const rule = rules[i];
        const [first, second] = [update.indexOf(rule[0]), update.indexOf(rule[1])]

        if(first === -1 || second === -1 ) continue;
        if(first < second) continue;

        valid = false;
    }
    
    if(valid) continue;
    
    
    // sort correctly
    let updateSorted = structuredClone(update);
    console.log('====== not valid ========= ', updateSorted);
    console.table(rules)
    
    updateSorted.sort((a,b) => {
        let swap = false;

        // 
        for (let i = 0; i < rules.length; i++) {  

            const [validFirstIndex, validSecondIndex] = [update.indexOf(rules[i][0]), update.indexOf(rules[i][1])]
            // console.log('test', validFirstIndex, validSecondIndex), b , a;

            if(validFirstIndex !== -1 && validSecondIndex !== -1) {
                // SWAP CHECK

                console.log('SWAP CHECK : current rule', rules[i], ' / current a b ', b, a, 'valid indexes 1 2 ' , validFirstIndex, validSecondIndex);

                if(a === rules[i][0] && b === rules[i][1]) {
                    swap = true;
                    console.log('SWAP!', b, a, ' / to become / ', rules[i]);
                    break;
                }

            } else continue;

        }
       
        console.log('swap? ', swap, ' // ' ,b, a)
        return swap ? -1 : 0
    })

    


    console.log('reworked  ', updateSorted);

    // get middle number
    total += updateSorted.at(updateSorted.length/2) || 0;
    
}

console.log('total', total);