const PassThroughStream = require('stream').PassThrough
const csv = require('csv-parser');
const https = require("https");

const path = 'https://raw.githubusercontent.com/vamstar/challenge/master/Dataset3.csv';

https.get(path, response => {
    logFileStats(response.pipe(new PassThroughStream()))
});

function logFileStats(fileStream){
    let columns = []
    let count = 0;
    let totalSize = 0

        fileStream
        .on('data', (data)=>{
            totalSize+=data.length
        })
        .pipe(csv({separator: ';'}))
        .on('headers', (headers) => {
            columns = headers;
        })
        .on('data', () => {
            count++;
        })
        .on('end', () => {
            console.log("File size:", totalSize, "Bytes");
            console.log("Columns in the file:", columns);
            console.log("Number of rows in the file:", count);
        });
}