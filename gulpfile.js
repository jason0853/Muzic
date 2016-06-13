// Require gulp modules
var gulp        = require('gulp'),
    webserver   = require('gulp-webserver'),
    htmlmin     = require('gulp-htmlmin'),
    sass        = require('gulp-sass'),
    uglifycss   = require('gulp-uglifycss'),
    uglify      = require('gulp-uglify'),
    sourcemaps  = require('gulp-sourcemaps'),
    rename      = require('gulp-rename');

// Require modules from outside
var del         = require('del'),
    browserify  = require("browserify"),
    source      = require("vinyl-source-stream"),
    buffer      = require("vinyl-buffer");


// Set file deletion
gulp.task('clean', function() {
    del([
        'dev/views/**/*', 'dev/assets/css/*', 'dev/assets/js/*',
        'dist/views/**/*', 'dist/assets/css/*.css', 'dist/assets/js/*.js',
    ]);
});

// Set web server
gulp.task('server:dev', function() {
    gulp.src('dev/')
        .pipe(webserver({
            host: '0.0.0.0',
            livereload: true,
            open: true,
            port: 8000
        }));
});

gulp.task('server:dist', function() {
    gulp.src('dist/')
        .pipe(webserver({
            host: '0.0.0.0',
            open: true,
            port: 8000
        }));
});

// Set html copy
gulp.task('view-copy', function() {
    gulp.src('src/views/**/*.html')
        .pipe(gulp.dest('dev/views'));
});

// Set minified job (.html)
gulp.task('minifyhtml', function() {
    gulp.src('dev/views/**/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist/views'));
});

// Set style
gulp.task('styles', function() {
    gulp.src('src/styles/style.scss')
        .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dev/assets/css'));
});

// Set minified job (.css)
gulp.task('minifycss', function() {
    gulp.src('dev/assets/css/style.css')
        .pipe(uglifycss())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/assets/css'));
});

// Set browserify for angular.js
gulp.task('scripts', function() {
    return browserify({
            entries: 'src/scripts/app.js',
            debug: true
        })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dev/assets/js'));
});

// Set minified job (.js)
gulp.task('minifyjs', function() {
    gulp.src('dev/assets/js/bundle.js')
        .pipe(uglify({ mangle: false }))
        .pipe(rename('script.min.js'))
        .pipe(gulp.dest('dist/assets/js'));
});

// Set file watch
gulp.task('watch', function() {
    gulp.watch('src/views/**/*.html', ['view-copy']);
    gulp.watch('src/styles/**/*.scss', ['styles']);
    gulp.watch('src/scripts/**/*.js', ['scripts']);
});

// Execute gulp tasks that are registered for development version
gulp.task('default', ['view-copy', 'styles', 'scripts', 'server:dev', 'watch']);

// Execute 'gulp build' for production version
gulp.task('build', ['minifyhtml', 'minifycss', 'minifyjs', 'server:dist']);
