var _ = require('underscore');

var verbose;

module.exports = {
    convertToJSON: function(html, verboseMode) {
        if(verboseMode) {
            verbose = true;
        }
        
        var tags = filterHTML(html);
        var json = parseTags(tags);
        
        return json;
    }
}

function filterHTML(html) {
    if(verbose) {
        console.log("Filtering HTML");
    }
    var filteredHTML = [];
    var splitedHTML = html.split("<");
    
    filteredHTML = _.filter(splitedHTML, function(tag) {
        if(tag && tag[0] !== '/') {
            return tag;
        }
    });
    
    return filteredHTML;
}


function parseTags (tags) {
    if(verbose) {
        console.log("Parsing tags");
    }
    
    var result = {};
    
    result = _.map(tags, function(tag) {
        var parsedTag = {};
        
        //Removing spaces
        tag = tag.trim();
        
        //Parsing text
        if(tag[tag.length - 1] !== '>') {
            parsedTag.text = tag.substring(tag.indexOf('>') + 1);
        }
        
        //TODO: Add child integration
        tag = tag.substring(0, tag.indexOf('>'));
                
        //Spliting arguments inside tag
        params = tag.split(' ');
        
        parsedTag.name = params[0];
        
        for(var i = 1; i < params.length; i++) {
            var pair = [];
            if(params[i].indexOf('=') === -1) {
                pair = [params[i], true];
            } else {
                pair[0] = params[i].substring(0, params[i].indexOf('='));
                pair[1] = params[i].substring(pair[0].length + 1);
            }
            
            _.extend(parsedTag, _.object([pair]));
        }
        
        return parsedTag;
    });
    
    return result;
}
