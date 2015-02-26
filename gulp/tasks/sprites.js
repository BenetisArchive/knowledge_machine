var config = require('../config');
var imagemin = require('gulp-imagemin');
var runSequence = require('run-sequence');
var spritesmith = require('gulp.spritesmith');
gulp.task('sprites' ,function () {
    runSequence('generateSpriteFiles', 'sass');
});

gulp.task('generateSpriteFiles', function() {
    var spriteData = gulp.src(config.sprites_sources).pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: '_sprite.scss'
    }));
    // Pipe image stream through image optimizer and onto disk
    spriteData.img
        .pipe(imagemin())
        .pipe(gulp.dest(config.build));

    // Pipe CSS stream through CSS optimizer and onto disk
    spriteData.css
        .pipe(gulp.dest(config.sass_dir));
});