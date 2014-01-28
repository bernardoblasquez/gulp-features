/* Gulp core */
var gulp = require('gulp');

/* utils */
var gutil = require('gulp-util');
var clean = require('gulp-clean');
var notify = require('gulp-notify');

/* JS Hint*/
var jshint = require('gulp-jshint');
var jshintStylish = require('jshint-stylish');

/* Preprocessors */
var less = require('gulp-less');
var coffee = require('gulp-coffee');

/* Image handling */
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache'); // cache files

/* Watch stuff */ 
var watch= require('gulp-watch');

gulp.task('default',[], function() {
    gulp.run('clean', 'copy');
});


gulp.task('jshint-all', function() {

	gulp.src('public/js/**/*.js')
	.pipe(jshint())
	.pipe(jshint.reporter(jshintStylish))
	.pipe(notify({ message: 'jshint-all task complete' }));
});


gulp.task('compile-less-all', function() {

	return gulp.src('public/less/**/*.less')
	.pipe(less())
	.pipe(gulp.dest('public/css'))
	.pipe(notify({ message: 'Compile-less-all task complete' }));
});

/* Sintax errors on Coffee files will blow up your gulp!
You need to catch de error to avoid this*/
gulp.task('compile-coffee-all', function() {
	
	return gulp.src('public/coffee/**/*.coffee')
	.pipe(coffee().on('error', gutil.log))
	.pipe(gulp.dest('public/js'))
	.pipe(notify({ message: 'Compile-coffe-all task complete' }));
});

gulp.task('clean', function() {

	return gulp.src('dist/', {read: false})
	.pipe(clean())
	.pipe(notify({ message: 'Clean task complete' }));

});

gulp.task('copy', function() {

	return gulp.src('public/**/*')
	.pipe(gulp.dest('dist'))
	.pipe(notify({message: 'Copy task complete'}));
});

gulp.task('imagemin', function() {

	return gulp.src('public/img/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 7, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/img'))
    .pipe(notify({ message: 'Imagemin task complete' }));
});


