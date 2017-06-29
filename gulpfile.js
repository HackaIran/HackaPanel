const gulp = require('gulp');
const webpack = require('webpack-stream');
const apidoc = require('gulp-apidoc');
const istanbul = require('gulp-istanbul');
const jshint = require('gulp-jshint');
const stylish = require('jshint-stylish');
const mocha = require('gulp-mocha');
const uglify = require('gulp-uglify');
const minifyCss = require('gulp-clean-css');
const spawn = require('child_process').spawn;

const serverJsFiles = ['./config/**/*.js', './routes/**/*.js', './models/**/*.js', './db/**/*.js', './controllers/**/*.js', './services/**/*.js'];
const clientJsFiles = ['public/javascripts/**/*.js'];
const cssFiles = ['public/stylesheets/**/*.css'];
const apidocConf = {
  src: 'routes/',
  dest: 'doc/',
  debug: true,
  config: './'
};

var node;

gulp.task('uglify-js', function () {
  return gulp.src(clientJsFiles)
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(uglify())
    .pipe(gulp.dest('./'));
});

gulp.task('minify-css', function () {
  return gulp.src(cssFiles)
    .pipe(minifyCss())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('lint', function() {
  return gulp.src(serverJsFiles)
    .pipe(jshint({}))
    .pipe(jshint.reporter(stylish));
});

gulp.task('coverage', function () {
  return gulp.src(serverJsFiles)
  // Covering files
    .pipe(istanbul())
    // Force `require` to return covered files
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['lint', 'coverage'], function() {
  return gulp.src('./test/**/*.js', {read: false})
    .pipe(mocha({reporter: 'nyan'}))
    // Creating the reports after tests ran
    .pipe(istanbul.writeReports())
    // Enforce a coverage of at least 90%
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 80 } }));
});

gulp.task('apidoc', function(done){
  apidoc(apidocConf, done);
});

gulp.task('server', function() {
  if (node) {
    console.log('[Server] Killed');
    node.kill();
  }
  console.log('[Server] Loaded');
  node = spawn('node', ['bin/www'], {stdio: 'inherit'});
  node.on('close', function (code) {
    if (code === 8) {
      console.log('[Server] Error detected, waiting for changes...');
    }
  });
});

gulp.task('watch', ['server'], function() {
  gulp.watch(clientJsFiles, function() {
    return gulp.src(clientJsFiles)
      .pipe(webpack( require('./webpack.config.js') ))
      .pipe(gulp.dest('./'));
  });

  gulp.watch(cssFiles, function() {
    return gulp.src(cssFiles)
      .pipe(minifyCss())
      .pipe(gulp.dest('./dist/css'));
  });

  gulp.watch(serverJsFiles, ['server']);
});

gulp.task('build', ['test', 'uglify-js', 'minify-css', 'apidoc']);

gulp.task('default', ['uglify-js', 'minify-css', 'apidoc', 'server']);
