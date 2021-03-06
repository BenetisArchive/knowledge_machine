var bcrypt = require('bcrypt-nodejs');

"use strict";

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
            email: {
                type: DataTypes.STRING,
                validate: {
                    isEmail: {
                        msg: 'Invalid email'
                    },
                    isUnique: function (value, next) {
                        var self = this;
                        User.findOne({where: {email: value}})
                            .then(function (user) {
                                // reject if a different user wants to use the same email
                                if (user && self.id !== user.id) {
                                    return next('Email already in use!');
                                }
                                return next();
                            })
                            .catch(function (err) {
                                return next(err);
                            });
                    }
                },
                allowNull: false
            },
            password: DataTypes.STRING,
            salt: DataTypes.STRING,
            invitation_hash: DataTypes.STRING,
            registered: DataTypes.DATE,
            role: DataTypes.INTEGER
        },
        {
            classMethods: {
                associate: function (models) {
                    //User.hasMany(models.Task)
                },
                isUserLoginValid: function(data, next) {
                    console.log('this is respoding');
                    return User.findOne({where: {email: data.email}})
                        .then(function(user) {
                            var noUserOrPassDidntMatch = -1;
                            if(user) {
                                next(user.validPassword(data.password) ? user.id : noUserOrPassDidntMatch)
                            } else {
                                return noUserOrPassDidntMatch
                            }
                        })
                        .error(function(error) {
                            return -1;
                        })
                },
                generateHash: function (password) {
                    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
                },
                sendInvitation: function (data, done) {
                    this.create({
                        email: data.email,
                        password: '',
                        invitation_hash: randomHash(),
                        registered: '',
                        role: data.role
                    }).then(function (user) {
                        done({
                                type: 'success',
                                msg: 'Successful invitation'
                        })
                    }).catch(function (error) {
                        done({
                                type: 'error',
                                msg: error.errors[0].message
                        });
                    });

                    function randomHash() {
                        var text = "";
                        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                        for (var i = 0; i < 5; i++)
                            text += possible.charAt(Math.floor(Math.random() * possible.length));

                        return text;
                    }
                },
                getUsersList: function(done) {
                    var STUDENT = 1;
                    return User.findAll({attributes: ['id', 'email', 'registered'], where: {role: STUDENT}}
                    ).then(function(result) {
                        done(result)
                    })
                }
            },
            instanceMethods: {
                validPassword: function(password) {
                    return bcrypt.compareSync(password, this.password);
                }
            }
        }
    );
    return User;
};