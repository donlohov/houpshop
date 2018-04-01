'use strict';

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    csso = require('gulp-csso'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    stylus = require('gulp-stylus'),
    pngquant = require('imagemin-pngquant'),
    pug = require('gulp-pug'),
    uglify = require('gulp-uglify');

var browserSync = require('browser-sync').create(),
    reload = browserSync.reload;

gulp.task('serve', function(){
  browserSync.init({
    server: './app'
    // browser: 'firefox'
  });
  gulp.watch('./app/pug/**/*.pug', gulp.series('html'));
  gulp.watch(['./app/blocks/**/*.styl', './app/styl/**/*.styl'], gulp.series('css'));
  gulp.watch('./app/blocks/**/*.js', gulp.series('js'));
  gulp.watch('*.html').on('change', reload);
});

gulp.task('html', function(){
  return gulp.src('./app/pug/pages/*.pug')
    .pipe(plumber())
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest('./app'))
    .pipe(browserSync.stream());
});

gulp.task('css', function(){
  return gulp.src('./app/styl/styles.styl')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(autoprefixer())
    .pipe(rename({suffix: ".min"}))
    .pipe(csso())
    .pipe(gulp.dest('./app/assets/css'))
    .pipe(sourcemaps.write())
    .pipe(browserSync.stream());
});

gulp.task('js', function(){
  return gulp.src('./app/blocks/**/*.js')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./app/assets/js'))
    .pipe(sourcemaps.write())
    .pipe(browserSync.stream());
});

gulp.task('cssVendor', function(){
  return gulp.src([
    './app/vendor/normalize.css/normalize.css',
    './app/vendor/bootstrap/dist/css/bootstrap.min.css',
    './app/vendor/font-awesome/web-fonts-with-css/css/fontawesome.min.css'
  ])
  .pipe(concat('vendor.min.css'))
  .pipe(csso())
  .pipe(gulp.dest('./app/assets/css'));
});

gulp.task('jsVendor', function(){
  return gulp.src([
    './app/vendor/jquery/dist/jquery.min.js',
    './app/vendor/bootstrap/dist/js/bootstrap.min.js'
  ])
  .pipe(concat('vendor.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./app/assets/js'));
});

gulp.task('fontVendor', function(){
  return gulp.src([
    './app/vendor/font-awesome/web-fonts-with-css/webfonts/**/*.*'
  ])
  .pipe(gulp.dest('./app/assets/fonts'));
});

gulp.task('build', gulp.parallel('html', 'css', 'js', 'cssVendor', 'jsVendor', 'fontVendor'));

gulp.task('default', gulp.series('build', 'serve'));