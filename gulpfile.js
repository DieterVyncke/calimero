var gulp			= require('gulp');
var uglify			= require('gulp-uglify');
var minify			= require('gulp-clean-css');
var sass			= require('gulp-sass');
var notify			= require('gulp-notify');
var run_sequence	= require('run-sequence');
var del 			= require('del');
var buffer 			= require('vinyl-buffer');
var source 			= require('vinyl-source-stream');
var browserify 		= require('browserify');
var favicons 		= require('gulp-favicons');
var postcss			= require('gulp-postcss');
var autoprefixer	= require('autoprefixer');

gulp.task('sass', function () {
	return gulp.src('assets/scss/style.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe( postcss( [ autoprefixer( { browsers: [ 'last 2 versions', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1' ], grid: true, } ) ] ) )
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

gulp.task( 'favicons', cb => {

	del( [ 'assets/img/build/favicons' ] );

	return gulp.src( 'assets/img/favicons/source.png' )
		.pipe( favicons( {
			icons: {
				android: true,
				appleIcon: true,
				favicons: true,
				opengraph: true,
				appleStartup: false,
				coast: false,
				firefox: false,
				windows: false,
				yandex: false
			},
			settings: {
				appName: null,
				appDescription: null,
				developer: null,
				developerURL: null,
				version: 1.0,
				background: null,
				index: null,
				url: null,
				silhouette: false,
				logging: true
			}
		} ) )
		.pipe( gulp.dest( 'assets/img/build/favicons' ) );
} );

gulp.task('watch', function () {
	gulp.watch( [ 'assets/javascript/*.js', 'assets/javascript/**/*.js', '!assets/javascript/bundle.js' ], ['javascript']);
	gulp.watch('assets/scss/**/*.scss', ['sass']);
});

gulp.task('default', function() {
	run_sequence( 'sass', 'javascript', 'watch' );
});

gulp.task('production', function() {
	run_sequence( 'minify-sass', 'minify-javascript', 'favicons' );
});
