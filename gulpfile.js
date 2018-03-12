const gulp = require('gulp');
const sass = require('gulp-sass');
const header = require('gulp-header');
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");
const babel  = require('gulp-babel');
const minify = require("gulp-babel-minify");
const pkg = require('./package.json');

// Compiles SCSS files from /scss into /css
gulp.task('sass', function() {
    return gulp.src('scss/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'));
});

// Minify compiled CSS
gulp.task('minify-css', ['sass'], function() {
    return gulp.src('css/main.css')
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('css'));
});

// Minify custom JS
gulp.task('minify-js', function() {
    return gulp.src(['js/main.js', 'js/app.js'])
        .pipe(babel())
        .pipe(minify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('js'));
});

// Copy vendor files from /node_modules into /vendor
// NOTE: requires `npm install` before running!
gulp.task('copy', function() {
    gulp.src([
        'node_modules/bootstrap/dist/**/*',
        '!**/npm.js',
        '!**/bootstrap-theme.*',
        '!**/*.map'
    ])
        .pipe(gulp.dest('vendor/bootstrap'));

    gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('vendor/jquery'));

    gulp.src(['node_modules/vue/dist/**/*'])
        .pipe(gulp.dest('vendor/vue'));

    gulp.src(['node_modules/vee-validate/dist/**/*'])
        .pipe(gulp.dest('vendor/vee-validate'));

    gulp.src(['node_modules/web3/dist/*.js'])
        .pipe(gulp.dest('vendor/web3'));

    gulp.src(['node_modules/truffle-contract/dist/*.js'])
        .pipe(gulp.dest('vendor/truffle-contract'));

    gulp.src(['node_modules/simple-line-icons/*/*'])
        .pipe(gulp.dest('vendor/simple-line-icons'));


    gulp.src([
        'node_modules/font-awesome/**',
        '!node_modules/font-awesome/**/*.map',
        '!node_modules/font-awesome/.npmignore',
        '!node_modules/font-awesome/*.txt',
        '!node_modules/font-awesome/*.md',
        '!node_modules/font-awesome/*.json'
    ])
        .pipe(gulp.dest('vendor/font-awesome'));
});

// Default task
gulp.task('default', ['sass', 'minify-css', 'minify-js', 'copy']);


// Watch task
gulp.task('watch', ['sass', 'minify-css', 'minify-js'], function() {
    gulp.watch('scss/**/*.scss', ['sass']);
    gulp.watch('css/*.css', ['minify-css']);
    gulp.watch(['js/main.js', 'js/app.js'], ['minify-js']);
});
