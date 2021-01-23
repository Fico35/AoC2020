const fs = require('fs');
const path = require('path');

let inputData = fs.readFileSync(path.join(__dirname, '..', 'input', 'task03.in'), {encoding:'utf8'});
inputData = inputData.trimEnd();
inputData = inputData.split("\n");

let j = 0;
let treeNumber = 0;
for (let i = 0; i < inputData.length; i++) {
    if (inputData[i].charAt(j) === '#') {
        treeNumber++;
    }
    j = (j + 3) % inputData[i].length;
}

console.log(treeNumber);
