import { readFileSync } from "fs";
let data = readFileSync('input', "utf-8").split('').map(x => Number(x));
// npx ts-node index.ts 


const test = data.map((value, index) => index % 2 === 0 ? [...Array(value).fill(index / 2)] : [...Array(value)]).flat();
const slots = data.map((value, index) => index % 2 === 0 ? [...Array(value).fill(index / 2)] : [...Array(value)]).flat();
const slotsReversed = structuredClone(slots).reverse();
// const slots = data.map((value, index) => index % 2 === 0 ? [...Array(value).fill(index / 2)] : [...Array(value)])
// const flatSlots = structuredClone(slots).flat();
// const flatSlotsReversed = structuredClone(flatSlots).reverse();



console.log('data', slots);
let checksum = 0;


// slots.forEach((element, index) => {
for (let index = 0; index < slots.length; index++) {
    // console.log('***********************');
    try {
        // const lastSlot = structuredClone(slots).reverse()[0];
        const lastSlot = slots.at(-1);

        const moveToIndex = slots.findIndex(x => x === undefined);
        if(moveToIndex === -1) break;
        console.log('slots length', slots.length);
        // console.log('lastSlot',lastSlot, moveToIndex);
        // console.log('moveToIndex', moveToIndex);

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
