var gulp			= require('gulp');
var uglify			= require('gulp-uglify');
var minify			= require('gulp-minify-css');
var sass			= require('gulp-sass');
var notify			= require('gulp-notify');
var run_sequence	= require('run-sequence');
var del 			= require('del');
var buffer 			= require('vinyl-buffer');
var source 			= require('vinyl-source-stream');
var browserify 		= require('browserify');

gulp.task('sass', function () {
	return gulp.src('assets/scss/style.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('build/css'))
	.pipe(notify({
	  message: 'all scss compiled'
	}));
});

gulp.task( 'javascript', function() {
	del( [ 'build/js' ] );

	return browserify( 'assets/javascript/app.js' )
		.transform( 'babelify', { presets: ['es2015'] } )
		.bundle()
		.pipe( source( 'bundle.js' ) )
		.pipe( gulp.dest( 'build/js' ) )
		.pipe( buffer() )
	;
} );

gulp.task('watch', function () {
	gulp.watch('assets/javascript/*.*', ['javascript']);
	gulp.watch('assets/scss/**/*.scss', ['sass']);
});

gulp.task('minify', ['sass'], function () {
	return gulp.src('build/css/style.css')
	.pipe(minify())
	.pipe(gulp.dest('build/css'))
	.pipe(notify({
	  message: 'all css minified and concatenated'
	}));
});

gulp.task('default', function() {
	run_sequence( 'sass', 'javascript', 'watch' );
});
