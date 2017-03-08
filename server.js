var port = 1980;
var express = require('express');
var logic = require('./logic');
var app = express();

// create our router
var router = express.Router();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (request, response) {

   var destinationHost = logic.retrieveUrl(request);
 
    if(destinationHost === undefined || !logic.isValidUrl(destinationHost)) {
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.end("Invalid URL: " + destinationHost);
    }
    else {
        var start = new Date();
        // TODO: Store in mongo StartTime
        console.log("Start Time: " + start);
        logic.httpCall(destinationHost).then(status => logic.addTrace(start, status)).catch((error) => logic.addTrace(dateTimeStart, 500));     
    }
})

// POST method route
app.post('/', function (req, res) {
  res.send('POST request to the homepage')
  console.log('POST method called');
})

app.listen(port);
console.log('Magic happens on port ' + port);