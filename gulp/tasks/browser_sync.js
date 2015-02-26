var browser_sync = require('browser-sync');
var config = require('../config');
var run_sequence = require('run-sequence');

gulp.task('reload_browser', function() {
    browser_sync.init(null, {
        //server: {
        //    baseDir: config.build
        //},
        proxy: "localhost:3000",
        open: false
    });
});


gulp.task('browser_sync', function(cb) {
    run_sequence(['nodemon', 'reload_browser'], cb);
});
