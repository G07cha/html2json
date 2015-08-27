var _ = require('underscore');

module.exports = {
    convertToJSON: function(html) {
        var tags = filterHTML(html);
        var json = parseTags(tags);
        
        return json;
    }
};

//------------------
// Private functions
//------------------

function filterHTML(html) {
    var splitedHTML = html.split("<"),
        tagsList = {},
        closedTags = [],
        openedTags = [];
    
    splitedHTML.forEach(function(tag) {
        //Filtering empty tags and comments
        if(tag && tag.indexOf('!--') === -1) {
            //Filtering closing tags
            if(tag[0] !== '/') {
                openedTags.push(tag);
            } else {
                closedTags.push(tag.trim());
            }
        }
    });
    tagsList.openedTags = openedTags;
    tagsList.closedTags = closedTags;
    return tagsList;
}


function parseTags (tags) {
    var result = {};
    
    tags.openedTags.forEach(function(tag) {
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
            
            _.extend(parsedTag, _.object([pair]));
        }
        
        //Appending inner content
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
