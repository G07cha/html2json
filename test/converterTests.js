var converter = require('../lib/converter');
var assert = require('assert');


describe('Converter', function() {
    it('should return object with head element containing text property', function () {
        assert.equal(JSON.stringify(converter.convertToJSON("<head>foo</head>")), JSON.stringify({head: { text: "foo"}}));
    });
        
    it('should return array of "a" objects', function() {
        assert.equal(JSON.stringify(converter.convertToJSON("<a>0</a><a>1</a>")), JSON.stringify({a: [ { text: "0" }, { text: "1" } ] }));
    });
});
