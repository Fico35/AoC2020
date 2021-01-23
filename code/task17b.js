const fs = require('fs');
const path = require('path');

let inputData = fs.readFileSync(path.join(__dirname, '..', 'input', 'task17.in'), {encoding:'utf8'});
inputData = inputData.trimEnd();
inputData = inputData.split("\n");

let maxCycles = 6;
let inputEven = [];
let inputOdd = [];
let iMax = inputData.length + 2 * maxCycles;
let jMax = inputData[0].length + 2 * maxCycles;
let kMax = 1 + 2 * maxCycles;
let wMax = 1 + 2 * maxCycles;

// initialize with 'false'
for (let i = 0; i < iMax; i++) {
    inputEven[i] = [];
    inputOdd[i] = [];
    for (let j = 0; j < jMax; j++) {
        inputEven[i][j] = [];
        inputOdd[i][j] = [];
        for (let k = 0; k < kMax; k++) {
            inputEven[i][j][k] = [];
            inputOdd[i][j][k] = [];
            for (let w = 0; w < wMax; w++) {
                inputEven[i][j][k][w] = false;
                inputOdd[i][j][k][w] = false;
            }
        }
    }
}

// write inputData
for (let i = 0; i < inputData.length; i++) {
    for (let j = 0; j < inputData[i].length; j++) {
        if (inputData[i].charAt(j) === "#") {
            inputOdd[i + maxCycles][j + maxCycles][maxCycles][maxCycles] = true;
        }
    }
}

// simulate
let activeCubes = 0;
for (let cycle = 0; cycle < maxCycles; cycle++) {
    let inputRead, inputWrite;
    if (cycle % 2 === 0) {
        inputRead = inputOdd;
        inputWrite = inputEven;
    } else {
        inputRead = inputEven;
        inputWrite = inputOdd;
    }
    activeCubes = 0;

    for (let i = 0; i < iMax; i++) {
        for (let j = 0; j < jMax; j++) {
            for (let k = 0; k < kMax; k++) {
                for (let w = 0; w < wMax; w++) {
                    let activeNeighbours = countActiveNeighbours(inputRead, i, j, k, w, iMax, jMax, kMax, wMax);
                    if (inputRead[i][j][k][w]) {
                        // cube is active
                        if (activeNeighbours === 2 || activeNeighbours === 3) {
                            inputWrite[i][j][k][w] = true;
                            activeCubes++;
                        } else {
                            inputWrite[i][j][k][w] = false;
                        }
                    } else {
                        // cube is inactive
                        if (activeNeighbours === 3) {
                            inputWrite[i][j][k][w] = true;
                            activeCubes++;
                        } else {
                            inputWrite[i][j][k][w] = false;
                        }
                    }
                }
            }
        }
    }
}

console.log(activeCubes);

function countActiveNeighbours(input, ii, jj, kk, ww, iMax, jMax, kMax, wMax) {
    let activeNeighbours = 0;
    for (let i = ii - 1; i <= ii + 1; i++) {
        if (i >= 0 && i < iMax) {
            for (let j = jj - 1; j <= jj + 1; j++) {
                if (j >= 0 && j < jMax) {
                    for (let k = kk - 1; k <= kk + 1; k++) {
                        if (k >= 0 && k < kMax) {
                            for (let w = ww - 1; w <= ww + 1; w++) {
                                if (w >= 0 && w < wMax) {
                                    if (i !== ii || j !== jj || k !== kk || w !== ww) {
                                        if (input[i][j][k][w]) {
                                            activeNeighbours++;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return activeNeighbours;
}
