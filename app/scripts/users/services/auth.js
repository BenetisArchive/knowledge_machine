var request = require('superagent');
var cookies = require('cookies-js');

var get = function (url, cb) {
    request.get(url)
        .set("Content-Type", "application/json")
        .end(cb);
};

module.exports = {
    isLoggedIn: function() {
        return cookies.get('userId') > 0
    }
};