var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var useref = require('gulp-useref');
var del  = require('del');


gulp.task('sass', function () {
    return gulp.src('src/scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/css/'));
});
//build css
gulp.task('css-build', function(){
    gulp.src('src/css/*.js')
        .pipe(gulp.dest('public/css/'))
});
//build js
gulp.task('js-build', function(){
    gulp.src('src/js/*.js')
    .pipe(gulp.dest('public/js/'))
});
//build html with Dependencies
gulp.task('html-build', function () {
    return gulp.src('src/**/*.html')
        .pipe(useref())
        .pipe(gulp.dest('public/'));
});
//build img
gulp.task('img-build', function () {
    gulp.src('src/img/**/')
    .pipe(gulp.dest('public/img/'));
});

//all build
gulp.task('build', 
[
    'html-build',
    'js-build',
    'img-build',
    'css-build'
]);

// Clean public
gulp.task('build-clean', function(){
    return del(['public/*']);
});


// Static Server + watching css/html files
gulp.task('serv', function() {

    browserSync.init({
        server: "./src/"
    });
    gulp.watch('src/**/*.html').on('change', browserSync.reload);
    gulp.watch('src/js/*.js' ).on('change', browserSync.reload);
    gulp.watch('src/scss/*.scss',['sass']);
    gulp.watch('src/css/*.css' ).on('change', browserSync.reload);

});



