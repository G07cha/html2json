var xhr = require("xmlhttprequest").XMLHttpRequest;

module.exports = {
    downloadPage: function(page) {
        var request = new xhr();
        
        request.open("GET", page, false);
        request.send(null); // Send the request now
        
        return request.responseText;
    }
};
