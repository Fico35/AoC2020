const fs = require('fs');
const path = require('path');

let inputData = fs.readFileSync(path.join(__dirname, '..', 'input', 'task16.in'), {encoding:'utf8'});
inputData = inputData.trimEnd();
inputData = inputData.split("\n\n");

let validRanges = [];
let rules = inputData[0];
let myTicket = inputData[1];
let nearbyTickets = inputData[2];

rules = rules.split("\n");

for (let rule of rules) {
    rule = rule.split(": ");
    let ruleName = rule[0];
    let ruleRanges = rule[1].split(" or ");
    
    range1 = ruleRanges[0].split("-");
    range2 = ruleRanges[1].split("-");
    validRanges.push({name: ruleName, min1: parseInt(range1[0]), max1: parseInt(range1[1]), min2: parseInt(range2[0]), max2: parseInt(range2[1])});
}

myTicket = myTicket.split("\n")[1];
myTicket = myTicket.split(",");

nearbyTickets = nearbyTickets.split("\n").slice(1);
let validTickets = [];

for (let ticket of nearbyTickets) {
    ticket = ticket.split(",");
    let valid = true;
    for (let i = 0; i < ticket.length; i++) {
        ticket[i] = parseInt(ticket[i]);
        let validNum = false;
        for (let validRange of validRanges) {
            if ((ticket[i] >= validRange.min1 && ticket[i] <= validRange.max1) || (ticket[i] >= validRange.min2 && ticket[i] <= validRange.max2)) {
                validNum = true;
                break;
            }
        }
        if (!validNum) {
            valid = false;
            break;
        }
    }
    if (valid) {
        validTickets.push(ticket);
    }
}

// initialize possible rules indices with all rule indices
let columns = [];
for (let i = 0; i < validTickets[0].length; i++) {
    let rulesIndex = new Set();
    for (let j = 0; j < validRanges.length; j++) {
        rulesIndex.add(j);
    }
    columns.push(rulesIndex);
}

for (let ticket of validTickets) {
    for (let i = 0; i < ticket.length; i++) {
        for (let index = 0; index < validRanges.length; index++) {
            if (!(ticket[i] >= validRanges[index].min1 && ticket[i] <= validRanges[index].max1)
            && !(ticket[i] >= validRanges[index].min2 && ticket[i] <= validRanges[index].max2)) {
                columns[i].delete(index);
            }
        }
    }
}

let allColumnsSingular = true;
do {
    for (let i = 0; i < columns.length; i++) {
        if (columns[i].size === 1) {
            for (let j = 0; j < columns.length; j++) {
                if (i !== j) {
                    columns[j].delete(columns[i].values().next().value);
                }
            }
        }
    }
    allColumnsSingular = true;
    for (let i = 0; i < columns.length; i++) {
        if (columns[i].size !== 1) {
            allColumnsSingular = false;
        }
    }
} while (!allColumnsSingular);


for (let i = 0; i < columns.length; i++) {
    columns[i] = columns[i].values().next().value;
}

let product = 1;
for (let i = 0; i < validRanges.length; i++) {
    if (validRanges[i].name.startsWith("departure")) {
        for (let j = 0; j < columns.length; j++) {
            if (i === columns[j]) {
                product *= parseInt(myTicket[j]);
                break;
            }
        }
    }
}

console.log(product);
