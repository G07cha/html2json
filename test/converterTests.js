var converter = require('../lib/converter');
var assert = require('assert');


describe('Converter check', function() {
    describe('Filter html', function () {
        it('should return object with head element containing text property', function () {
            assert.equal(converter.convertToJSON("<head>foo</head>").head.text, 'foo');
        });
        
        it('should return second element of array', function() {
            assert.equal(converter.convertToJSON("<a>0</a><a>1</a>").a[1].text, '1');
        });
    });
});
