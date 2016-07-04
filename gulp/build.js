'use strict';

var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var exec = require('sync-exec');
var surge = require('gulp-surge');

var $ = require('gulp-load-plugins')({
	pattern: ['gulp-*', 'del']
});

module.exports = function(options) {
	gulp.task('build:js',gulp.series('scripts', function () {
		return gulp.src(options.tmp + '/serve/app/index.js')
			.pipe($.rename(function (path) {
				path.basename = "lulu"
			}))
			.pipe(gulp.dest(options.dist + '/'))
			.pipe($.size({ title: options.dist + '/', showFiles: true }));
	}));

	// gulp.task('build:examples', function (done) {
	// 	runSequence('clean:examples','html:examples','copy:scripts:examples','copy:others:examples',done)
	// });

	// gulp.task('copy:scripts:examples', function () {
	// 	return gulp.src(options.tmp+'/serve/**/*.js')
	// 	.pipe(gulp.dest('examples/'))
	// });

	// gulp.task('copy:others:examples', function () {
	// 	return gulp.src('test/**/*.{ico,png,jpg}')
	// 	.pipe(gulp.dest('examples/'))
	// });

	// gulp.task('html:examples', ['inject'], function () {
	// 	var assets;
	// 	return gulp.src(options.tmp + '/serve/*.html')
	// 		.pipe(assets = $.useref.assets())
	// 		.pipe($.rev())
	// 		.pipe($.if('*.js', $.preprocess({context: {dist: true}})))
	// 		.pipe($.if('*.js', $.uglify()))
	// 		.pipe(assets.restore())
	// 		.pipe($.useref())
	// 		.pipe($.revReplace())
	// 		.pipe($.if('*.html', $.preprocess({context: {dist: true}})))
	// 		.pipe($.if('*.html', $.minifyHtml({empty: true,	spare: true, quotes: true, conditionals: true})))
	// 		.pipe(gulp.dest('examples/'))
	// 		.pipe($.size({ title: 'examples/', showFiles: true }));
	// });

	gulp.task('mincopy:js', function () {
		return gulp.src(options.dist + '/*.js')
			.pipe($.uglify())
			.pipe($.rename(function (path) {
				path.extname = ".min.js"
			}))
			.pipe(gulp.dest(options.dist + '/'))
			.pipe($.size({ title: options.dist + '/', showFiles: true }));
	});

	gulp.task('clean', function () {
		return $.del([options.dist + '/', options.tmp + '/']);
	});

	// gulp.task('clean:examples', function (done) {
	// 	$.del(['examples/', options.tmp + '/'], done);
	// });

	gulp.task('build',gulp.series('clean','build:js','mincopy:js'));

	// gulp.task('deploy:examples',['build:examples'],function(done){
	// 	var c = [
	// 		'cd examples',
	// 		'git init',
	// 		'git add .',
	// 		'git commit -m "Deploy to Github Pages"',
	// 		'git push --force git@github.com:webcaetano/craft.git master:gh-pages' // remove pagezz to pages
	// 	].join(" && ")
	// 	console.log(exec(c));
	// 	done();
	// })
};
