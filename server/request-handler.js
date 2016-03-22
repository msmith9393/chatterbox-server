var body = [];

var requestHandler = function(request, response) {

  var headers = {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'access-control-allow-headers': 'content-type, accept',
    'access-control-max-age': 10 // Seconds.
  };

  headers['Content-Type'] = 'application/json';

  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  if (request.method === 'OPTIONS') {
    response.writeHead(200, headers);
    response.end('Hello World');

  } else if (request.method === 'POST') {
    if (request.url === '/classes/messages') {

      request.on('data', function(chunk) {
        var results = '';
        results += chunk.toString('utf8');
        body.push(JSON.parse(results));
      });
    
      response.writeHead(201, headers);
      response.end();

    } else {
      
      response.writeHead(404, {'Content-Type': 'text/html'});
      response.end('Error in POST');
    }

  } else if (request.method === 'GET') {
    
    if (request.url !== '/classes/messages') {
      response.writeHead(404, {'Content-Type': 'type/html'});
      response.end('Non-existent File');
    } else {
      var sendObj = {
        headers: headers,
        method: request.method,
        url: request.url,
        results: body
      };
      
      console.log(body);
      response.writeHead(200, headers);      
      response.end(JSON.stringify(sendObj));
    }

  } else {
    response.writeHead(404, {'Content-Type': 'type/html'});
    response.end('Non-existent File');
  }

};


module.exports = requestHandler;