const fs = require('fs');
const path = require('path');

let inputData = fs.readFileSync(path.join(__dirname, '..', 'input', 'task12.in'), {encoding:'utf8'});
inputData = inputData.trimEnd();
inputData = inputData.split("\n");

let ship = {
    x: 0,
    y: 0
}
let waypoint = {
    x: 10,
    y: 1
}

let instruction, amount, temp;
for (let line of inputData) {
    instruction = line.substring(0, 1);
    amount = parseInt(line.substring(1));
    switch (instruction) {
        case "N":
            waypoint.y += amount;
            break;
        case "S":
            waypoint.y -= amount;
            break;
        case "E":
            waypoint.x += amount;
            break;
        case "W":
            waypoint.x -= amount;
            break;
        case "F":
            ship.x += (amount * waypoint.x);
            ship.y += (amount * waypoint.y);
            break;
        case "L":
            switch (amount) {
                case 90:
                    temp = waypoint.x;
                    waypoint.x = -1 * waypoint.y;
                    waypoint.y = temp;
                    break;
                case 180:
                    waypoint.x *= -1;
                    waypoint.y *= -1;
                    break;
                case 270:
                    temp = waypoint.x;
                    waypoint.x = waypoint.y;
                    waypoint.y = -1 * temp;
                    break;
            }
            break;
        case "R":
            switch (amount) {
                case 90:
                    temp = waypoint.x;
                    waypoint.x = waypoint.y;
                    waypoint.y = -1 * temp;
                    break;
                case 180:
                    waypoint.x *= -1;
                    waypoint.y *= -1;
                    break;
                case 270:
                    temp = waypoint.x;
                    waypoint.x = -1 * waypoint.y;
                    waypoint.y = temp;
                    break;
            }
            break;
    }
}

console.log(Math.abs(ship.x) + Math.abs(ship.y));
