/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-05-17 20:37:39
 * @version $Id$
 */

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var bs = require("browser-sync").create();
var reload = bs.reload;

gulp.task('sass',function(){
	gulp.src('./src/sass/**/*.scss')
	.pipe(plumber())
	.pipe(sass({
		sourceComments: true,
        outputStyle: 'expanded',
        errLogToConsole: true
	}))
	.pipe(gulp.dest('./src/css/'));
});

gulp.task('sass:watch',['sass'],function(){
	gulp.watch('./src/sass/**/*.scss',['sass']);
});

gulp.task("server",["sass"],function(){
	bs.init({
		server:"./src/"
	});
	gulp.watch("./src/sass/**/*.scss",["sass"]);
	gulp.watch("./src/*.html").on("change",reload);
	gulp.watch("./src/css/*.css").on("change",reload);	
	gulp.watch("./src/js/**/*.js").on("change",reload);	
});

gulp.task("default",["server"]);