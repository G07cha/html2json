var converter = require('../lib/converter');
var assert = require('assert');

function compareObjects(html, expectingObject) {
    assert.equal(JSON.stringify(converter.convertToJSON(html)), JSON.stringify(expectingObject));
}

describe('Converter', function() {
    it('should return object with head element containing text property', function () {
        compareObjects('<head>foo</head>', { head: { text: "foo" } });
    });
        
    it('should return array of "a" objects', function() {
        compareObjects("<a>0</a><a>1</a>", {a: [ { text: "0" }, { text: "1" } ] });
    });
    
    it('should return object with \'true\' value', function() {
        compareObjects('<test hidden></test>', { test: { hidden: true } });
    });
    
    it('should return several attributes for tag', function() {
        compareObjects('<test foo=bar hidden myname=skrillex>yo</test>',  { test: { foo: 'bar', hidden: true, myname: 'skrillex', text:'yo' } } );
    });
    
    it('should ignore comments', function() {
        compareObjects('<html><!--comment--></html><!--another comment-->', { html: { } });
    });
    
    it('should return element with one-liner tag child and normal tag child');
    
    it('should return correct element folding');
});
