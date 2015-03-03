var bcrypt   = require('bcrypt-nodejs');

"use strict";

module.exports = function(sequelize, DataTypes) {
    return sequelize.define("User", {
        email: {
            type: DataTypes.STRING,
            validate:  {
                isEmail: {
                    msg: 'Invalid email'
                }
            },
            allowNull: false
        },
        password: DataTypes.STRING,
        invitation_hash: DataTypes.STRING,
        registered: DataTypes.DATE
    }, {
        classMethods: {
            associate: function(models) {
                //User.hasMany(models.Task)
            },
            generateHash: function(password) {
                return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
            },
            sendInvitation: function(email, done) {
                this.create({
                    email: email,
                    password: '',
                    invitation_hash: randomHash(),
                    registered: new Date(1980, 6, 20)
                }).then(function (user) {
                    done('Successful invitation')
                }).catch(function(error) {
                    done(error.errors[0].message);
                });

                function randomHash()
                {
                    var text = "";
                    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                    for( var i=0; i < 5; i++ )
                        text += possible.charAt(Math.floor(Math.random() * possible.length));

                    return text;
                }
            }
        }
    });
};