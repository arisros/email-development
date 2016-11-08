var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var replace = require('gulp-replace');
var inlineCss = require('gulp-inline-css');
var hmtlMinify = require('gulp-html-minifier');

var browserSync = require('browser-sync');
var reload = browserSync.reload;
var mergeStream = require('merge-stream');
var concat = require('gulp-concat');

var mail = require('gulp-mail');
var smptInfo = {
	auth: { 
		user: 'arisjiratkurniawan@gmail.com',
	},
	host: 'smtp.gmail.com',
	secureConnection: true,
	port: 465
};

var email_subject = 'Notification Eproc';
var remote_imgs_basepath = 'http://pasmandor.com/img/cs/';

// Pug Task Compile HTML to shelter folder
gulp.task('pug', function () {
	var pugCompile = gulp.src('src/**/*.pug')
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('shelter'));

	return pugCompile;
});

// Sass Task
gulp.task('sass', function () {
	var sassCompile = gulp.src('src/**/*.scss')
		.pipe(sass({outputStyle:'expanded'}).on('error',sass.logError))
		.pipe(gulp.dest('shelter'));
	return sassCompile;
});

gulp.task('sass-watch', ['sass'], reload);

gulp.task('pug-watch', ['pug'], function () {
	browserSync.reload();
            console.log('== Restarted! ==');
});

gulp.task('html-watch', function () {
	browserSync.reload();
            console.log('== Restarted! ==');
});

gulp.task('inline-css', function () {
	return gulp.src('shelter/**/*.html')
		.pipe(inlineCss())
		.pipe(gulp.dest('ready-to-fly/'));
});

gulp.task('html-min', function () {
	return gulp.src('ready-to-fly/**/*.html')
		.pipe(hmtlMinify({collapseWhitespace: true}))
		.pipe(gulp.dest('ready-to-fly-htmlmin/'));
});


gulp.task('development', ['pug', 'sass', 'inline-css'], function () {
	browserSync({
		injectChanges: true,
		files: 'shelter/new-user/template.html',
		server: {
			baseDir: './shelter/new-user/',
			index: 'template.html'
		},
	});
	gulp.watch('src/**/*.pug', ['pug-watch']);
	gulp.watch('src/**/*.scss', ['sass-watch']);
	gulp.watch('shelter/**/*.html', ['html-watch']);
});


gulp.task('mail-min', function () {
	return gulp.src('./ready-to-fly-htmlmin/new-user/template.html')
		.pipe(mail({
			subject: 'Halo, You have notify',
			to: [
				'arisjiratkurniawan@gmail.com'
				// 'arisjirat88@yahoo.com',
				// 'aris@docotel.co.id',
				// 'arisjirat@icloud.com'
			],
			cc: [
				'arisjirat88@yahoo.com'
			],
			from: 'Eproc <arisjiratkurniawan@gmail.com>',
			smtp: smptInfo
		}));
});
gulp.task('mail', function () {
	return gulp.src('./ready-to-fly/new-user/template.html')
		.pipe(mail({
			subject: 'Halo',
			to: [
				'arisjiratkurniawan@gmail.com'
				// 'arisjirat88@yahoo.com',
				// 'aris@docotel.co.id',
				// 'arisjirat@icloud.com'
			],
			cc: [
				'arisjirat88@yahoo.com'
			],
			from: 'Foo <arisjiratkurniawan@gmail.com>',
			smtp: smptInfo
		}));
});


