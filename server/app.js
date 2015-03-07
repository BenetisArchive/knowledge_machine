var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash    = require('connect-flash');
var session  = require('express-session');

var app = module.exports.app = exports.app = express();

function checkAuth (req, res, next) {
    if (req.url !== '/login') {
        if(!req.session.userId) {
            res.send('Unauthorized');
            return;
        }
    }
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
}

//error handling
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

//Configuration
app.use(cookieParser());
app.use(session({
    cookie: {
        maxAge: 36000000
    },
    resave: true,
    saveUninitialized: true,
    secret: 'keyboard_cat'
}));
app.use(checkAuth);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash());

//Routes
app.use("/public", express.static(__dirname + "/../build/"));
require('./app/routes')(app);
module.exports = app;

