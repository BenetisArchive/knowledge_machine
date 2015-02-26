var run_sequence = require('run-sequence');

gulp.task('production', function(cb) {
    run_sequence(['copy.html.production', 'sprites', 'react'],
        ['browserify.production', 'sass.production'], cb);
});
