var express = require('express');
var router = express.Router();

module.exports = function (app) {
    function checkAuth (req, res, next) {
        if (req.url !== '/login' && req.url !== '/') {
            if(!req.session.userId) {
                res.send('Unauthorized');
                return;
            }
        }
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        next();
    }
    app.use(checkAuth);


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