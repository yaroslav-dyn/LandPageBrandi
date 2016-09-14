var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var useref = require('gulp-useref');
var del  = require('del');
var rigger = require('gulp-rigger');


gulp.task('sass', function () {
    return gulp.src('src/scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/css/'));
});
//build css
gulp.task('css-build', function(){
    gulp.src('css/*.css')
        .pipe(gulp.dest('public/css/'))
});
//build js
gulp.task('js-build', function(){
    gulp.src('js/*.js')
    .pipe(gulp.dest('public/js/'))
});
//build html with Dependencies
gulp.task('html-build', function () {
    return gulp.src('*.html')
        .pipe(useref())
        .pipe(gulp.dest('public/'));
});

//build img
gulp.task('src/img-build', function () {
    gulp.src('img/**/')
    .pipe(gulp.dest('public/img/'));
});

//rigger html
gulp.task('rigger-html', function () {
    gulp.src('src/html-parts/index-parts/*.html')
        .pipe(rigger())
        .pipe(gulp.dest('src/'));
});
//rigger app html
gulp.task('rigger-app-html', function () {
    gulp.src('src/html-parts/survey-parts/*.html')
        .pipe(rigger())
        .pipe(gulp.dest('src/survey/'));
});

//rigger js
gulp.task('rigger-js', function () {
    gulp.src('src/js/parts/main.js')
        .pipe(rigger())
        .pipe(gulp.dest('src/js/'));
});
//rigger app js
gulp.task('rigger-app-js', function () {
    gulp.src('src/js/survey/app.js')
        .pipe(rigger())
        .pipe(gulp.dest('src/js/'));
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
    gulp.watch('src/js/parts/*.js',['rigger-js'] );
    gulp.watch('src/js/survey/*.js',['rigger-app-js'] );
    gulp.watch('src/js/*.js').on('change', browserSync.reload);
    gulp.watch('src/scss/*.scss',['sass']);
    gulp.watch('src/html-parts/index-parts/**/*.html',['rigger-html']);
    gulp.watch('src/html-parts/survey-parts/**/*.html',['rigger-app-html']);
    gulp.watch('src/html-parts/**/*.html').on('change', browserSync.reload);
    gulp.watch('src/css/*.css' ).on('change', browserSync.reload);
});



