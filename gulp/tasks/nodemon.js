var nodemon = require('gulp-nodemon');
var config = require('../config');
var error_handler = require('../error_handler');

gulp.task('nodemon', function (cb) {
    var called = false;
    return nodemon({
        script: config.server_app,
        watch: ['./server'],
        nodeArgs: ['--debug=5858']
    }).on('start', function () {
        if (!called) {
            called = true;
            cb();
        }
    }).on('crash', error_handler);
});