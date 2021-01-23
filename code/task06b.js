const fs = require('fs');
const path = require('path');

let inputData = fs.readFileSync(path.join(__dirname, '..', 'input', 'task06.in'), {encoding:'utf8'});
inputData = inputData.trimEnd();
inputData = inputData.split("\n\n");

let sum = 0;
let answerMap = new Map();
for (let group of inputData) {
    answerMap.clear();
    let people = group.split("\n");
    for (let i = 0; i < people[0].length; i++) {
        answerMap.set(people[0].charAt(i), 0);
    }
    for (let person of people) {
        for (let i = 0; i < person.length; i++) {
            answerMap.set(person.charAt(i), answerMap.get(person.charAt(i)) + 1);
        }
    }
    for (let answer of answerMap.values()) {
        if (answer === people.length) {
            sum++;
        }
    }
}

console.log(sum);
