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
    },
    logIn: function(data, callback) {
        request
            .post('/login')
            .send({data})
            .end(function(error, res){
                callback(JSON.parse(res.text));
            });
    }
};