const fs = require('fs');
const path = require('path');

let inputData = fs.readFileSync(path.join(__dirname, '..', 'input', 'task06.in'), {encoding:'utf8'});
inputData = inputData.trimEnd();
inputData = inputData.split("\n\n");

let sum = 0;
let answerSet = new Set();
for (let group of inputData) {
    group = group.replace(/[^a-z]/g, '');
    answerSet.clear();
    for (let i = 0; i < group.length; i++) {
        answerSet.add(group.charAt(i));
    }
    sum += answerSet.size;
}

console.log(sum);
