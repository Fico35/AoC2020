const fs = require('fs');
const path = require('path');

let inputData = fs.readFileSync(path.join(__dirname, '..', 'input', 'task01.in'), {encoding:'utf8'});
inputData = inputData.trimEnd();

let targetSum = 2020;
let product = 0;
let inputNumbers = inputData.split("\n");
for (let i = 0; i < inputNumbers.length; i++) {
    inputNumbers[i] = parseInt(inputNumbers[i]);
}
for (let i = 0; i < inputNumbers.length; i++) {
    for(let j = i + 1; j < inputNumbers.length; j++) {
        let currentSum = inputNumbers[i] + inputNumbers[j]
        if (currentSum <= targetSum) {
            if (inputNumbers.includes(targetSum - currentSum)) {
                console.log(inputNumbers[i]);
                console.log(inputNumbers[j]);
                console.log(targetSum - currentSum);
                console.log("");
                product = inputNumbers[i] * inputNumbers[j] * (targetSum - currentSum);
                break;
            }
        }
    }
}

console.log(product);
