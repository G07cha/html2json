var _ = require('underscore');

var verbose;

module.exports = {
    convertToJSON: function(html, verboseMode) {
        if(verboseMode) {
            verbose = true;
            console.log("\nSource:\n" + html);
        }
        
        var tags = filterHTML(html);
        var json = parseTags(tags);
        
        return json;
    }
};

function filterHTML(html) {
    if(verbose) {
        console.log("\nFiltering HTML\n");
    }
    var filteredHTML = [];
    var splitedHTML = html.split("<");
    
    filteredHTML = _.filter(splitedHTML, function(tag) {
        if(tag && tag[0] !== '/' && tag.indexOf('!--') === -1) {
            if(verbose) {
                console.log(tag);
            }
            return tag;
        }
    });
    
    return filteredHTML;
}


function parseTags (tags) {
    if(verbose) {
        console.log("\nParsing tags\n");
    }
    
    var result = {};
    
    tags.forEach(function(tag) {
        var text, parsedTag = {};
        //Removing spaces
        tag = tag.trim();
        
        //Parsing text
        if(tag[tag.length - 1] !== '>') {
            text = tag.substring(tag.indexOf('>') + 1);
        }
        
        //Keeping only content in <tag>
        tag = tag.substring(0, tag.indexOf('>'));

        //Spliting arguments inside tag
        var params = tag.split(' ');
        
        if(Array.isArray(result[params[0]]) === false && result[params[0]]) {
            result[params[0]] = [result[params[0]]];
        } else {
            result[params[0]] = {};
        }
        
        for(var i = 1; i < params.length; i++) {
            var pair = [];
            
            if(params[i].indexOf('=') === -1) {
                pair = [params[i], true];
            } else {
                pair[0] = params[i].substring(0, params[i].indexOf('='));
                pair[1] = params[i].substring(pair[0].length + 1);
            }
            
            parsedTag = _.object([pair]);
        }
        
        if(text) {
            parsedTag.text = text;
        }
        if(Array.isArray(result[params[0]])) {
            result[params[0]].push(parsedTag);
        } else {
            _.extend(result[params[0]], parsedTag);
        }
    });
    
    return result;
}
