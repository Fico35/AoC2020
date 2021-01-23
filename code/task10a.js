const fs = require('fs');
const path = require('path');

let inputData = fs.readFileSync(path.join(__dirname, '..', 'input', 'task10.in'), {encoding:'utf8'});
inputData = inputData.trimEnd();
inputData = inputData.split("\n");

let adapters = [];

for (let i = 0; i < inputData.length; i++) {
    adapters.push(parseInt(inputData[i]));
}

adapters.sort((a, b) => {
    return a - b;
});
adapters.unshift(0); // add charging port
adapters.push(adapters[adapters.length - 1] + 3); // add device adapter

let joltageDiff = new Map();

for (let i = 1; i < adapters.length; i++) {
    let diff = adapters[i] - adapters[i - 1];
    if (joltageDiff.has(diff)) {
        joltageDiff.set(diff, joltageDiff.get(diff) + 1);
    } else {
        joltageDiff.set(diff, 1);
    }
}

console.log(joltageDiff.get(1) * joltageDiff.get(3));
