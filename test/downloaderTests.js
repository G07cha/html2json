var downloader = require('../lib/downloader');
var fs = require('fs');
var assert = require('assert');


describe('Downloader check', function() {
    describe('Download pages', function () {
        it('should return undefined becouse page don\'t exitst', function () {
            assert.equal(downloader.downloadPage("http://www.gfhfdhdfsgdhtwgegdshbfnr.net/"), undefined);
        });
        
        it('should return tiny page', function () {
            var tinyPage = fs.readFileSync('test/418.html');
            assert.equal(downloader.downloadPage("http://httpbin.org/status/418"), tinyPage);
        });
    });
});
