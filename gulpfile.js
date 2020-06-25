const gulp = require('gulp');
const sass = require('gulp-sass');
const prompt = require('gulp-prompt');
const browserSync = require('browser-sync');
const fs = require('fs');
const env = require('gulp-env');
const pug = require('gulp-pug');
const htmlMinify = require('gulp-html-minifier');
const inlineStyle = require('gulp-inline-css');
const mail = require('gulp-mail');
const reload = browserSync.reload;
const { promisify } = require('util');

const to = require('./config/mail');
const configBrowserSync = require('./config/browsersync');
const { DIR_DEVELOPMENT, DIR_PATH } = require('./config/constants');

gulp.task('pug', () => {
	const pugCompile = gulp.src('src/**/*.pug')
		.pipe(pug({ pretty: true }))
		.pipe(gulp.dest(DIR_PATH.temp));
	return pugCompile;
});

gulp.task('html', () => {
	const htmlCompile = gulp.src('src/**/*.html')
		.pipe(gulp.dest(`${DIR_PATH.temp}/`));
	return htmlCompile;
});

gulp.task('temp-html-min', () => {
	return gulp.src(`${DIR_PATH.temp}/**/*.html`)
		.pipe(htmlMinify({collapseWhitespace: true}))
		.pipe(gulp.dest(`${DIR_PATH.production}/`));
});

gulp.task('sass', () => {
	const sassCompile = gulp.src('src/**/*.scss')
		.pipe(sass({ outputStyle:'expanded' }).on('error', sass.logError))
		.pipe(gulp.dest(DIR_PATH.temp));
	return sassCompile;
});

gulp.task('inline-css', () => {
	return gulp.src(`${DIR_PATH.temp}/**/*.html`)
		.pipe(inlineStyle())
		.pipe(gulp.dest(DIR_PATH.release));
});

gulp.task('pug-watch', ['sass', 'pug'], reload);
gulp.task('html-watch', ['sass', 'html'], reload);
gulp.task('html-temp-watch', reload);

gulp.task('development', ['html', 'sass', 'inline-css'], () => {
	browserSync(configBrowserSync);
	gulp.watch('src/**/*.html', ['html-watch']);
	gulp.watch('src/**/*.scss', ['html-watch']);
	gulp.watch(`${DIR_PATH.temp}/**/*.html`, ['html-temp-watch', 'inline-css']);
});

gulp.task('development-pug', ['pug', 'sass', 'inline-css'], () => {
	browserSync(configBrowserSync);
	gulp.watch('src/**/*.pug', ['pug-watch']);
	gulp.watch('src/**/*.scss', ['html-watch']);
	gulp.watch(`${DIR_PATH.temp}/**/*.html`, ['html-temp-watch', 'inline-css']);
});

// test send email
gulp.task('mail-min', () => {
	return gulp.src(`./${DIR_PATH.production}/${DIR_DEVELOPMENT}/template.html`)
		.pipe(mail(to));
});
gulp.task('mail', async () => {
	return gulp.src(`./${DIR_PATH.release}/${DIR_DEVELOPMENT}/template.html`)
	.pipe(mail(to));
});


