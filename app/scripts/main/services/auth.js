var request = require('superagent');
var cookies = require('cookies-js');

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
    },
    logOut: function(callback) {
        request
            .post('/logout')
            .end(function(error, res){
                callback(JSON.parse(res.text));
            });
    },
    onChange: function() {}
};