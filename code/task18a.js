const fs = require('fs');
const path = require('path');

let inputData = fs.readFileSync(path.join(__dirname, '..', 'input', 'task18.in'), {encoding:'utf8'});
inputData = inputData.trimEnd();
inputData = inputData.split("\n");

let sum = 0;
let allStack = [];
let currStack = [];
for (let line of inputData) {
    for (let i = 0; i < line.length; i++) {
        let char = line.charAt(i);
        if (char === ")") {
            // go from top of allStack, find last '('
            let c2;
            do {
                c2 = allStack.pop();
                currStack.push(c2);
            } while (c2 !== "(");
            currStack.pop(); // remove '('
            let res = parseInt(currStack.pop()); // first number
            let operation;
            while (currStack.length > 0) {
                operation = currStack.pop();
                if (operation === "*") {
                    res *= parseInt(currStack.pop());
                } else {
                    res += parseInt(currStack.pop());
                }
            }
            allStack.push(res);
        } else if (char !== " ") {
            allStack.push(char);
        }
    }

    // no more chars, calculate allStack
    while (allStack.length > 0) {
        currStack.push(allStack.pop());
    }
    let res = parseInt(currStack.pop()); // first number
    let operation;
    while (currStack.length > 0) {
        operation = currStack.pop();
        if (operation === "*") {
            res *= parseInt(currStack.pop());
        } else {
            res += parseInt(currStack.pop());
        }
    }

    sum += res;
}

console.log(sum);
