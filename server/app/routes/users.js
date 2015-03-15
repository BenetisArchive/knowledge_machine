var models = require('./../models/index');

module.exports = function(app) {
    app.post('/login', function (req, res) {
        models.User.isUserLoginValid(req.body.data, function(userId) {
            if(noUserFound()) {
                res.json({type: 'error', msg: 'Invalid username or password'})
            } else {
                req.session.userId = userId;
                res.cookie('userId', userId, { maxAge: 900000, httpOnly: false});
                res.json({type: 'success', msg: 'Logged in'});
            }

            function noUserFound() {
                return userId === -1;
            }
        });
    });

    app.post('/logout', function (req, res) {
        res.clearCookie('userId');
        delete req.session.userId;
        res.json({type: 'success', msg: 'Logged out'});
    });

    app.get('/users', function (req, res) {
        models.User.getUsersList(function(result) {
            res.json(result)
        })
    });

    //Returns {type: '(error, success)', msg: '' }
    app.post('/invite-users', function (req, res) {
        models.User.sendInvitation(req.body.data , function(result) {
            res.json(result);
        })
    });

    //TODO: check email separately

};