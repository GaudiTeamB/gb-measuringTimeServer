var port = 1979;
var logic = require('./logic');
var http = require('http');

var server = http.createServer(function (request, response) {

    var destinationHost = logic.retrieveUrl(request);
 
    if(destinationHost === undefined || !logic.isValidUrl(destinationHost)) {
        logic.sendResponse(response, 404, "Invalid URL: " + destinationHost)
    }
    else {
        var start = new Date();
        // TODO: Store in mongo StartTime
        console.log("Start Time: " + start);
        logic.httpCall(destinationHost).then(function(status) { logic.sendResponse(response, status, "Ok"); logic.addTrace(start, status); }).catch(function(message) { logic.sendResponse(response, 500, message); logic.addTrace(start, message); });     
    }
});

server.listen(port);

console.log("Server running at http://localhost:" + port + "/");