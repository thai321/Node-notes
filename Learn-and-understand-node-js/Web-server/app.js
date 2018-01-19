var http = require('http');
var fs = require('fs');

http
  .createServer(function(req, res) {
    /*
    // res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.writeHead(200, { 'Content-Type': 'text/html' });
    var html = fs.readFileSync(__dirname + '/index.html', 'utf8');
    var message = 'Hello world....';

    html = html.replace('{Message}', message);
    // res.end('Hello world\n');
    res.end(html);
    */
    /*
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream(__dirname + '/index.html').pipe(res);
    */


    if(req.url === '/') {
      fs.createReadStream(__dirname + '/index.html').pipe(res);
    } else if (req.url === '/api') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      var obj = {
        firstname: 'John',
        lastname: 'Doe'
      };
      res.end(JSON.stringify(obj));
    } else {
      res.writeHead(404);
      res.end();
    }
  })
  .listen(1337, '127.0.0.1');
