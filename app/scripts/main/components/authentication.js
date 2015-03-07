var auth = require('../services/auth');

module.exports = {
    statics: {
        willTransitionTo: function (transition) {
            var nextPath = transition.path;
            if (!auth.isLoggedIn()) {
                transition.redirect('/login',{},
                    { 'nextPath' : nextPath });
            }
        }
    }
};