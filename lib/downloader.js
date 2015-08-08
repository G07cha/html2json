var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = {
    downloadPage: function(page) {
        var request = new XMLHttpRequest();
        request.open("GET", page);
        request.onreadystatechange = function() {
            if (request.readyState === 4 && request.status === 200) {
                console.log(request.responseText);
            }
        };

        request.send(null); // Send the request now
    }
}
