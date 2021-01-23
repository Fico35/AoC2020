const fs = require('fs');
const path = require('path');

let inputData = fs.readFileSync(path.join(__dirname, '..', 'input', 'task08.in'), {encoding:'utf8'});
inputData = inputData.trimEnd();
inputData = inputData.split("\n");

let usedInstructions = [];
let i = 0;
let acc = 0;

while (!usedInstructions.includes(i)) {
    usedInstructions.push(i);
    let line = inputData[i].split(" ");
    switch(line[0]) {
        case 'jmp':
            i += parseInt(line[1]);
            break;
        case 'acc':
            acc += parseInt(line[1]);
        case 'nop':
            i++;
            break;
    }
}

console.log(acc);
