const fs = require('fs');
const path = require('path');

let inputData = fs.readFileSync(path.join(__dirname, '..', 'input', 'task18.in'), {encoding:'utf8'});
inputData = inputData.trimEnd();
inputData = inputData.split("\n");

let sum = 0;
for (let line of inputData) {
    line = line.replace(/\(/g, " ( ");
    line = line.replace(/\)/g, " ) ");
    line = line.replace(/\s+/g, " ");
    line = line.trim();
    let chars = line.split(" ");
    let res = calcPart(chars, 0)
    sum += res;
}

console.log(sum);

function calcPart(chars, index) {
    let part = [];
    for (let i = index; i < chars.length; i++) {
        if (chars[i] === '(') {
            chars = calcPart(chars, i + 1);
            part.push(chars[i]);
        } else if (chars[i] === ')') {
            // calculate part
            for (let j = 1; j < part.length; j += 2) {
                if (part[j] === '+') {
                    // sum left and right
                    part[j - 1] = parseInt(part[j - 1]) + parseInt(part[j + 1]);
                    part = part.slice(0, j).concat(...part.slice(j + 2));
                    j -= 2;
                }
            }
            for (let j = 1; j < part.length; j += 2) {
                if (part[j] === '*') {
                    // multiply left and right
                    part[j - 1] = parseInt(part[j - 1]) * parseInt(part[j + 1]);
                    part = part.slice(0, j).concat(...part.slice(j + 2));
                    j -= 2;
                }
            }
            // splice chars with part
            chars = chars.slice(0, index - 1).concat(part[0], ...chars.slice(i + 1));
            return chars;
        } else {
            part.push(chars[i]);
        }
    }
    // calcualte part
    for (let j = 1; j < part.length; j += 2) {
        if (part[j] === '+') {
            // sum left and right
            part[j - 1] = parseInt(part[j - 1]) + parseInt(part[j + 1]);
            part = part.slice(0, j).concat(...part.slice(j + 2));
            j -= 2;
        }
    }
    for (let j = 1; j < part.length; j += 2) {
        if (part[j] === '*') {
            // multiply left and right
            part[j - 1] = parseInt(part[j - 1]) * parseInt(part[j + 1]);
            part = part.slice(0, j).concat(...part.slice(j + 2));
            j -= 2;
        }
    }
    return part[0];
}
