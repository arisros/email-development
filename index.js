const gulp = require('gulp');
const inlineCss = require('gulp-inline-css');

gulp.task('default', function () {
  console.log('code', process.env)
  return gulp.src('shelter/**/*.html')
    .pipe(inlineCss())
    .pipe(gulp.dest('ready-to-fly/'));
});
