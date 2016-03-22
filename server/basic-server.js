var fs = require('fs');
var http = require('http');
var handleRequest = require('./request-handler');

var port = 3000; // Other options are: 8080 and 1337

var ip = '127.0.0.1';

var server = http.createServer(handleRequest);
console.log('Listening on http://' + ip + ':' + port);
server.listen(port, ip);

// To start this server, run:  node basic-server.js
// To connect to the server, load http://127.0.0.1:3000