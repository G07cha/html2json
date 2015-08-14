var downloader = require('../lib/downloader');
var fs = require('fs');
var assert = require('assert');


describe('Downloader', function() {
    it('should return undefined becouse page don\'t exitst', function () {
        assert.equal(downloader.downloadPage("http://www.gfhfdhdfsgdhtwgegdshbfnr.net/"), undefined);
    });
    
    it('should return tiny page', function () {
        var tinyPage = fs.readFileSync('test/418.html');
        assert.equal(downloader.downloadPage("http://httpbin.org/status/418"), tinyPage);
    });
    
    it('should return static page', function() {
        assert(downloader.downloadPage("http://pygreen.neoname.eu/").indexOf('alt="Fork me on GitHub"') > -1, "Don't found one of static's page tags");
    });
});
