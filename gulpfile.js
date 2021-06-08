const {src, dest, parallel, series, watch,} = require('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const php = require('gulp-connect-php');
const del = require('del');

function connectPHP(){
    php.server({
        base: 'app',
        keepalive: true,
        hostname: '0.0.0.0',
        port: 8010,
        bin: "C:/php/php.exe",
		ini: "C:/php/php.ini-production",
        // open: false,
    },function(){
        browserSync.init({
            proxy: '127.0.0.1:8010',
            browser: 'firefox',
            port: 8080,
            notify: false,
            online: true,
        });
    });
}

function scripts(){
    return src([
        'node_modules/jquery/dist/jquery.min.js',
        'app/js/script.js',
    ])
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

function styles(){
    return src('app/sass/main.sass')
    .pipe(sass())
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({overrideBrowserslist: ['last 10 versions'], grid: true}))
    .pipe(cleancss(({level: { 1: { specialComments: 0 }} /*,format: 'beautify'*/})))
    .pipe(dest('app/css/'))
    .pipe(browserSync.stream())
}

function images(){
    return src('app/images/src/**/*')
    .pipe(newer('app/images/dest/'))
    .pipe(imagemin())
    .pipe(dest('app/images/dest/'))
}

function cleanimg(){
    return del('app/images/dest/**/*')
}

function cleandist(){
    return del('dist/**/*')
}

function buildcopy(){
    return src([
        'app/css/**/*.min.css',
        'app/js/**/*.min.js',
        'app/images/dest/**/*',
        'app/**/*.php',
    ], {base: 'app'})
    .pipe(dest('dist'));
}

function startwatch(){
    watch('app/sass/*.sass', styles);
    watch(['app/**/*.js', '!app/**/*.min.js'], scripts);
    watch('app/**/*.php').on('change', browserSync.reload);
    watch('app/images/src/**/*', images);
}

exports.scripts    = scripts; 
exports.styles     = styles; 
exports.images     = images;
exports.connectPHP = connectPHP;
exports.cleanimg   = cleanimg;
exports.cleandist  = cleandist;

exports.build = series(styles, scripts, cleanimg, images, cleandist, buildcopy);
exports.default = parallel(styles, scripts, connectPHP, startwatch);