var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var useref = require('gulp-useref');


gulp.task('sass', function () {
    return gulp.src('scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('app/css'));
});

//build js
gulp.task('js-build', function(){
    gulp.src('js/*.js')
    .pipe(gulp.dest('app/js/'))
});
//build html with Dependencies
gulp.task('html-build', function () {
    return gulp.src('./*.html')
        .pipe(useref())
        .pipe(gulp.dest('app/'));
});
//build img
gulp.task('img-build', function () {
    gulp.src('img/**/')
    .pipe(gulp.dest('app/img/'));
});

//all build in app
gulp.task('build', 
[
    'html-build',
    'js-build',
    'img-build'
]);

// Static Server + watching css/html files
gulp.task('serv', function() {

    browserSync.init({
        server: "./"
    });
    gulp.watch('*.html').on('change', browserSync.reload);
    gulp.watch('js/*.js' ).on('change', browserSync.reload);
    gulp.watch('scss/*.scss',['sass']);
    gulp.watch('app/**/*.css' ).on('change', browserSync.reload);

});



