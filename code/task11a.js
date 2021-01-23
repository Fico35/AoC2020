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
    newInputData = [];
    for (let i = 0; i < inputData.length; i++) {
        let newRow = "";
        for (let j = 0; j < inputData[i].length; j++) {
            let oldState = inputData[i].charAt(j);
            if (oldState === seatState.floor) {
                newRow += seatState.floor;
                continue;
            }

            let occupiedNeighbours = 0;
            for (let ii = i - 1; ii <= i + 1; ii++) {
                for (let jj = j - 1; jj <= j + 1; jj++) {
                    if (ii === i && jj === j) {
                        continue;
                    }
                    if (ii < 0 || ii >= inputData.length || jj < 0 || jj >= inputData[ii].length) {
                        continue;
                    }
                    if (inputData[ii].charAt(jj) === seatState.occupied) {
                        occupiedNeighbours++;
                    }
                }
            }

            let newState = oldState;
            if (oldState === seatState.empty && occupiedNeighbours === 0) {
                newState = seatState.occupied;
            } else if (oldState === seatState.occupied && occupiedNeighbours >= 4) {
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
