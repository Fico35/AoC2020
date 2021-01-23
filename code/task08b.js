const fs = require('fs');
const path = require('path');

let inputData = fs.readFileSync(path.join(__dirname, '..', 'input', 'task08.in'), {encoding:'utf8'});
inputData = inputData.trimEnd();
inputData = inputData.split("\n");

let usedInstructions, instructionCounter, acc, infiniteLoop;

for (let i = 0; i < inputData.length; i++) {
    let inputDataCopy = [...inputData];
    if (inputDataCopy[i].startsWith('nop')) {
        inputDataCopy[i] = inputDataCopy[i].replace('nop', 'jmp');
    } else if (inputDataCopy[i].startsWith('jmp')) {
        inputDataCopy[i] = inputDataCopy[i].replace('jmp', 'nop');
    } else {
        continue;
    }

    usedInstructions = [];
    instructionCounter = 0;
    acc = 0;
    infiniteLoop = false;
    
    while (instructionCounter < inputDataCopy.length) {
        if (usedInstructions.includes(instructionCounter)) {
            infiniteLoop = true;
            break;
        }
        usedInstructions.push(instructionCounter);
        let line = inputDataCopy[instructionCounter].split(" ");
        switch(line[0]) {
            case 'jmp':
                instructionCounter += parseInt(line[1]);
                break;
            case 'acc':
                acc += parseInt(line[1]);
            case 'nop':
                instructionCounter++;
                break;
        }
    }

    if (!infiniteLoop) {
        break;
    }
}

console.log(acc);
