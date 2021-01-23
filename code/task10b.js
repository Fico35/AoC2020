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

let possibleCombinations = new Map();
let allCombinations = getPossibleCombinations(adapters, 3, 0, possibleCombinations);

console.log(allCombinations);

function getPossibleCombinations(adapters, gapSize, num, possibleCombinations) {
    if (possibleCombinations.has(num)) {
        return possibleCombinations.get(num);
    } else {
        let leaf = true;
        for (let j = 1; j <= gapSize && leaf; j++) {
            if (adapters.includes(num + j)) {
                leaf = false;
            }
        }
        if (leaf) {
            possibleCombinations.set(num, 1);
            return 1;
        } else {
            let combs = 0;
            for (let j = 1; j <= gapSize; j++) {
                if (adapters.includes(num + j)) {
                    combs += getPossibleCombinations(adapters, gapSize, num + j, possibleCombinations);
                }
            }
            possibleCombinations.set(num, combs);
            return combs;
        }
    }
}
