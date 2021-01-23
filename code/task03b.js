const fs = require('fs');
const path = require('path');

let inputData = fs.readFileSync(path.join(__dirname, '..', 'input', 'task03.in'), {encoding:'utf8'});
inputData = inputData.trimEnd();
inputData = inputData.split("\n");

let slopes = [
    {stepRight: 1, stepDown: 1, trees: 0},
    {stepRight: 3, stepDown: 1, trees: 0},
    {stepRight: 5, stepDown: 1, trees: 0},
    {stepRight: 7, stepDown: 1, trees: 0},
    {stepRight: 1, stepDown: 2, trees: 0}
];

for (let i = 0; i < inputData.length; i++) {
    for (let slope of slopes) {
        if (i % slope.stepDown === 0) {
            if (inputData[i].charAt(((i / slope.stepDown) * slope.stepRight) % inputData[i].length) === '#') {
                slope.trees += 1;
            }
        }
    }
}

let product = 1;
for (let slope of slopes) {
    product *= slope.trees;
}

console.log(product);
