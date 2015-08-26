var assert = require('assert');
var html2json = require("../index");
var exec = require('child_process').exec;


describe('html2json', function() {
    describe('CLI', function () {
        it('should display help topic', function(done) {
            exec('./index.js', function(error, stdout, stderr) {
                assert(stdout.indexOf('Usage:') > -1, "Don't found 'Usage' word in help topic");
                done();
            });
        });
        
        it('should display output in console', function(done) {
            exec('./index.js https://google.com', function(error, stdout, stderr) {
                assert(stdout.indexOf('{') > -1, "Output don't appear in console, recieved: " + stdout);
                done();
            });
        });
        
        it('should display output with verbose logging', function(done) {
            exec('./index.js -v https://gdfggs.com', function(error, stdout, stderr) {
                assert(stdout.indexOf('Source:') > -1, "Verbose output don't appear in console, recieved: " + stdout);
                done();
            });
        });
        
        it('should save response to file and display in console', function(done) {
            exec('rm output.json', function(error, stdout, stderr) {
                exec('./index.js -o output.json https://google.com', function(error, stdout, stderr) {
                    exec("ls -lAh | grep output.json | cut -d' ' -f7", function(error, stdout, stderr) {
                        
                        assert.equal(stdout, '263\n', "Output file don't found or have incorrect size");
                        
                        //Cleaning if assertion passed
                        exec('rm output.json', function(error, stdout, stderr) {
                            done();
                        });
                    });
                    assert(stdout.indexOf('{') > -1, "Output don't appear in console, recieved: " + stdout);
                });
            });
        });
        
        it('should save response to file', function(done) {
            exec('rm silent.json', function(error, stdout, stderr) {
                exec('./index.js -o silent.json -q https://google.com', function(error, stdout, stderr) {
                    exec("ls -lAh | grep silent.json | cut -d' ' -f7", function(error, stdout, stderr) {
                        assert.equal(stdout, '263\n', "Output file don't found or have incorrect size");
                        
                        //Cleaning if assertion passed
                        exec('rm silent.json', function(error, stdout, stderr) {
                            done();
                        });
                    });
                    assert.equal(stdout, '', "Console output isn't empty");
                });
            });
        });
    });
    
    describe('integration', function() {
        it('should return parsed page', function() {
            
            var response = html2json.convertPage('https://google.com');
            
            assert(response.indexOf('{') > -1, "Output don't appear in console, recieved: " + response);
        });
    });
});
