var gulp = require('gulp');
var connect = require('gulp-connect');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('webserver', function() {
    connect.server({
        port: 3003,
        liverreload: true
    });
});

gulp.task('build', function() {
    return browserify({
        entries: './js/main.js',
        extentions: ['.js'],
        debug: true
    })
    .transform('babelify', {presets: ['es2015', 'react']})
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload())
})

gulp.task('watch', ['build'], function() {
    gulp.watch('./js/**/*.js', ['build'])
})

gulp.task('default', ['webserver', 'watch'])
