const fs = require('fs');
const path = require('path');

let inputData = fs.readFileSync(path.join(__dirname, '..', 'input', 'task19.in'), {encoding:'utf8'});
inputData = inputData.trimEnd();
inputData = inputData.split("\n\n");

let rulesTexts = inputData[0].split("\n");
let rules = [];
for (let rulesText of rulesTexts) {
    let ruleSplit = rulesText.split(": ");
    if (new RegExp(/\"[a-z]\"/i).test(ruleSplit[1])) {
        rules[parseInt(ruleSplit[0])] = {values: [ruleSplit[1].replace(/\"/g, "")], rules: null};
    } else {
        let ruleOptions = ruleSplit[1].split(" | ");
        ruleOptions.forEach((val1, ind1) => {
            ruleOptions[ind1] = val1.split(" ");
        });
        rules[parseInt(ruleSplit[0])] = {values: null, rules: ruleOptions};
    }
}

let allPossibilities = findRuleValue(rules, 0);

function findRuleValue(rules, index) {
    if (rules[index].values === null) {
        let possibleValues = [];
        for (let ruleOption of rules[index].rules) {
            let vals0 = findRuleValue(rules, ruleOption[0]);
            let values = [];
            if (ruleOption[1] == null) {
                possibleValues = possibleValues.concat(vals0);
            } else {
                let vals1 = findRuleValue(rules, ruleOption[1]);
                for (let val0 of vals0) {
                    for (let val1 of vals1) {
                        values.push(val0 + val1);
                    }
                }
                possibleValues = possibleValues.concat(values);
            }
        }
        rules[index].values = possibleValues;
        return possibleValues;
    } else {
        return rules[index].values;
    }
}

let messages = inputData[1].split("\n");

let validMessages = 0;

for (let m of messages) {
    if (allPossibilities.includes(m)) {
        validMessages++;
    }
}

console.log(validMessages);
