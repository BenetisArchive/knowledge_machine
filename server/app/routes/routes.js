var express = require('express');
var router = express.Router();

module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index.html')
    });

    app.get('/invite-users', function (req, res) {
        res.send({works: 'Congrats'})
    });

    app.get('/error', function (req, res) {
        res.send({error: 'dafa'})
    });

    app.get('/succ', function (req, res) {
        res.send({error: 'yeeeeee'})
    });
};