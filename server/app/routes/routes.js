var express = require('express');
var router = express.Router();

module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index.html')
    });

    app.get('/invite-users', function (req, res) {
        res.json({works: 'Congrats'})
    });

    app.get('/logged_in', function (req, res) {
        console.log(req.session.userId);
        res.end(req.session.userId+"")
    });

    app.get('/succ', function (req, res) {
        res.json({error: 'yeeeeee'})
    });
};