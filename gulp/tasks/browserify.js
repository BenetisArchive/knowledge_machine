var browserify = require('browserify');
var gulp = require('gulp');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var config = require('../config');
var error_handler = require('../error_handler');
var watchify = require('watchify');
var gutil = require('gulp-util');
var pretty_hrtime = require('pretty-hrtime');
var browser_sync = require('browser-sync');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');

gulp.task('browserify.production', function () {
    build(false);
});

gulp.task('browserify', function () {
    build(true);
});

function build(watch) {
    var bundler = browserify(
        config.compiled_entry,
        {
            cache: {},
            packageCache: {},
            fullPaths: true,
            external: ['react']
        }
    );
    if (watch) {
        bundler = watchify(bundler);
    }
    bundler.transform(reactify);
    var rebundle = function () {
        var startTime = process.hrtime();
        gutil.log('Rebundling...');
        var bundleStream = bundler.bundle();
        bundleStream.on('error', error_handler);
        bundleStream = bundleStream.pipe(source('app.js'));
        if(!watch) { //If production
            bundleStream.pipe(streamify(uglify()));
        }
        return bundleStream.pipe(gulp.dest(config.build))
            .on('end', function() {
                gutil.log('Finished', gutil.colors.blue('rebundling'), 'in', gutil.colors.magenta(pretty_hrtime(process.hrtime(startTime))));
                browser_sync.reload();
            })
    };

    bundler.on('update', rebundle);
    return rebundle();
}