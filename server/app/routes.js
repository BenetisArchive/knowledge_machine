var express = require('express');
var router = express.Router();
var models = require('./models');

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

    //Returns {type: '(error, success)', msg: '' }
    app.post('/invite-users', function (req, res) {
        models.User.sendInvitation(req.body.data.email , function(result) {
            res.send(result);
        })
    });


    function checkAuth(req, res, next) {
        if (!req.session.user_id) {
            res.send('You are not authorized to view this page');
        } else {
            next();
        }
    }
};