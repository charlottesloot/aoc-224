import { readFileSync } from "fs";
let data = readFileSync('input', "utf-8").split('').map(x => Number(x));
// npx ts-node index.ts 

const slots = data.map((value, index) => index % 2 === 0 ? [...Array(value).fill(index / 2)] : [...Array(value)]).flat();


console.log('data', slots);


for (let index = 0; index < slots.length; index++) {
    // console.log('***********************');
    try {
        const lastSlot = slots.at(-1);

        const moveToIndex = slots.findIndex(x => x === undefined);
        if(moveToIndex === -1) break;

        slots[moveToIndex] = lastSlot;
        slots.pop();

    } catch (error) {
        console.log('something happened',  error);
    }
};

const total = slots.reduce((total, current, currindex) => {
    return total += current * currindex;
}, 0)

console.log('slotsAfterSort', slots, ' total checksum ', total)
