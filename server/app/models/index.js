var config = require('../config/database.js');
var fs = require('fs')
    , path = require('path')
    , Sequelize = require('sequelize')
    , lodash = require('lodash')
    , sequelize = new Sequelize(config.database, config.username, config.password)
    , db = {}
fs
    .readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== 'index.js')
    })
    .forEach(function (file) {
        var model = sequelize.import(path.join(__dirname, file))
        db[model.name] = model
    })

Object.keys(db).forEach(function (modelName) {
    if (db[modelName].options.hasOwnProperty('associate')) {
        db[modelName].options.associate(db)
    }
})

module.exports = lodash.extend({
    sequelize: sequelize,
    Sequelize: Sequelize
}, db)