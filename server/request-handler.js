/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/


var requestHandler = function(request, response) {

  var method = request.method;
  var url = request.url;
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'application/json';
  var statusCode = 200;
  var body = [];
  
  console.log('Serving request type ' + request.method + ' for url ' + request.url);



  if (method === 'POST') {

    request.on('error', function(err) {
      console.error(err);
    });

    request.on('data', function(chunk) {
      body.push(chunk);
    });

    request.on('end', function() {
      body = Buffer.concat(body).toString();

      response.on('error', function(err) {
        console.error(err);
      });

      response.writeHead(statusCode, headers);

      var responseBody = {
        headers: headers,
        method: method,
        url: url,
        body: body
      };

      response.write(JSON.stringify(responseBody));
      response.end();

    });

  } else if (method === 'GET') {
      
    response.end(JSON.stringify(body));


  } else {
    response.writeHead(404, headers);
  }

  

  // if (request.method === 'GET') {
  //   // send response back to client
  //   response.end('It works!! Path Hit: Get ' + storage);
  //   request.on('data', function(message) {
  //     storage.results.push(message);
  //   });
  //   console.log(storage);

  // } else {
  //   // store data from client
  //   storage.results.push(request.postData);
  //   response.end('It works!! Path Hit: Options ' + storage);

  // }

  // if (request.method === 'GET') {
  //   // parse the results array and send it back to client
  //   response.writeHead(statusCode, headers);

  // } else if (request.method === 'POST') {
  //   // store response in results array
  //   response.writeHead(statusCode, headers);

  // } else if (request.method === 'OPTIONS') {
  //   // mention that server is being checked
  //   response.writeHead(statusCode, headers);
  // } else {
  //   // log 404
  
  // }


};


  // request: function(url, method, postdata) {
  //   this.url = url;
  //   this.method = method;
  //   this._postData = postdata;
  //   this.setEncoding = function() { /* noop */ };

  //   this.addListener = this.on = function(type, callback) {
  //     if (type === 'data') {
  //       callback(JSON.stringify(this._postData));
  //     }

  //     if (type === 'end') {
  //       callback();
  //     }

  //   }.bind(this);
  // }


// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

module.exports = requestHandler;
