var urlValidations = require('./urlValidations.js');

module.exports = {
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

    var isValid = urlValidations.isValidHost(urlParsed.host) &&
                  urlValidations.isValidProtocol(urlParsed.protocol);
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
            res.on("data", function(chunk) {
                resolve(res.statusCode);
            });
        }).on('error', function(e) {
            reject(e.statusCode);
        });
    });
},

}