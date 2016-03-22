var urlParser = require('url');
// var fs = require('fs');
// var page = fs.readFileSync('./client/2016-02-chatterbox-client-dir/client/index.html');

var body = [];
var objIdCounter = 1;

var requestHandler = function(request, response) {

  // var parsedUrl = urlParser(request.url);
  var parts = urlParser.parse(request.url).pathname;

  var headers = {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'access-control-allow-headers': 'content-type, accept',
    'access-control-max-age': 10 // Seconds.
  };

  headers['Content-Type'] = 'application/json';

  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  if (parts === '/classes/messages') {
    if (request.method === 'OPTIONS') {
      response.writeHead(200, headers);
      response.end('Hello World');

    } else if (request.method === 'POST') {
      var results = '';
      request.on('data', function(chunk) {
        results += chunk.toString('utf8');
      });
      
      request.on('end', function() {
        var obj = JSON.parse(results);
        obj.objectId = ++objIdCounter;
        body.push(obj);
        response.writeHead(201, headers);
        response.end(JSON.stringify(body));
      });

    } else if (request.method === 'GET') {

      var sendObj = {
        headers: headers,
        method: request.method,
        url: request.url,
        results: body
      };

      response.writeHead(200, headers);      
      response.end(JSON.stringify(sendObj));
    }

  } else {
    response.writeHead(404, headers);
    response.end('Non-existent File');
  }


};




module.exports.requestHandler = requestHandler;