var chai = require('chai');
var assert = chai.assert;

var logic = require('../logic.js');

var isValidUrl = logic.isValidUrl;

describe('Valid Url', function(){
    var validUrlArray = [
        "http://foo.com/blah_blah",	
        "http://foo.com/blah_blah/",
        "http://foo.com/blah_blah_(wikipedia)",
        "http://foo.com/blah_blah_(wikipedia)_(again)",
        "http://www.example.com/wpstyle/?p=364",
        "https://www.example.com/foo/?bar=baz&inga=42&quux",
        "http://✪df.ws/123",
        "http://userid:password@example.com:8080",
        "http://userid:password@example.com:8080/",
        "http://userid@example.com",
        "http://userid@example.com/",
        "http://userid@example.com:8080",	
        "http://userid@example.com:8080/",
        "http://userid:password@example.com",
        "http://userid:password@example.com/",
        "http://142.42.1.1/",
        "http://142.42.1.1:8080/",
        "http://➡.ws/䨹",
        "http://⌘.ws",
        "http://⌘.ws/",
        "http://foo.com/blah_(wikipedia)#cite-1",
        "http://foo.com/blah_(wikipedia)_blah#cite-1",
        "http://foo.com/unicode_(✪)_in_parens",
        "http://foo.com/(something)?after=parens",
        "http://☺.damowmow.com/",
        "http://code.google.com/events/#&product=browser",
        "http://j.mp",
        "http://foo.bar/?q=Test%20URL-encoded%20stuff",
        "http://مثال.إختبار",	
        "http://例子.测试",
        "http://उदाहरण.परीक्षा",
        "http://-.~_!$&'()*+,;=:%40:80%2f::::::@example.com",
        "http://1337.net",	
        "http://a.b-c.de",	
        "http://223.255.255.254",
        ];

        validUrlArray.forEach( (validUrl) => 
            it(validUrl +' should return true', function(){
                assert.isOk(isValidUrl(validUrl), "The Url " + validUrl + " must be valid.");
            })
        );
});

describe('Invalid Url', function(){
    var invalidUrlArray = [
        "http://",	
        "http://.",	
        "http://..",	
        "http://../",	
        "http://?",	
        "http://??",	
        "http://??/",	
        "http://#",	
        "http://##",	
        "http://##/",	
        "//",	
        "//a",	
        "///a",	
        "///",	
        "http:///a",	
        "foo.com",	
        "rdar://1234",	
        "h://test",	
        "http:// shouldfail.com",	
        ":// should fail",	
        "ftp://foo.bar/baz",
        "ftps://foo.bar/",	
        /*"http://-error-.invalid/",	
        "http://a.b--c.de/",	
        "http://-a.b.co",	
        "http://a.b-.co",	
        "http://3628126748",	
        "http://.www.foo.bar/",	
        "http://www.foo.bar./",	
        "http://.www.foo.bar./"*/
    ];

    invalidUrlArray.forEach( (invalidUrl) => 
        it(invalidUrl + ' should return False', function(){
            assert.isNotOk(isValidUrl(invalidUrl), "The Url "+ invalidUrl + " must be NOT valid.");
        }));
});