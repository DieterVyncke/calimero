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
	.pipe(gulp.dest('assets/css'))
	.pipe(notify({
	  message: 'all scss compiled'
	}));
});

gulp.task( 'javascript', function() {
	del( [ 'assets/javascript/bundle.js' ] );

	return browserify( 'assets/javascript/app.js' )
		.transform( 'babelify', { presets: ['es2015'] } )
		.bundle()
		.pipe( source( 'bundle.js' ) )
		.pipe( gulp.dest( 'assets/javascript' ) )
		.pipe( buffer() )
		.pipe(notify({
		  message: 'all javascript compiled'
		}));
	;
} );

gulp.task('minify-sass', ['sass'], function () {
	return gulp.src('assets/css/style.css')
	.pipe(minify())
	.pipe(gulp.dest('assets/css'))
	.pipe(notify({
	  message: 'all css minified and concatenated'
	}));
});

gulp.task('minify-javascript', function () {
	return gulp.src('assets/javascript/bundle.js')
	.pipe(uglify())
	.pipe(gulp.dest('assets/javascript'))
	.pipe(notify({
	  message: 'all javascript minified'
	}));
});

gulp.task('watch', function () {
	gulp.watch('assets/javascript/*.*', ['javascript']);
	gulp.watch('assets/scss/**/*.scss', ['sass']);
});

gulp.task('default', function() {
	run_sequence( 'sass', 'javascript', 'watch' );
});

gulp.task('production', function() {
	run_sequence( 'minify-sass', 'minify-javascript' );
});
