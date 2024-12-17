import { readFileSync } from "fs";
let data = readFileSync('input', "utf-8").split('').map(x => Number(x));
// npx ts-node index.ts 

const slots = data.map((value, index) => index % 2 === 0 ? [...Array(value).fill(index / 2)] : [...Array(value)]).flat();
const slots2 = data.map((value, index) => index % 2 === 0 ? [...Array(value).fill(index / 2)] : [...Array(value)]);



function partOne(){
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
}


function getAvailable(array : any, index: number) : number[]{
    return array.at(index) ?? [];    
}

function partTwo(){
    console.log('data', slots2);
    for (let index = 1; index <= slots2.length || -index > 0; index++) {
        // console.log('***********************');
        const reverseIndex = slots2.length - index;
        try {
            let lastSlot : any[] = getAvailable(slots2, reverseIndex);
            let moveToIndex = slots2.findIndex(x => x.some(y => y === undefined) && (x.filter(y => y === undefined).length >= lastSlot.length));

            if(lastSlot?.[0] === undefined || moveToIndex === -1 || moveToIndex > reverseIndex || !lastSlot.length ) continue;

            const startReplace = slots2[moveToIndex].findIndex(x => x === undefined);
            slots2[moveToIndex].fill(lastSlot[0], startReplace, startReplace + (lastSlot.length));
            lastSlot.fill(undefined);

        } catch (error) {
            console.log('something happened',  error);
        }
    };
}

function calc(array : number[]) {
    const total = array.reduce((total, current, currindex) => {
        if(current === undefined) return total;
        return total += current * currindex;
    }, 0)
    console.log('slotsAfterSort', array, ' total checksum ', total)
}

// partOne();
// calc(slots);

partTwo();
calc(slots2.flat())