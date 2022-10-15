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
// Converts the Hourglass array to string
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
function hourglassFinal(hourglass){
    const size = hourglass.length

    for (let row = 1; row < size; row++) {
        for (let col = 0; col < size; col++) {
            if(row < size/2 && (row < col && row < size - col - 1)){
                hourglass[row][col] = ' ';
            } else if(row >= size/2 && (row > col && row >= size - col)){
                hourglass[row][col] = '#';
            }
        }
    }
    return hourglass;
}
function hourglassTimelapse(hourglass, time){
    if(time == 0){
        return toString(hourglass);
    } else{
        return toString(hourglassFinal(hourglass));
    }
}

rl.question("What is the size of your hourglass? ", function(size){
    let hourglass = buildHourglass(size)
    
    for (let i = 0; i < 2; i++) {
        console.log(hourglassTimelapse(hourglass, i));
    }

    rl.close();
})