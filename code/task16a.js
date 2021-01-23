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
    rule = rule.split(": ")[1].split(" or ");
    range1 = rule[0].split("-");
    range1 = {min: parseInt(range1[0]), max: parseInt(range1[1])};
    range2 = rule[1].split("-");
    range2 = {min: parseInt(range2[0]), max: parseInt(range2[1])};

    let expandRange1 = false;
    let expandRange2 = false;
    for (let i = 0; i < validRanges.length; i++) {
        if (!expandRange1) {
            let overlap1 = rangeOverlap(range1, validRanges[i]);
            if (overlap1) {
                expandRange1 = true;
                validRanges[i] = overlap1;
            }
        }
        if (!expandRange2) {
            let overlap2 = rangeOverlap(range2, validRanges[i]);
            if (overlap2) {
                expandRange2 = true;
                validRanges[i] = overlap2;
            }
        }
        if (expandRange1 && expandRange2) {
            break;
        }
    }
    if (!expandRange1) {
        validRanges.push(range1);
    }
    if (!expandRange2) {
        validRanges.push(range2);
    }
}

myTicket = myTicket.split("\n")[1];

let errorRate = 0;
nearbyTickets = nearbyTickets.split("\n").slice(1);

for (let ticket of nearbyTickets) {
    let numbers = ticket.split(",");
    for (let num of numbers) {
        num = parseInt(num);
        let valid = false;
        for (let validRange of validRanges) {
            if (num >= validRange.min && num <= validRange.max) {
                valid = true;
                break;
            }
        }
        if (!valid) {
            errorRate += num;
        }
    }
}

console.log(errorRate);

function rangeOverlap(r1, r2) {
    if (r1.min >= r2.min && r1.max <= r2.max) {
        return {min:r2.min, max:r2.max};
    } else if (r1.min <= r2.min && r1.max >= r2.max) {
        return {min:r1.min, max:r1.max};
    } else if (r1.min < r2.min && r1.max >= (r2.min - 1) && r1.max < r2.max) {
        return {min:r1.min, max:r2.max};
    } else if (r1.min > r2.min && r1.min <= (r2.max + 1) && r1.max > r2.max) {
        return {min:r2.min, max:r1.max};
    } else {
        return false;
    }
}
