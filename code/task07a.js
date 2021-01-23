const fs = require('fs');
const path = require('path');

let inputData = fs.readFileSync(path.join(__dirname, '..', 'input', 'task07.in'), {encoding:'utf8'});
inputData = inputData.trimEnd();
inputData = inputData.split("\n");

let bagMap = new Map();

for (let line of inputData) {
    line = line.slice(0, -1); // remove "." on end
    let rules = line.split(" bags contain ");
    let parentBag = rules[0];
    let childBags = null;
    rules[1] = rules[1].replace(/[0-9]+\s/g, '');
    rules[1] = rules[1].replace(/\sbags?/g, '');
    if (rules[1] !== "no other") {
        childBags = rules[1].split(", ");
    }
    bagMap.set(parentBag, childBags);
}

let bagsToCheck = ["shiny gold"];
let checkedBags = [];

while (bagsToCheck.length > 0) {
    let bagToCheck = bagsToCheck.pop();
    for (let [key, value] of bagMap) {
        if (value != null && !checkedBags.includes(key)) {
            if (value.includes(bagToCheck)) {
                if (!bagsToCheck.includes(key)) {
                    bagsToCheck.push(key);
                }
            }
        }
    }
    checkedBags.push(bagToCheck);
}

console.log(checkedBags.length - 1);
