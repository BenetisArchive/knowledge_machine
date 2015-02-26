var reload = require('browser-sync').reload;
var sourcemaps = require('gulp-sourcemaps');
var minify_css = require('gulp-minify-css');
var lazypipe = require('lazypipe');
var config = require('../config');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var combine_mq = require('gulp-combine-mq');
var error_handler = require('../error_handler');

var sassTransform = lazypipe()
    .pipe(sourcemaps.init)
    .pipe(sass)
    .pipe(autoprefixer, {
        browsers: ['last 2 versions', 'IE 8'],
        cascade: false
    })
    .pipe(minify_css)
    .pipe(sourcemaps.write);

var sassOutputAndReload = lazypipe()
    .pipe(gulp.dest, config.build)
    .pipe(reload,{stream:true});

gulp.task('sass.production', function() {
    gulp.src([
        config.sass_source
    ])
        .pipe(sassTransform())
        .on('error', error_handler)
        .pipe(combine_mq())
        .pipe(concat('main.css'))
        .pipe(sassOutputAndReload())
});

gulp.task('sass', function () {
    gulp.src([
        config.sass_source
    ])
        .pipe(sassTransform())
        .on('error', error_handler)
        .pipe(combine_mq())
        .pipe(concat('main.css'))
        .pipe(sassOutputAndReload())
});