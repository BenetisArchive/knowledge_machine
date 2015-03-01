var bcrypt   = require('bcrypt-nodejs');

"use strict";

module.exports = function(sequelize, DataTypes) {
    return sequelize.define("User", {
        email: DataTypes.STRING,
        password: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                User.hasMany(models.Task)
            },
            generateHash: function(password) {
                return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
            }
        }
    });
};