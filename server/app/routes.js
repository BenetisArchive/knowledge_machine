var express = require('express');
var router = express.Router();

module.exports = function(app, passport) {
    app.get('/', function(req, res) {
        res.send({works: 'Congrats'})
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
};