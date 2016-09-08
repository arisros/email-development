var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var replace = require('gulp-replace');

var browserSync = require('browser-sync');
var mergeStream = require('merge-stream');
var concat = require('gulp-concat');

var emailBuilder = require('gulp-email-builder');
var options = { encodeSpecialChars: true };

// Current Date
var current_date = new Date().toString();
var email_subject = 'Notification Eproc';
var remote_imgs_basepath = 'http://pasmandor.com/img/cs/';
var email_builder_options = {
	encodeSpecialChars: true,
	emailTest : {
		// Email Test
		email : 'arisjiratkurniawan@gmail.com,' + 'arisjirat88@yahoo.com,' + 'arisjirat@icloud.com,' + 'arisjirat@hotmail.com',
		
		// Email Subject
		subject: email_subject + ' [' + current_date + ']',

		// Opt
	},

};

var reload = browserSync.reload;

gulp.task('pug', function () {
	var pugCompile = gulp.src('src/**/*.pug')
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('dist'));

	return pugCompile;
});

gulp.task('pug-watch', ['pug'], function () {
	browserSync.reload();
            console.log('== Restarted! ==');
});

gulp.task('html-watch', function () {
	browserSync.reload();
            console.log('== Restarted! ==');
});

gulp.task('development', ['pug'], function () {
	browserSync({
		injectChanges: true,
		files: 'dist/notifications/template.html',
		server: {
			baseDir: './dist/notifications/',
			index: 'template.html'
		},
	});
	gulp.watch('src/**/*.pug', ['pug-watch']);
	gulp.watch('dist/**/*.html', ['html-watch']);
});

gulp.task('emailBuilder', function () {
	return gulp.src(['./src/*.html'])
		.pipe(emailBuilder(options).build())
		.pipe(gulp.dest('dist/'));
});
