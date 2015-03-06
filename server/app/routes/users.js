var models = require('./../models/index');

module.exports = function(app) {
    app.post('/login', function (req, res) {
        models.User.isUserLoginValid(req.body.data, function(userId) {
            if(noUserFound()) {
                res.send({type: 'error', msg: 'Invalid username or password'})
            } else {
                req.session.userId = userId;
                res.send({type: 'success', msg: 'Logged in'});
            }

            function noUserFound() {
                return userId === -1;
            }
        });
    });

    //app.get('/logout', function (req, res) {
    //    delete req.session.user_id;
    //    res.redirect('/login');
    //});

    //Returns {type: '(error, success)', msg: '' }
    app.post('/invite-users', function (req, res) {
        models.User.sendInvitation(req.body.data , function(result) {
            res.send(result);
        })
    });

    //TODO: check email separately

};