var LocalStrategy   = require('passport-local').Strategy;

var User = require('../models/user.js');

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });


    passport.deserializeUser(function(id, done) {
        User.find(id, function(err, user) {
            done(err, user);
        });
    });


    passport.use('local', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'passwd',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(email, password, done) {
            console.log('startstartstartstartstartstartstartstartstartstartstartstartstartstartstartstartstartstartstartstartstartstartstartstartstartstartstart');
            // asynchronous
            // User.findOne wont fire unless data is sent back
            //process.nextTick(function() {
                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists
                User.find({ where: {'email' : email} }, function(err, user) {
                    console.log(email);
                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // check to see if theres already a user with that email
                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    } else {

                        // if there is no user with that email
                        // create the user
                        var newUser            = new User();

                        // set the user's local credentials
                        newUser.local.email    = email;

                        // save the user
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }

                });

            //});

    }));
};