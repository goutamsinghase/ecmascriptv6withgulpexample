'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import browserify from 'browserify';
import notify from 'gulp-notify';
import browserSync from 'browser-sync';
import cssmin from 'gulp-minify-css';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import del from 'del';
import babelify from 'babelify';
import vinylBuffer from 'vinyl-buffer';
import vinylSourceStream from 'vinyl-source-stream';


const dirs = {
    src: 'src',
    dest: 'build'
};

const sassPaths = {
    src: `${dirs.src}/sass/`,
    dest: `${dirs.dest}/styles/css`
};

const indexPaths = {
    src: `${dirs.src}/index.html`,
    dest: `${dirs.dest}/`
};

const bowerPath = './bower_components';

const jsConfig = {
    sourceFiles: './src/scripts/**/*.js',
    launcher: './src/scripts/app.js',
    dest: './build/scripts/'
};

const libPaths = {
    libCss: [
        './bower_components/fontawesome/css/font-awesome.css',
        './bower_components/bootstrap/dist/css/bootstrap.css'
    ],
    libJs: [
        './bower_components/jquery/dist/jquery.js',
        './bower_components/bootstrap/dist/js/bootstrap.js'
    ]
};

gulp.task('clean', () => {
    del.sync(['build/**']);
});

gulp.task('fontawesomeFonts', () => {
    return gulp.src([bowerPath + '/font-awesome/fonts/*.*'])
        .pipe(gulp.dest(dirs.dest + '/styles/fonts'));
});

gulp.task('libCss', () => {
    return gulp.src(libPaths.libCss)
        .pipe(cssmin())
        .pipe(concat('lib.min.css'))
        .pipe(gulp.dest(dirs.dest + '/scripts/lib'));
});

gulp.task('libJs', () => {
    return gulp.src(libPaths.libJs)
        .pipe(concat('lib.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dirs.dest + '/scripts/lib'));
});

gulp.task('styles', () => {
    return gulp.src(`${sassPaths.src}app.scss`)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(sassPaths.dest))
        .pipe(notify({
            title: 'Gulp',
            subtitle: 'success',
            message: 'Sass task finished',
            sound: "Pop"
        }));;
});

gulp.task('copyIndex', () => {
    return gulp.src(indexPaths.src)
        .pipe(gulp.dest(indexPaths.dest));
});

gulp.task('js', () => {

    var sources = browserify({
            entries: 'src/scripts/app.js',
            debug: true
        })
        .transform(babelify.configure());

    return sources.bundle()
        .pipe(vinylSourceStream('app.min.js'))
        .pipe(vinylBuffer())
        // Do stuff to the output file
        .pipe(gulp.dest(jsConfig.dest + '/js'))
        .pipe(notify({
            title: 'Gulp',
            subtitle: 'success',
            message: 'Js task finished',
            sound: "Pop"
        }));
});

gulp.task('server', () => {
    browserSync({
        server: {
            baseDir: './build'
        },
        ui: {
            port: 8080,
            weinre: {
                port: 9090
            }
        }

    });
});


gulp.task('watch', () => {
    gulp.watch(['./src/sass/**/*.scss'], ['styles']);
    gulp.watch(indexPaths.src, ['copyIndex']);
    gulp.watch(['./src/scripts/**/*.js'], ['js'])
});

gulp.task('serve', ['build', 'server'], () => {
    return gulp.watch([
        indexPaths.src,
        './src/sass/**/*.scss',
        './src/scripts/**/*.js'
    ], [
        'build', browserSync.reload
    ]);
});

gulp.task('build', ['fontawesomeFonts', 'libCss', 'libJs', 'styles', 'copyIndex', 'js']);
gulp.task('default', ['build', 'watch']);
