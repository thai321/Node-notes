var fs = require('fs');
var zlib = require('zlib');

// var readable = fs.createReadStream(__dirname + '/greet.txt');

/*
var readable = fs.createReadStream(__dirname + '/greet.txt', {
  encoding: 'utf8',
  highWaterMark: 8 * 1024 // number of byte we want the buffer's size (chunk) to be
});

var writable = fs.createWriteStream(__dirname + '/greetcopy.txt');

readable.on('data', function(chunk) {
  console.log(chunk.length);
  writable.write(chunk);
});
*/

var readable = fs.createReadStream(__dirname + '/greet.txt');

var writable = fs.createWriteStream(__dirname + '/greetcopy.txt');

var compressed = fs.createWriteStream(__dirname + '/greet.txt.gz');

var gzip = zlib.createGzip();

readable.pipe(writable);
readable.pipe(gzip).pipe(compressed);
