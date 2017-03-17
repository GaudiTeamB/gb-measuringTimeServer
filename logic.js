var urlValidations = require('./urlValidations.js');
var url = require('url');

module.exports = {
    sendResponse: function (response, result, message) {
        if (result === 200) {
            response.writeHead(200, { "Content-Type": "application/json" });
            response.end(JSON.stringify({ message: message }));
        } else {
            response.writeHead(500, { "Content-Type": "application/json" });
            response.end(JSON.stringify({ message: message }));
        }
    },

    storeTimes: function (start, status, destinationHost, id, number) {
        var mongoClient = require("mongodb").MongoClient;

        var end = new Date();
        var lapse = end - start;
        var item = {
            guid: id,
            number: number,
            start: start,
            end: end,
            lapse: lapse,
            endpoint: "EMEA",
        };

        mongoClient.connect("mongodb://gb-mongo:WXFU43PvnFcyHV3GW6ZmJvYhr613ZBbyuhYA3azpvpUiqDJEmHxMIXWwd4XQMPcWRzMKMy8S5zhZHz0GihVXuw==@gb-mongo.documents.azure.com:10250/?ssl=true",
            function (err, db) {
                //db.collection('gb-respose-times').drop();
                db.collection('gb-respose-times')
                    .insertOne(item, function (error, result) {
                        console.log("stored in mongo OK result: " + result + " error " + error);
                        db.close();
                    });
            });
    },

    retrieveUrl: function (request) {
        var destinationHost = url.parse(request.url, true).query.url;
        return destinationHost;
    },

    retrieveRequestId: function (request) {
        var requestId = url.parse(request.url, true).query.id;
        return requestId;
    },

    retrieveRequestNumber: function (request) {
        var requestId = url.parse(request.url, true).query.number;
        return requestId;
    },

    isValidUrl: function (destinationUrl) {
        var urlParsed = url.parse(destinationUrl, true);

        var isValid = (urlParsed.href && urlValidations.isValidHost(urlParsed.href)) ||
            (urlValidations.isValidHost(urlParsed.host) &&
                urlValidations.isValidProtocol(urlParsed.protocol));

        return isValid;
    },

    httpCall: function (destinationHost) {
        return new Promise(function (resolve, reject) {
            var http = require('http');
            var options = {
                method: 'GET',
                protocol: 'http:',
                host: destinationHost,
                port: 80,
                path: '/',
            };

            http.get(options, function (res) {
                console.log('send request');
                res.on("data", function () {
                    console.log('response retrieved');
                    resolve(res);
                });
            }).on('error', function (e) {
                reject(e.message);
            });
        });
    }

}