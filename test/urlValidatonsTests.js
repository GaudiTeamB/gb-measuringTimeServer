var chai = require('chai');
var assert = chai.assert;

var urlValidations = require('../urlValidations.js');

var isValidProtocol = urlValidations.isValidProtocol;

describe('Valid Protocol',  function(){
    var validProtocolsArray = ["http:", "https:", undefined, null];

    validProtocolsArray.forEach( (protocol) => 
        it(protocol + ' should return true', function(){
            assert.isOk(isValidProtocol(protocol, 'The protocol ' + protocol + ' must be valid.'));
        }))
});

describe('Invalid Protocol',  function(){
    var invalidProtocolsArray = ["ftp:", "ftps:", "0", "1"];

    invalidProtocolsArray.forEach( (protocol) => 
        it(protocol + ' should return false', function(){
            assert.isNotOk(isValidProtocol(protocol, 'The protocol ' + protocol + ' must be NOT valid.'));
        }))
});

var isValidHost = urlValidations.isValidHost;

describe('Valid HOST', function(){
    var validHostArray = [
        "foo.com",
        "www.example.com",
        "✪df.ws/123",
        "userid:password@example.com",
        "userid@example.com",
        "userid:password@example.com",
        "142.42.1.1",
        "☺.damowmow.com",
        "code.google.com",
        "j.mp",
        "-.~_!$&'()*+,;=:%40:80%2f::::::@example.com",
        "1337.net",	
        "a.b-c.de",	
        "223.255.255.254",
        ];

        validHostArray.forEach( (host) => 
            it(host +' should return true', function(){
                assert.isOk(isValidHost(host), "The HOST " + host + " must be valid.");
            })
        );
});

describe('Invalid HOST', function(){
    var invalidHostArray = [
        "",	
        ".",	
        "..",	
        "?",	
        "??",
        "#",	
        "##",
        "//",	
        "//a",	
        "///a",	
        "///",	
        "/a",
    ];

    invalidHostArray.forEach( (host) => 
        it(host + ' should return False', function(){
            assert.isNotOk(isValidHost(host), "The HOST "+ host + " must be NOT valid.");
        }));
});