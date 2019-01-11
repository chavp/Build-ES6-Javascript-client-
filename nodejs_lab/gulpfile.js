'use strict';
var gulp = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
var babel = require('gulp-babel');
const sync = require('gulp-sync')(gulp);

// Clean lib folder.
gulp.task('clean', require('del').bind(null, ['dist', 'lib']));

// Run babel on source code.
gulp.task('babel', () => gulp.src(['./src/**/*.js', '!./src/**/*.spec.js'])
  .pipe(babel())
  .pipe(gulp.dest('lib')));

// Copy over the dist folder into the lib folder.
gulp.task('dist', () => gulp.src(['dist/**/*.*']).pipe(gulp.dest('lib/dist')));

// Script builds.
const webpackDev = require('./config/webpack.dev');
const webpackProd = require('./config/webpack.prod');
const buildDev = (input, output) => webpackStream(webpackDev(input, output), webpack).pipe(gulp.dest('dist'));
const buildProd = (input, output) => webpackStream(webpackProd(input, output), webpack).pipe(gulp.dest('dist'));
const build = (input, output) => {
  const prodFile = output.replace(/\.js$/, '.min.js');
  gulp.task(output, () => buildDev(input, output));
  gulp.task(prodFile, () => buildProd(input, prodFile));
  return [output, prodFile];
};

gulp.task('scripts-full', build('index.js', 'chavpjs.full.js'));

// Create a new build.
gulp.task('build', sync.sync([['clean'], 'babel', [
  'scripts-full'
], 'dist']));