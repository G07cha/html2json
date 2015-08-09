var converter = require('../lib/converter');
var assert = require('assert');


describe('Converter check', function() {
    describe('Filter html', function () {
        it('should return json object with only HEAD value', function () {
            assert.equal(converter.convertToJSON("<HEAD></HEAD>")[0].name, 'HEAD');
        });
    });
});
