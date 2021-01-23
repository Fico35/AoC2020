const fs = require('fs');
const path = require('path');

let inputData = fs.readFileSync(path.join(__dirname, '..', 'input', 'task15.in'), {encoding:'utf8'});
inputData = inputData.trimEnd();
inputData = inputData.split(",");

let num;
let numbers = new Map();

for (let turn = 1; turn <= 30000000; turn++) {
    if (turn % 1000000 === 0) {
        console.log("Simulated " + (turn / 1000000) + " million turns.");
    }
    let lastNum = numbers.get(num);
    if (turn <= inputData.length) {
        num = parseInt(inputData[turn - 1]);
    } else {
        if (lastNum.pen === null) {
            num = 0;
        } else {
            num = lastNum.last - lastNum.pen;
        }
    }
    if (numbers.has(num)) {
        numbers.set(num, {last: turn, pen: numbers.get(num).last});
    } else {
        numbers.set(num, {last: turn, pen: null});
    }
}

console.log(num);
