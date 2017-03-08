var port = 1979;
var logic = require('./logic');
var http = require('http');

var server = http.createServer(function (request, response) {

    var destinationHost = logic.retrieveUrl(request);
 
    if(destinationHost === undefined || !logic.isValidUrl(destinationHost)) {
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.end("Invalid URL: " + destinationHost);
    }
    else {
        var start = new Date();
        // TODO: Store in mongo StartTime
        console.log("Start Time: " + start);
        logic.httpCall(destinationHost).then(status => logic.addTrace(start, status)).catch((error) => logic.addTrace(start, 500));     
    }
});

server.listen(port);

console.log("Server running at http://localhost:" + port + "/");