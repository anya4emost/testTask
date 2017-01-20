let gulp = require('gulp');
let less = require('gulp-less');
let lessAutoprefix = require('less-plugin-autoprefix');
let autoprefix = new lessAutoprefix({ browsers: ['last 2 versions'] });
let concat = require('gulp-concat');
let browserSync = require('browser-sync').create();
let sourcemaps = require('gulp-sourcemaps');

browserSync.init(null, {
    proxy: "http://localhost:5000",
    port: 7000,
});

gulp.task('browserSync', function(callback) {
    browserSync.reload();
    callback();
})

gulp.task('html', function() {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('dest/'));
});

gulp.task('img', function() {
    return gulp.src('src/images/**/*.*')
        .pipe(gulp.dest('dest/images'));
});

gulp.task('css', function() {
    return gulp.src('src/styles/**/*.less')
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(concat('site.css'))
        .pipe(gulp.dest('dest/'));
})


gulp.task('default', gulp.series(['html', 'css','img']));

gulp.task('watch', gulp.series(['default', function() {
    gulp.watch('src/**/*.html', gulp.series(['html', 'browserSync']));
    gulp.watch('src/styles/**/*.less', gulp.series(['css', 'browserSync']));
}]))
