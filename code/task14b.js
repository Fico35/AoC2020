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
        let memoryAddress = parseInt(parts[0].slice(4, -1)).toString(2); // binary
        while (memoryAddress.length < 36) {
            memoryAddress = "0" + memoryAddress;
        }
        let valueToWrite = parseInt(parts[1]);

        // apply mask
        let possMemAdd = [];
        possMemAdd.push("");
        for (let i = 0; i < mask.length; i++) {
            if (mask.charAt(i) === "0") {
                // unchanged
                for (let j = 0; j < possMemAdd.length; j++) {
                    possMemAdd[j] += memoryAddress.charAt(i);
                }
            } else if (mask.charAt(i) === "1") {
                // overwrite with 1
                for (let j = 0; j < possMemAdd.length; j++) {
                    possMemAdd[j] += "1";
                }
            } else if (mask.charAt(i) === "X") {
                // add both options
                let possMemAdd2 = possMemAdd.slice();
                for (let j = 0; j < possMemAdd.length; j++) {
                    possMemAdd[j] += "0";
                    possMemAdd2[j] += "1";
                }
                possMemAdd = [...possMemAdd, ...possMemAdd2];
            }
        }

        // write to memory
        for (let j = 0; j < possMemAdd.length; j++) {
            memory.set(parseInt(possMemAdd[j], 2), valueToWrite);
        }
    }
}

let sum = 0;
for (let val of memory.values()) {
    sum += val;
}

console.log(sum);
