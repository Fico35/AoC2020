const fs = require('fs');
const path = require('path');

let inputData = fs.readFileSync(path.join(__dirname, '..', 'input', 'task14.in'), {encoding:'utf8'});
inputData = inputData.trimEnd();
inputData = inputData.split("\n");

let memory = new Map();
let mask;
for (let line of inputData) {
    let parts = line.split(" = ");
    if (line.startsWith("mask")) {
        // change mask
        mask = parts[1];
    } else if (line.startsWith("mem")) {
        // read input
        let memoryAddress = parseInt(parts[0].slice(4, -1));
        let valueToWrite = parseInt(parts[1]).toString(2); // binary
        while (valueToWrite.length < 36) {
            valueToWrite = "0" + valueToWrite;
        }

        // apply mask
        let maskedValue = "";
        for (let i = 0; i < mask.length; i++) {
            if (mask.charAt(i) === "X") {
                maskedValue += valueToWrite.charAt(i);
            } else {
                maskedValue += mask.charAt(i);
            }
        }

        // write to memory
        memory.set(memoryAddress, parseInt(maskedValue, 2));
    }
}

let sum = 0;
for (let val of memory.values()) {
    sum += val;
}

console.log(sum);
