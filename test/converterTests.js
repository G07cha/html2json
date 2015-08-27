var converter = require('../lib/converter');
var assert = require('assert');

describe('Converter', function() {
    it('should return object with head element containing text property', function () {
        assert.equal(JSON.stringify(converter.convertToJSON("<head>foo</head>")), JSON.stringify({head: { text: "foo"}}));
    });
        
    it('should return array of "a" objects', function() {
        assert.equal(JSON.stringify(converter.convertToJSON("<a>0</a><a>1</a>")), JSON.stringify({a: [ { text: "0" }, { text: "1" } ] }));
    });
    
    it('should return object with \'true\' value', function() {
        assert.equal(JSON.stringify(converter.convertToJSON('<test hidden></test>')), JSON.stringify( { test: {hidden: true} } ));
    });
    
    it('should return several attributes for tag', function() {
        assert.equal(JSON.stringify(converter.convertToJSON('<test foo=bar hidden myname=skrillex>yo</test>')), JSON.stringify( { test: {foo: 'bar', hidden: true, myname: 'skrillex', text:'yo'}}));
    });
    it('should ignore comments');
    
    it('should return element with one-liner tag child and normal tag child');
    
    it('should return form object');
    
    it('should return currect folding elements');
});
