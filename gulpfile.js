(function() {
  'use strict';

  var gulp = require('gulp');
  var order = require('gulp-order');
  var concat = require('gulp-concat');
  var plumber = require('gulp-plumber');
  var sourcemaps = require('gulp-sourcemaps');
  var babel = require('gulp-babel');
  var connect = require('gulp-connect');
  var uglify = require('gulp-uglify');
  var cleanCSS = require('gulp-clean-css');

  gulp.task('bundle', bundle);
  gulp.task('vendor', vendor);
  gulp.task('css', css);
  gulp.task('start-web-server', startWebServer);
  gulp.task('watch', watch);
  gulp.task('default', ['bundle', 'vendor', 'css', 'start-web-server', 'watch']);

  ////////////////////

  var vendorJsFiles = [
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/bootstrap/dist/js/bootstrap.min.js',
    'bower_components/angular-loader/angular-loader.min.js',
    'bower_components/angular/angular.min.js',
    'bower_components/angular-ui-router/release/angular-ui-router.min.js',
    'bower_components/angular-flash-alert/dist/angular-flash.min.js',
    'bower_components/spin.js/spin.min.js',
    'bower_components/angular-spinner/angular-spinner.min.js',
    'bower_components/angular-resource/angular-resource.min.js',
  ];

  var cssFiles = [
    'bower_components/font-awesome/css/font-awesome.css',
    'bower_components/bootstrap/dist/css/bootstrap.css',
    'bower_components/textAngular/dist/textAngular.css',
    'app/content/app.css',
  ];

  var jsFiles = [
    'app/**/*.js',
    '!app/bower_components/**/*.js',
    '!app/content/bundle.js',
    '!app/content/vendor.js',
  ];

  function bundle() {
    return gulp.src(jsFiles)
      // order JS files by module
      .pipe(order([
        'app/app.module.js',
        'app/**/*.module.js',
        'app/**/*.js',
      ], { base: './' }))

      // restart gulp on error
      .pipe(plumber())

      // let sourcemaps watch this pipeline
      .pipe(sourcemaps.init())

      // transpile into ES5 for browsers
      .pipe(babel({
        presets: ['es2015'],
        compact: true,
      }))

      // Concatenate all JS files
      .pipe(concat('bundle.js'))

      // Minify the file
      .pipe(uglify())

      // emit the .map file for debugging
      .pipe(sourcemaps.write('.'))

      .pipe(gulp.dest('app/content'));
  }

  function vendor() {
    return gulp.src(vendorJsFiles)
      .pipe(order(vendorJsFiles, { base: './' }))
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(concat('vendor.js'))
      .pipe(uglify())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('app/content'));
  }

  function css() {
    return gulp.src(cssFiles)
      .pipe(order(cssFiles, { base: './' }))
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(cleanCSS())
      .pipe(concat('bundle.css'))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('app/content'));
  }

  function startWebServer() {
    connect.server({
      root: 'app',
      port: 8000,
    });
  }

  function watch() {
    gulp.watch([
      'app/**/*',
      '!app/content/bundle.*',
      '!app/content/vendor.*',
    ], ['bundle', 'css']);

    gulp.watch([
      'bower_components/**/*',
    ], ['vendor', 'css']);

    gulp.watch([
      'gulpfile.js',
    ], ['bundle', 'vendor', 'css']);
  }
})();
