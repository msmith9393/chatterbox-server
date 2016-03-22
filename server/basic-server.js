var fs = require('fs');
var http = require('http');
var handler = require('./request-handler');

var port = 3000; // Other options are: 8080 and 1337

var ip = '127.0.0.1';

var server = http.createServer(handler.requestHandler);
console.log('Listening on http://' + ip + ':' + port);
server.listen(port, ip);

// To start this server, run:  node basic-server.js
// To connect to the server, load http://127.0.0.1:3000


server.on('request', function(request, response) {
  // the same kind of magic happens here!
  console.log('REQUEST ON SERVER', request.url);

});