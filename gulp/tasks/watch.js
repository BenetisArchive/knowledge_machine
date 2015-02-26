var config = require('../config');
var reload = require('browser-sync').reload;

gulp.task('watch', ['browserify', 'browser_sync'], function() {
    gulp.watch(config.react_sources, ['react']);
    gulp.watch(config.html_sources, ['copy.html']);
    gulp.watch(config.sass_sources, ['sass']);
    gulp.watch(config.sprites_dir, ['sprites']);
});