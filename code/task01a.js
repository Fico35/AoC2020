const fs = require('fs');
const path = require('path');

let inputData = fs.readFileSync(path.join(__dirname, '..', 'input', 'task01.in'), {encoding:'utf8'});
inputData = inputData.trimEnd();

let targetSum = 2020;
let product = 0;
let inputNumbers = inputData.split("\n");
for (let inputNumber of inputNumbers) {
    inputNumber = parseInt(inputNumber);
    if (inputNumbers.includes(Number(targetSum - inputNumber).toString())) {
        console.log(inputNumber);
        console.log(targetSum - inputNumber);
        product = inputNumber * (targetSum - inputNumber);
        break;
    }
}

console.log(product);
