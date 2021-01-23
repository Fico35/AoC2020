const fs = require('fs');
const path = require('path');

let inputData = fs.readFileSync(path.join(__dirname, '..', 'input', 'task13.in'), {encoding:'utf8'});
inputData = inputData.trimEnd();
inputData = inputData.split("\n");

let arrivalTime = parseInt(inputData[0]);
inputData = inputData[1].split(",");
let buses = [];
inputData.forEach((num, index) => {
    let parsedNumber = parseInt(num);
    if (!isNaN(parsedNumber)) {
        buses.push(parsedNumber);
    }
});

let busFound = false;
for (let time = arrivalTime; !busFound; time++) {
    for (let bus of buses) {
        if (time % bus === 0) {
            busFound = true;
            console.log(bus * (time - arrivalTime));
        }
    }
}
