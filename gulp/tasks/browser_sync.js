var browser_sync = require('browser-sync');
var config = require('../config');
var run_sequence = require('run-sequence');

gulp.task('reload_browser', function() {
    browser_sync.init(null, {
        //server: {
        //    baseDir: config.build
        //},
        proxy: "http://localhost:3000",
        open: false,
        port: 5000
    });
});


gulp.task('browser_sync', function(cb) {
    //run_sequence([ 'reload_browser'], ['nodemon'], cb);
    run_sequence([ 'reload_browser'], ['nodemon'], cb);
});
