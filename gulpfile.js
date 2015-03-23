var gulp = require('gulp'),
    jshint = require('gulp-jshint');

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('lint', function() {
  return gulp.src('src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});