const fs = require('fs');
const path = require('path');

let inputData = fs.readFileSync(path.join(__dirname, '..', 'input', 'task13.in'), {encoding:'utf8'});
inputData = inputData.trimEnd();
inputData = inputData.split("\n");

inputData = inputData[1].split(",");
inputData.forEach((num, index) => {
    let parsedNumber = parseInt(num);
    if (isNaN(parsedNumber)) {
        inputData[index] = 1;
    } else {
        inputData[index] = parsedNumber;
    }
});

let startTime = 100000000000000;
let time = startTime;

let timestampFound = false;
let step = 1;
let busesGood = 0;
let busesGoodLast;
for (time = startTime; !timestampFound; time += step) {
    //console.log(time);
    timestampFound = true;
    busesGoodLast = busesGood;
    for (let i = busesGood; i < inputData.length && timestampFound; i++) {
        if ((time + i) % inputData[i] !== 0) {
            busesGood = i;
            timestampFound = false;
        }
    }
    if (busesGoodLast !== busesGood) {
        let factors = inputData.slice(busesGoodLast, busesGood);
        factors.push(step);
        step = leastCommonMultiple(factors);
    }
}

console.log(time - step);

function leastCommonMultiple(nums) {
    if (nums.length === 0) {
        return 1;
    }
    let biggest = Math.max(...nums);
    let multiple = 0;
    let correct = false;
    while (!correct) {
        multiple += biggest;
        correct = true;
        for (let num of nums) {
            if (multiple % num !== 0) {
                correct = false;
                break;
            }
        }
    }
    return multiple;
}
