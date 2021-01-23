const fs = require('fs');
const path = require('path');

let inputData = fs.readFileSync(path.join(__dirname, '..', 'input', 'task02.in'), {encoding:'utf8'});
inputData = inputData.trimEnd();
inputData = inputData.split("\n");

let validNum = 0;
for (let line of inputData) {
    line = line.split(": ");

    let policy = line[0].split(" ");
    policy[2] = policy[1];
    let temp = policy[0].split("-");
    policy[1] = parseInt(temp[1]);
    policy[0] = parseInt(temp[0]);

    let password = line[1];
    let correctLetters = 0;
    if (password.charAt(policy[0] - 1) === policy[2]) {
        correctLetters++;
    }
    if (password.charAt(policy[1] - 1) === policy[2]) {
        correctLetters++;
    }
    if (correctLetters === 1) {
        validNum++;
        //console.log(line[0] + ": " + line[1]);
    }
}

console.log(validNum);
