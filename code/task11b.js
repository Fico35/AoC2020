const fs = require('fs');
const path = require('path');

let inputData = fs.readFileSync(path.join(__dirname, '..', 'input', 'task11.in'), {encoding:'utf8'});
inputData = inputData.trimEnd();
inputData = inputData.split("\n");

let seatState = {
    empty: "L",
    occupied: "#",
    floor: "."
}

let seatsChanged;
let seatsOccupied;
let newInputData = inputData.slice();
do {
    seatsChanged = false;
    seatsOccupied = 0;
    inputData = newInputData;
    //console.table(inputData);
    newInputData = [];
    for (let i = 0; i < inputData.length; i++) {
        let newRow = "";
        for (let j = 0; j < inputData[i].length; j++) {
            let oldState = inputData[i].charAt(j);
            if (oldState === seatState.floor) {
                newRow += seatState.floor;
                continue;
            }

            let firstNeighbours = {
                leftUp: seatState.floor,
                up: seatState.floor,
                rightUp: seatState.floor,
                left: seatState.floor,
                right: seatState.floor,
                leftDown: seatState.floor,
                down: seatState.floor,
                rightDown: seatState.floor
            };
            // -- check neighbours --
            for (let ii = 1; ii < Math.max(inputData.length, inputData[0].length); ii++) {
                if (firstNeighbours.leftUp === seatState.floor && i - ii >= 0 && j - ii >= 0) {
                    firstNeighbours.leftUp = inputData[i - ii].charAt(j - ii);
                }
                if (firstNeighbours.up === seatState.floor && i - ii >= 0) {
                    firstNeighbours.up = inputData[i - ii].charAt(j);
                }
                if (firstNeighbours.rightUp === seatState.floor && i - ii >= 0 && j + ii < inputData[i - ii].length) {
                    firstNeighbours.rightUp = inputData[i - ii].charAt(j + ii);
                }
                if (firstNeighbours.left === seatState.floor && j - ii >= 0) {
                    firstNeighbours.left = inputData[i].charAt(j - ii);
                }
                if (firstNeighbours.right === seatState.floor && j + ii < inputData[i].length) {
                    firstNeighbours.right = inputData[i].charAt(j + ii);
                }
                if (firstNeighbours.leftDown === seatState.floor && i + ii < inputData.length && j - ii >= 0) {
                    firstNeighbours.leftDown = inputData[i + ii].charAt(j - ii);
                }
                if (firstNeighbours.down === seatState.floor && i + ii < inputData.length) {
                    firstNeighbours.down = inputData[i + ii].charAt(j);
                }
                if (firstNeighbours.rightDown === seatState.floor && i + ii < inputData.length && j + ii < inputData[i + ii].length) {
                    firstNeighbours.rightDown = inputData[i + ii].charAt(j + ii);
                }
            }

            let occupiedNeighbours = (firstNeighbours.leftUp === seatState.occupied ? 1 : 0)
                                    + (firstNeighbours.up === seatState.occupied ? 1 : 0)
                                    + (firstNeighbours.rightUp === seatState.occupied ? 1 : 0)
                                    + (firstNeighbours.left === seatState.occupied ? 1 : 0)
                                    + (firstNeighbours.right === seatState.occupied ? 1 : 0)
                                    + (firstNeighbours.leftDown === seatState.occupied ? 1 : 0)
                                    + (firstNeighbours.down === seatState.occupied ? 1 : 0)
                                    + (firstNeighbours.rightDown === seatState.occupied ? 1 : 0);

            let newState = oldState;
            if (oldState === seatState.empty && occupiedNeighbours === 0) {
                newState = seatState.occupied;
            } else if (oldState === seatState.occupied && occupiedNeighbours >= 5) {
                newState = seatState.empty;
            }

            if (oldState !== newState) {
                seatsChanged = true;
            }
            if (newState === seatState.occupied) {
                seatsOccupied++;
            }

            newRow += newState;
        }
        newInputData.push(newRow);
    }
} while (seatsChanged);

console.log(seatsOccupied);
