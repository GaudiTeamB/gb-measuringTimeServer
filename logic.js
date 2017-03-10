var urlValidations = require('./urlValidations.js');

module.exports = {
sendResponse: function(response, result, message){
    if(result === 200){
        response.writeHead(200, {"Content-Type": "application/json"});
        response.end(JSON.stringify({ message : message }));
    } else {
        response.writeHead(500, {"Content-Type": "application/json"});
        response.end(JSON.stringify({ message : message }));
    }
},

addTrace: function (start, status) {
    var end = new Date();
    // TODO: Store in mongo EndTime
    console.log("End Time: " + end);
    var lapse = end - start;
    // TODO: Store in mongo Status
    console.log("Status Response: "+ status +" Time Lapse = " +lapse + "ms");
},

retrieveUrl: function(request){
    var url = require('url');
    var destinationHost = url.parse(request.url, true).query.url;
    return destinationHost;
},

isValidUrl: function (destinationUrl) {
    var url = require('url');
    var urlParsed = url.parse(destinationUrl, true);

    // TODO: isValidHost is not the proper check for this field. Custom check needed.
    var isValid = (urlParsed.href && urlValidations.isValidHost(urlParsed.href)) || 
                  (urlValidations.isValidHost(urlParsed.host) &&
                  urlValidations.isValidProtocol(urlParsed.protocol));

     return isValid;
},

httpCall: function(destinationHost) {
    return new Promise(function (resolve, reject) {
        var http = require('http');
        var options = {
                    host: destinationHost,
                    port: 80,
                    path: '/'
                };

        http.get(options, function(res) {
            res.on("data", function() {
                resolve(res.statusCode);
            });
        }).on('error', function(e) {
            reject(e.message);
        });
    });
}

}