var models = require('./../models/index');

module.exports = function(app) {
    app.get('/tests', function (req, res) {
        models.Test.getAvailableTests(function(result) {
            res.json(result)
        })
    });
};