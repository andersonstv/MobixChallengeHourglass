/*
    Hourglass.js
    Hourglass for Mobix First Challenge
*/

const { read } = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Creates the matrix representing the hourglass with 2 arrays
function setupMatrix(n){
    let matrix = new Array();

    for(let i = 0; i < n; i++){
        matrix[i] = new Array();
    }
    return matrix;
}
// Converts the hourglass array to string
function toString(hourglass){
    let hourglassStr = ""
    for (let i = 0; i < hourglass.length; i++) {
        for (let j = 0; j < hourglass[i].length; j++) {
            hourglassStr += hourglass[i][j];
        }
        hourglassStr += '\n'
    }
    return hourglassStr;
}
// Builds the hourglass at start
function buildHourglass(size){
    let hourglass = setupMatrix(size);

    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            if(row == 0 || row == size-1 || col == 0 || col == size-1){
                hourglass[row][col] = '#';
            } else if(row < size/2 && (row <= col && row < size - col)){
                hourglass[row][col] = '#';
            } else if(row >= size/2 && (row == col || row == size - col - 1)){
                hourglass[row][col] = '#';
            }
            else{
                hourglass[row][col] = ' ';
            }
        }
    }
    return hourglass;
}
// Calculates the state of the hourglass at a given time
function hourglassState(hourglass, time){
    const size = hourglass.length

    // removes sand on top half
    for (let row = 1; row < time+1; row++) {
        for (let col = 0; col < size; col++) {
            if(row < size/2 && (row < col && row < size - col - 1)){
                hourglass[row][col] = ' ';
            }
        }
    }

    // transfers sand to bottom half
    for (let row = size-2; row >= size-time-1; row--) {
        for (let col = 0; col < size; col++) {
            if(row >= size/2 && (row > col && row >= size - col)){
                hourglass[row][col] = '#';
            }
        }
    }
    return hourglass;
}
// Prints the timelapse of the hourglass to the console
function hourglassTimelapse(hourglass){
    const size = hourglass.length;
    for (let time = 0; time < (size/2) -1; time++) {
        setTimeout(() => {
            console.clear();
            console.log(toString(hourglassState(hourglass, time)));
        }, 1000*time)
    }

}

rl.question("What is the size of your hourglass? ", function(size){
    let hourglass = buildHourglass(size)
    
    hourglassTimelapse(hourglass);

    rl.close();
})