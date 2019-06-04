var gulp = require('gulp');
var bs = require('browser-sync').create();
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
let cleanCSS = require('gulp-clean-css');

gulp.task('less', function(done) {
    gulp.src('./less/main.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./css/'));
    done();
});

//gulp.task('browser-sync', function(done) {
//    bs.init({
//        server: {
//            baseDir: "./"
//        }
//    });
//    done();
//});

//gulp.task('watch', gulp.series('browser-sync', function(done) {
//    gulp.watch("./less/*.less", gulp.series('less'));
//    gulp.watch("*.html").on('change', bs.reload);
//    gulp.watch("./css/*.css").on('change', bs.reload);
//	done();
//}));

gulp.task('watch',  function(done) {
    gulp.watch("./less/**/*.less", gulp.series('less'));
    done();
});