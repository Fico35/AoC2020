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
    if (passport.byr == null || passport.iyr == null || passport.eyr == null || passport.hgt == null || passport.hcl == null || passport.ecl == null || passport.pid == null) {
        return false;
    }

    let byr = parseInt(passport.byr);
    if (Number.isNaN(byr) || byr < 1920 || byr > 2002) {
        return false;
    }

    let iyr = parseInt(passport.iyr);
    if (Number.isNaN(iyr) || iyr < 2010 || iyr > 2020) {
        return false;
    }

    let eyr = parseInt(passport.eyr);
    if (Number.isNaN(eyr) || eyr < 2020 || eyr > 2030) {
        return false;
    }

    let hgt = parseInt(passport.hgt.slice(0, -2));
    if (passport.hgt.search(/^[0-9]+cm$/) === -1 && passport.hgt.search(/^[0-9]+in$/) === -1) {
        return false;
    } else if (passport.hgt.endsWith('cm')) {
        if (Number.isNaN(hgt) || hgt < 150 || hgt > 193) {
            return false;
        }
    } else if (passport.hgt.endsWith('in')) {
        if (Number.isNaN(hgt) || hgt < 59 || hgt > 76) {
            return false;
        }
    }

    if (passport.hcl.search(/^#[0-9a-f]{6}$/) === -1) {
        return false;
    }

    let validEcl = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
    if (!validEcl.includes(passport.ecl)) {
        return false;
    }

    if (passport.pid.search(/^[0-9]{9}$/) === -1) {
        return false;
    }

    // passed all validations
    return true;
};
