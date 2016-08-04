var gulp = require('gulp');
var sass = require('gulp-sass');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var runSequence = require('run-sequence');

gulp.task('sass', function(){
    return gulp.src('public/sass/app.scss')
        .pipe(sass()) // Converts Sass to CSS with gulp-sass
        .pipe(gulp.dest('public/app/build/css'));
});

gulp.task('copy', function() {
    return gulp.src('node_modules/disk-browser/dist/**/*')
        // Start piping stream to tasks!
        .pipe(gulp.dest('public/app/build/disk-browser'));
});

gulp.task('default', function (callback) {
    runSequence(['sass', 'copy'],
        callback
    )
});