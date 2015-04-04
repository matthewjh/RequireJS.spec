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
    include: ['globals-exporter-self-executing'],
    // Wrap build output with an IEFE (to isolate scope) and stick a sync require on the end to kickstart.
    wrap: {
      start: '(function () {',
      end: 'require(\'globals-exporter-self-executing\');' + '})();'
    },
  })
  .pipe(gulp.dest('./'));
});

gulp.task('test', function () {
  var karma = require('karma').server;

  karma.start({
    configFile: __dirname  + '/karma.conf.js'
  });
});
