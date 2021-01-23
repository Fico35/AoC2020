const fs = require('fs');
const { parse } = require('path');
const path = require('path');

let inputData = fs.readFileSync(path.join(__dirname, '..', 'input', 'task09.in'), {encoding:'utf8'});
inputData = inputData.trimEnd();
inputData = inputData.split("\n");

let startIndex = 0;
let endIndex = -1;
let invalidNumber = 15353384;
let currentSum = 0;

while(currentSum !== invalidNumber) {
    if (currentSum < invalidNumber) {
        endIndex++;
        currentSum += parseInt(inputData[endIndex]);
    } else if (currentSum > invalidNumber) {
        currentSum -= parseInt(inputData[startIndex]);
        startIndex++;
    }
}

let minNum = null;
let maxNum = null;

for (let i = startIndex; i <= endIndex; i++) {
    let currentNum = parseInt(inputData[i]);
    if (minNum === null || currentNum < minNum) {
        minNum = currentNum;
    }
    if (maxNum === null || currentNum > maxNum) {
        maxNum = currentNum;
    }
}

console.log(minNum + maxNum);
