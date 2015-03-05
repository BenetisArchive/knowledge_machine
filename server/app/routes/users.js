var models = require('./../models/index');

module.exports = function(app) {
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