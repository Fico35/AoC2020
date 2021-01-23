const fs = require('fs');
const path = require('path');

let inputData = fs.readFileSync(path.join(__dirname, '..', 'input', 'task04.in'), {encoding:'utf8'});
inputData = inputData.trimEnd();
inputData = inputData.split("\n\n");

let validPassports = 0;
for (let line of inputData) {
    line = line.replace(/\n/g, ' ');
    line = line.replace(/\s/g, '", "');
    line = line.replace(/:/g, '":"');
    line = '{"' + line + '"}';
    let passport = JSON.parse(line);
    if (passportIsValid(passport)) {
        validPassports++;
    }
}

console.log(validPassports);

function passportIsValid(passport) {
    return (
        passport.byr != null
        && passport.iyr != null
        && passport.eyr != null
        && passport.hgt != null
        && passport.hcl != null
        && passport.ecl != null
        && passport.pid != null
        // && passport.cid != null // -> optional
        );
};
