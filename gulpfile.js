var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var rigger = require('gulp-rigger');

//SCSS
gulp.task('sass', function () {
    return gulp.src('scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('app/css'));
});

//html
gulp.task('html-build', function () {
    gulp.src('*.html') 
        .pipe(gulp.dest('app/')) //include in app/ .html
});
//js
gulp.task('js-build', function () {
    gulp.src('js/*.js') 
        .pipe(gulp.dest('app/js/')) //include in app/ .html
});
//images
gulp.task('img-build', function () {
    gulp.src('img/**/*') 
        .pipe(gulp.dest('app/img')) //
});

//rigger
gulp.task('html-pars', function () {
    gulp.src('./index.html') //Выберем файлы по нужному пути
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest('app/')) //Выплюнем их в папку build
});


// Static Server + watching css/html files
gulp.task('serv', function() {
    browserSync.init({
        server: "./app/"
    });
    gulp.watch('*.html').on('change', browserSync.reload);
    gulp.watch('js/*.js' ).on('change', browserSync.reload);
    gulp.watch('scss/*.scss',['sass']);
    gulp.watch('app/**/*.css' ).on('change', browserSync.reload);

});



