var react = require('gulp-react');
var changed = require('gulp-changed');
var error_handler = require('../error_handler');
var config = require('../config');

gulp.task('react', function() {
    return gulp.src(config.react_sources)
            .pipe(changed(config.compiled, {
            extenstion: '.js'
            }))
            .pipe(react({
                    harmony: true
            }).on('error', error_handler))
            .pipe(gulp.dest(config.compiled));
});