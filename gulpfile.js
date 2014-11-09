'use strict';

var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    jshint = require('gulp-jshint'),
    rimraf = require('gulp-rimraf'),
    source = require('vinyl-source-stream'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    nodemon = require('nodemon'),
    karma = require('gulp-karma'),
    jasmine = require('gulp-jasmine'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate'),
    mainBowerFiles = require('main-bower-files'),
    gulpFilter = require('gulp-filter'),
// Build file only express setup
    morgan = require('morgan'),
    express = require('express'),
    serverport = 3000;

/************************************************
 Web Server
 ***********************************************/

var server = express();
// log all requests to the console
server.use(morgan('dev'));
server.use(express.static('./'));
// Serve index.html for all routes to leave routing up to Angular
server.all('/*', function (req, res) {
    res.sendFile('index.html', { root: './' });
});


gulp.task('start-dev-server', function () {
    // Start webserver
    server.listen(serverport);
});

/************************************************
 Build Params
 ***********************************************/



/************************************************
 Gulp Tasks
 ***********************************************/

/**
 * Clean directories
 */
gulp.task('clean', function () {
    return gulp.src(['./www-build/*'], { read: false })
        .pipe(rimraf());
});

/**
 * Lint JS files
 */
gulp.task('lint', function () {
    return gulp.src(['www-src/**/*.js'])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
});

/**
 * Generates and build app JS files
 */
gulp.task('build-app-js', ['lint'], function () {
    return gulp.src(['./www-src/**/_module.js', './www-src/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify({
            mangle: false
        }))
        .pipe(sourcemaps.write({
            sourceRoot: 'app'
        }))
        .pipe(gulp.dest('./www-build/js/'));
});


/**
 * Generates and build app JS files
 */
gulp.task('build-vendor-js', function () {

    // Exclude html files from concat, these need to go in /src/views/templates as normal
    var excludeHtml = gulpFilter(['*', '!*.html', '!*.css']);

    // Concat all bower files
    return gulp.src(mainBowerFiles({
        paths: {
            bowerDirectory: './bower_components',
            bowerJson: 'bower.json'
        }
    }))
        .pipe(excludeHtml)
        .pipe(sourcemaps.init())
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write({
            sourceRoot: 'vendor'
        }))
        .pipe(gulp.dest('./www-build/js/'));
});

/**
 * SASS compilation
 */
gulp.task('styles', function () {

    gulp.src('www-src/css/*.css')
        .pipe(gulp.dest('www-build/css/'));

    return gulp.src('www-src/css/*.scss')
        // The onError handler prevents Gulp from crashing when you make a mistake in your SASS
        .pipe(sass({
            errLogToConsole: true,
            sourceMap: 'sass',
            style: 'nested',
            sourceComments: 'map', // Add CSS Source Maps
            onError: function (e) {
                console.error(e);
            }
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('www-build/css/'));
});

/**
 * Copy views to build for node to serve
 */
gulp.task('views', function () {
    return gulp.src('www-src/views/**/*.html')
        .pipe(gulp.dest('www-build/views/'));
});

/**
 * Copy various resource files to build for node to serve
 */
gulp.task('resources', function () {
    // Images
    gulp.src('www-src/img/*')
        .pipe(gulp.dest('www-build/img/'));

    // Fonts
    gulp.src('www-src/fonts/**/*')
        .pipe(gulp.dest('www-build/fonts/'));
});

gulp.task('watch', function () {

    // Client side source scripts
    gulp.watch(['www-src/js/**/*.js'], ['lint', 'build-app-js']);

    // Vendor source scripts
    gulp.watch(['bower.json'], ['build-vendor-js']);

    // Styles
    gulp.watch(['www-src/css/*.scss', 'www-src/css/*.css'], ['styles']);

    // Resources
    gulp.watch(['www-src/fonts/*', 'www-src/img/*'], ['resources']);

    // Views
    gulp.watch(['www-src/views/**/*.html'], ['views']);
});

/**
 * Build only task for generating dist files
 */
gulp.task('build', ['clean'], function (cb) {
    runSequence(['lint', 'styles', 'views'], ['build-app-js', 'build-vendor-js'], 'resources', cb);
});

/**
 * Development gulp task
 */
gulp.task('dev', ['build', 'start-dev-server'], function () {

    // Then, run the watch task to keep tabs on changes
    gulp.start('watch');

});