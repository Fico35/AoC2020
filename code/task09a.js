const fs = require('fs');
const path = require('path');

let inputData = fs.readFileSync(path.join(__dirname, '..', 'input', 'task09.in'), {encoding:'utf8'});
inputData = inputData.trimEnd();
inputData = inputData.split("\n");

let preambleSize = 25;
let preamble = [];

for (let i = 0; i < preambleSize; i++) {
    preamble.push(parseInt(inputData[i]))
}

for (let i = preambleSize; i < inputData.length; i++) {
    let currentNumber = parseInt(inputData[i]);
    // check if number is valid
    let numberValid = false;
    for (let j = 0; j < preamble.length; j++) {
        let slicedArray = [...preamble.slice(0, j), ...preamble.slice(j + 1)];
        if (slicedArray.includes(currentNumber - preamble[j])) {
            numberValid = true;
            break;
        }
    }
    if (!numberValid) {
        console.log(inputData[i]);
        break;
    }
    // update preamble
    preamble.shift();
    preamble.push(currentNumber);
}
