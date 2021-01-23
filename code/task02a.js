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
    let letterCount = 0;
    for (let i = 0; i < password.length; i++) {
        if (password.charAt(i) === policy[2]) {
            letterCount++;
        }
    }
    if (letterCount >= policy[0] && letterCount <= policy[1]) {
        validNum++;
        //console.log(line[0] + ": " + line[1]);
    }
}

console.log(validNum);
