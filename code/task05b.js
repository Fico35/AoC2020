const fs = require('fs');
const path = require('path');

let inputData = fs.readFileSync(path.join(__dirname, '..', 'input', 'task05.in'), {encoding:'utf8'});
inputData = inputData.trimEnd();
inputData = inputData.split("\n");

let seatIDs = [];
for (let line of inputData) {
    let row = line.substring(0, 7);
    row = row.replace(RegExp('F', 'g'), '0');
    row = row.replace(RegExp('B', 'g'), '1');
    row = parseInt(row, 2);

    let column = line.substring(7);
    column = column.replace(RegExp('L', 'g'), '0');
    column = column.replace(RegExp('R', 'g'), '1');
    column = parseInt(column, 2);

    seatIDs.push(row * 8 + column);
}

for (let seatID of seatIDs) {
    if (seatIDs.includes(seatID - 2) && !seatIDs.includes(seatID - 1)) {
        console.log(seatID - 1);
        break;
    }
    if (seatIDs.includes(seatID + 2) && !seatIDs.includes(seatID + 1)) {
        console.log(seatID + 1);
        break;
    }
}
