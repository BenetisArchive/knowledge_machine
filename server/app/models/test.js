"use strict";

module.exports = function (sequelize, DataTypes) {
    var Test = sequelize.define("Test", {
            name: DataTypes.STRING
        },
        {
            classMethods: {
                associate: function (models) {
                    //User.hasMany(models.Task)
                },
                getAvailableTests: function(done) {
                    return Test.findAll({attributes: ['name']}
                    ).then(function(result) {
                            done(result)
                    })
                }
            }
        }
    );
    return Test;
};