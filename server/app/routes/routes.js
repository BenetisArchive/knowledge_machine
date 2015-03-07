var express = require('express');
var router = express.Router();
var _ = require('lodash');
module.exports = function (app) {
    var urlsWithoutAuth = ['/', '/login', '/logout'];
    function checkAuth (req, res, next) {
        var routeWithoutAuth = _.some(urlsWithoutAuth, function(url) {
            return url === req.url
        });
        if (!routeWithoutAuth) {
            var userIsNotLoggedIn = !req.session.userId;
            if(userIsNotLoggedIn) {
                res.status(403);
                res.end('Unauthorized');
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