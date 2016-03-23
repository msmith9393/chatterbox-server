// TO USE EXPRESS VERSION RUN NODEMON EXPRESS-BASIC-SERVER.JS

var express = require('express');
var bodyParser = require('body-parser');
var port = 3000;
var ip = '127.0.0.1';

var app = express();
var body = [{
  text: 'Hello World',
  username: 'Megan',
  objectId: 1
}];
var objIdCounter = 1;

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.contentType('application/json');
  next();
});

app.use(bodyParser.json());


app.get('/classes/messages', function(req, res) {
  var sendObj = {
    method: 'GET',
    url: '/classes/messages',
    results: body
  };
  res.json(sendObj);
});


app.post('/classes/messages', function(req, res) {
  req.body.objectId = ++objIdCounter;
  body.push(req.body);
  res.send(body);
});

// Uncomment to have client HTML page run on local server
// app.use(express.static('client/2016-02-chatterbox-client-dir/client'));


app.listen(port, function() {
  console.log('Listening on http://' + ip + ':' + port);
});


// NOTE TO US TO INSTALL BODY PARSER AND EXPRESS