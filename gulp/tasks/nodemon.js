var nodemon = require('gulp-nodemon');
var config = require('../config');

gulp.task('nodemon', function (cb) {
    var called = false;
    return nodemon({
        script: config.server_app,
        watch: ['./server']
        //nodeArgs: ['--debug=5858']
    }).on('start', function () {
        if (!called) {
            called = true;
            cb();
        }
    });
});