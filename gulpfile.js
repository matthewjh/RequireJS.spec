var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    rjs = require('gulp-requirejs');

gulp.task('default', function () {
  // place code for your default task here
});

gulp.task('lint', function () {
  return gulp.src('src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('rjs-build', function () {
  rjs({
    baseUrl: 'src/',
    mainConfigFile: 'src/requirejs-config.js',
    out: 'built.js',
    include: ['test'],
    insertRequire: ['test']
  })
  .pipe(gulp.dest('./'));
});
