var requestHandler = function(request, response) {

  // CORS headers that allow for cross-domain posting
  var headers = {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'access-control-allow-headers': 'content-type, accept',
    'access-control-max-age': 10 // Seconds.
  };

  // The content type is JSON, per the client files
  headers['Content-Type'] = 'application/json';

  var results = [];


  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  // if (request.url === '/classes/messages?order=-createdAt') {
  //   console.log('---------------> IS CLASSES / MESSAGES');
  // }

  if (request.method === 'OPTIONS') {
    response.writeHead(200, headers);
    response.end('Hello World');

  } else if (request.method === 'POST') {
    if (request.url === '/classes/messages') {
      response.writeHead(201, headers);
      response.end();

    } else {
      
      response.writeHead(404, {'Content-Type': 'text/html'});
      response.end('Error in POST');
    }

  } else if (request.method === 'GET') {
    
    if (request.url !== '/classes/messages') {
      console.log('---------------> ERROR IS ', request.url);    
      response.writeHead(404, {'Content-Type': 'type/html'});
      response.end('Non-existent File');
    }
    
    request.on('error', function(err) {
      console.log(err);
    });

    request.on('data', function(chunk) {
      results.push(chunk);
    });
    
    request.on('end', function() {

      response.writeHead(200, headers);
      response.on('error', function(err) {
        console.log(err);
      });
     
      var responseBody = {
        headers: headers,
        method: request.method,
        url: request.url,
        results: results
      };
     
      response.end(JSON.stringify(responseBody));
    
    });

  } else {
    response.writeHead(404, {'Content-Type': 'type/html'});
    response.end('Non-existent File');
  }

};


module.exports = requestHandler;