var gulp = require('gulp');
var inlineCss = require('gulp-inline-css');

/**
 * run with env
 * example:
 * TARGET_DIR=somefolder gulp inline-css
 */

gulp.task('inline-css', () => {
	const dir = `../templates/${process.env.TARGET_DIR}`
	const source = `${dir}/index.html`
	const destinations = `${dir}/tomail`

 	return gulp.src(source)
		.pipe(inlineCss())
		.pipe(gulp.dest(destinations));
});
