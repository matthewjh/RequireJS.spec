var gulp = require('gulp');

gulp.task('default', function () {
  // place code for your default task here
});

gulp.task('lint', function () {
  var jshint = require('gulp-jshint');

  return gulp.src('src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('rjs-build', function () {
  var rjs = require('gulp-requirejs');

  rjs({
    baseUrl: 'src/',
    name: '../bower_components/almond/almond',
    mainConfigFile: 'src/requirejs-config.js',
    out: 'requirejs-spec.js',
    include: ['test'],
    wrap: true,
    insertRequire: ['test']
  })
  .pipe(gulp.dest('./'));
});

gulp.task('test', function () {
  var karma = require('karma').server;

  karma.start({
    configFile: __dirname  + '/karma.conf.js'
  });
});
