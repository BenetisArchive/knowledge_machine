var models = require('./../models/index');

module.exports = function(app) {
    app.post('/login', function (req, res) {
        var post = req.body;
        if (post.user === 'john' && post.password === 'johnspassword') {
            req.session.user_id = johns_user_id_here;
            res.redirect('/my_secret_page');
        } else {
            res.send('Bad user/pass');
        }
    });

    app.get('/logout', function (req, res) {
        delete req.session.user_id;
        res.redirect('/login');
    });

    //Returns {type: '(error, success)', msg: '' }
    app.post('/invite-users', function (req, res) {
        models.User.sendInvitation(req.body.data , function(result) {
            res.send(result);
        })
    });

    //TODO: check email separately

    function checkAuth(req, res, next) {
        if (!req.session.user_id) {
            res.send('You are not authorized to view this page');
        } else {
            res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
            next();
        }
    }
};