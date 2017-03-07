var port = 1979;
var http = require('http');

function addTrace(start, status) {
    console.log("Process end");
    var end = new Date();
    var lapse = end - start;
    // TODO: Store in mongo
    console.log("Status Response: "+ status +" Time Lapse = " +lapse + "ms");
}


var server = http.createServer(function (request, response) {
    var url = require('url');
    var destinationHost = url.parse(request.url, true).query.url;

    if(destinationHost === undefined) {
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.end("Invalid URL: " + destinationHost);
    }
    else {
      // TODO: Add url validation.
      console.log("Process start");

      var dateTimeStart = new Date();

      var options = {
                    host: destinationHost,
                    port: 80,
                    path: '/'
                };

        http.get(options, function(res) {
            res.on("data", function(chunk) {
                addTrace(dateTimeStart, res.statusCode)              
            });
        }).on('error', function(e) {
            addTrace(dateTimeStart, e.statusCode)
        });
    }
});

server.listen(port);

console.log("Server running at http://localhost:" + port + "/");