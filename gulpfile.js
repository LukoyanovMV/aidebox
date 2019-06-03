/******************************************************************************
 * Requires
 */
var gulp        = require('gulp');
var less        = require('gulp-less');
var gutil       = require('gulp-util');
var path        = require('path');
var webpack     = require('webpack');
var webPackConfig = require('./webpack.config');


/******************************************************************************
 * Build Vars
 */
var mainLess        = './src/aidebox.less',
    sourceLessFiles = './src/**/*.*';


/******************************************************************************
 * Build Styles
 */

gulp.task('lessDev', function () {
    return gulp.src(mainLess)
        .pipe(less({
            //paths: [ path.join(__dirname, 'less', 'includes') ]
            compress: false
        }).on('error', gutil.log))
        .pipe(gulp.dest('./app'));
});

gulp.task('lessProd', function () {
    return gulp.src(mainLess)
        .pipe(less({
            //paths: [ path.join(__dirname, 'less', 'includes') ]
            compress: true
        }).on('error', gutil.log))
        .pipe(gulp.dest('./app/css'));
});


/******************************************************************************
 * Build App
 */

var buildJs = function(cb){
    "use strict";
    webpack(webPackConfig, function(err, stats){
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({chunks: false}));
        cb();
    });
};

gulp.task('jsDev', function(cb){
    buildJs(cb);
});



/******************************************************************************
 * Tasks
 */
gulp.task('default', ['jsDev', 'lessDev']);


/******************************************************************************
 * Watch Styles
 */
gulp.task('watch', function () {
    gulp.watch(sourceLessFiles, ['default'])
});
