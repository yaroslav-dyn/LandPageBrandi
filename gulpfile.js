var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

gulp.task('sass', function () {
    return gulp.src('scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('app/css'));
});


// Static Server + watching css/html files
gulp.task('serv', function() {

    browserSync.init({
        server: "./"
    });
    gulp.watch('*.html').on('change', browserSync.reload);
    gulp.watch('*.js' ).on('change', browserSync.reload);
    gulp.watch('app/**/*.css' ).on('change', browserSync.reload);
    gulp.watch('scss/*.scss',['sass']).on('change', browserSync.reload);
});



