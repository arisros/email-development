var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var replace = require('gulp-replace');
var inlineCss = require('gulp-inline-css');

var browserSync = require('browser-sync');
var reload = browserSync.reload;
var mergeStream = require('merge-stream');
var concat = require('gulp-concat');

var mail = require('gulp-mail');
var smptInfo = {
	auth: { 
		user: 'arisjiratkurniawan@gmail.com',
		pass : 'F7f%4#@F7f%4#@'
	},
	host: 'smtp.gmail.com',
	secureConnection: true,
	port: 465
};

// Gulp-email wait approval from mailgun account
// var sendEmail = require('gulp-email');
// var options = {
//         user: 'api:key-7bb35e5c051d738163e69000c49bc18a',
//         url: 'https://api.mailgun.net/v3/sandbox25f420ce8ecf41878e7b9836d3c0ec9e.mailgun.org/messages',
//         form: {
//             from: 'John Doe <John.Doe@gmail.com>',
//             to: 'Fulano Mengano <arisjiratkurniawan@gmail.com>',
//             subject: 'The last dist',
//         }
//     };

// 
// 
// Doesn't Work yet!
// var emailBuilder = require('gulp-email-builder');
// var options = { encodeSpecialChars: true };
// var buildEmail = new emailBuilder({ encodeSpecialChars: true});

// Current Date
var current_date = new Date().toString();
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

gulp.task('development', ['pug', 'sass'], function () {
	browserSync({
		injectChanges: true,
		files: 'shelter/notifications/template.html',
		server: {
			baseDir: './shelter/notifications/',
			index: 'template.html'
		},
	});
	gulp.watch('src/**/*.pug', ['pug-watch']);
	gulp.watch('src/**/*.scss', ['sass-watch']);
	gulp.watch('shelter/**/*.html', ['html-watch']);
});

gulp.task('inline-css', function () {
	return gulp.src('shelter/**/*.html')
		.pipe(inlineCss())
		.pipe(gulp.dest('ready-to-fly/'));
});

// Gulp-email wait approval from mailgun account
gulp.task('send', function () {
	return gulp.src('ready-to-fly/notifications/*.html')
		.pipe(sendEmail(options));
});

gulp.task('mail', function () {
	return gulp.src('./ready-to-fly/notifications/template.html')
		.pipe(mail({
			subject: 'Halo',
			to: [
				'arisjiratkurniawan@gmail.com',
				'aris@docotel.co.id',
				'arisjirat@icloud.com'
			],
			cc: [
				'arisjirat88@yahoo.com'
			],
			from: 'Foo <arisjiratkurniawan@gmail.com>',
			smtp: smptInfo
		}));
});


