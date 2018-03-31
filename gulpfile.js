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
    uglify = require('gulp-uglify')

var browserSync = require('browser-sync').create(),
    reload = browserSync.reload;

gulp.task('html', function(){
  return gulp.src('./app/pug/pages/*.pug')
    .pipe(plumber())
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest('./app'));
});