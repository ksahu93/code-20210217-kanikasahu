const csv = require('csv-parser');
const fs = require('fs');

const path = '/home/ttn/Documents/NODE/first/resources/data.csv';

logFileStats(path)

function getFileSize(path){
    return fs.statSync(path).size
}

function logFileStats(path){
    let fileSize = getFileSize(path)
    if(!fileSize){
        return
    }

    let columns = []
    let count = 0

    fs.createReadStream(path)
        .pipe(csv({separator: ';'}))
        .on('headers', (headers) => {
            columns = headers;
        })
        .on('data', () => {
            count++;
        })
        .on('end', () => {
            console.log("File size:", fileSize, "Bytes");
            console.log("Columns in the file:", columns);
            console.log("Number of rows in the file:", count);
        });
}