const fs = require('fs');
const path = require('path');

let inputData = fs.readFileSync(path.join(__dirname, '..', 'input', 'task12.in'), {encoding:'utf8'});
inputData = inputData.trimEnd();
inputData = inputData.split("\n");

let hPos = 0;
let vPos = 0;
let axis = "h";
let direction = 1;

let instruction, amount;
for (let line of inputData) {
    instruction = line.substring(0, 1);
    amount = parseInt(line.substring(1));
    switch (instruction) {
        case "N":
            vPos += amount;
            break;
        case "S":
            vPos -= amount;
            break;
        case "E":
            hPos += amount;
            break;
        case "W":
            hPos -= amount;
            break;
        case "F":
            if (axis === "h") {
                hPos += (direction * amount);
            } else {
                vPos += (direction * amount);
            }
            break;
        case "L":
            switch (amount) {
                case 90:
                    if (axis === "h") {
                        axis = "v";
                    } else if (axis === "v") {
                        axis = "h";
                        direction *= -1;
                    }
                    break;
                case 180:
                    direction *= -1;
                    break;
                case 270:
                    if (axis === "h") {
                        axis = "v";
                        direction *= -1;
                    } else if (axis === "v") {
                        axis = "h";
                    }
                    break;
            }
            break;
        case "R":
            switch (amount) {
                case 90:
                    if (axis === "h") {
                        axis = "v";
                        direction *= -1;
                    } else if (axis === "v") {
                        axis = "h";
                    }
                    break;
                case 180:
                    direction *= -1;
                    break;
                case 270:
                    if (axis === "h") {
                        axis = "v";
                    } else if (axis === "v") {
                        axis = "h";
                        direction *= -1;
                    }
                    break;
            }
            break;
    }
}

console.log(Math.abs(hPos) + Math.abs(vPos));
