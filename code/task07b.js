const fs = require('fs');
const path = require('path');

let inputData = fs.readFileSync(path.join(__dirname, '..', 'input', 'task07.in'), {encoding:'utf8'});
inputData = inputData.trimEnd();
inputData = inputData.split("\n");

let bagMap = new Map();

class Bag {
    constructor(colour, allBags, children) {
        this._colour = colour;
        this._allBags = allBags;
        this._childNumbers = [];
        this._childNames = [];
        for (let child of children) {
            let firstSpace = child.search(" ");
            this._childNumbers.push(parseInt(child.substring(0, firstSpace)));
            this._childNames.push(child.substring(firstSpace + 1));
        }
    }
    getNumberOfChildren() {
        if (this._childNumbers.length === 0) {
            return 0;
        } else {
            let totalBags = 0;
            for (let i = 0; i < this._childNumbers.length; i++) {
                totalBags += this._childNumbers[i];
                totalBags += this._childNumbers[i] * this._allBags.get(this._childNames[i]).getNumberOfChildren();
            }
            return totalBags;
        }
    }
}

for (let line of inputData) {
    line = line.slice(0, -1); // remove "." on end
    let rules = line.split(" bags contain ");
    let parentBag = rules[0];
    let childBags = [];
    rules[1] = rules[1].replace(/\sbags?/g, '');
    if (rules[1] !== "no other") {
        childBags = rules[1].split(", ");
    }
    bagMap.set(parentBag, new Bag(parentBag, bagMap, childBags));
}

let totalBagsRequired = bagMap.get("shiny gold").getNumberOfChildren();
console.log(totalBagsRequired);
