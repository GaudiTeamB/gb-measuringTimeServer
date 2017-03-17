var port = 1980;
var express = require('express');
var logic = require('./logic');
var app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (request, response) {

   var destinationHost = logic.retrieveUrl(request);
   var id = logic.retrieveRequestId(request);
   var number = logic.retrieveRequestNumber(request);

   console.log("destinationHost: " + destinationHost + " id="+ id  + " number=" + number);

    if(destinationHost === undefined || !logic.isValidUrl(destinationHost)) {
        logic.sendResponse(response, 404, "Invalid URL: " + destinationHost);
    }
    else {
        var start = new Date();
        logic.httpCall(destinationHost)
            .then(function(status) { 
                console.log("destinationHost: " + destinationHost + " id="+ id  + " number=" + number);
                logic.sendResponse(response, status, "Ok"); 
                logic.storeTimes(start, status, destinationHost, id, number); 
            }).catch(function(message) { 
                console.log("destinationHost: " + destinationHost + " id="+ id  + " number=" + number);
                logic.sendResponse(response, 500, message); 
                logic.storeTimes(start, message, destinationHost, id, number); 
            });   
    }
});

// POST method route
app.post('/', function (req, res) {
  res.send('POST request to the homepage')
  console.log('POST method called');
});

app.listen(port);
console.log('Magic happens on port ' + port);