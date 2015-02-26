var config = require('../config');

var reload = require('browser-sync').reload;
var lazypipe = require('lazypipe');
var minify_html = require('gulp-minify-html');


var htmlOutputAndReload = lazypipe()
    .pipe(gulp.dest, config.build)
    .pipe(reload, {stream:true});

gulp.task('copy.html', function() {
    return gulp.src(config.html_sources)
        .pipe(htmlOutputAndReload())
});

gulp.task('copy.html.production', function() {
    return gulp.src(config.html_sources)
        .pipe(minify_html())
        .pipe(htmlOutputAndReload())
});