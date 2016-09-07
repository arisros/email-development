var gulp = require('gulp');
var emailBuilder = require('gulp-email-builder');
var options = { encodeSpecialChars: true }

gulp.task('emailBuilder', function () {
	return gulp.src(['./src/*.html'])
		.pipe(emailBuilder(options).build())
		.pipe(gulp.dest('dist/'));
});