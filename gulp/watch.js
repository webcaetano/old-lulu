var gulp = require('gulp');
var browserSync = require('browser-sync');

module.exports = function(options) {

	gulp.task('fullReload',gulp.series('inject',function(done){
		browserSync.reload();
		done();
	}));


	gulp.task('watch', gulp.series('clean','inject',gulp.parallel('scripts:watch','scripts:test:watch'), function watch(done) {
		gulp.watch([
			'test/*.html',
			'./bower.json',
			'test/scripts/**/*.{data.js}',
		], gulp.series('fullReload'));

		done();
	}));
};
