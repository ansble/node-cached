var gulp = require('gulp')
    , mocha = require('gulp-mocha');

gulp.task('test', function () {
    gulp.src(['*_test.js', '**/*_test.js'])
        .pipe(mocha({reporter: 'spec'}));
});