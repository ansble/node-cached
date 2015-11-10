'use strict';

const gulp = require('gulp')
    , mocha = require('gulp-mocha')
    , eslint = require('gulp-eslint');

gulp.task('test', [ 'lint' ], () => {
    gulp.src([ '*_test.js', '**/*_test.js', '!node_modules/**/*' ])
        .pipe(mocha({ reporter: 'spec' }));
});

gulp.task('lint', () => {
    return gulp.src([ '**/*.js', '!node_modules/', 'bin/monument' ])
        .pipe(eslint('./.eslintrc'))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});
