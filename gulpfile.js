const { src, dest, series, parallel, watch } = require('gulp');
const sass = require('gulp-dart-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const clean = require('gulp-clean');
const sourcemaps = require('gulp-sourcemaps');
const mode = require('gulp-mode')();
const browserSync = require('browser-sync').create();
const babel = require("gulp-babel");
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const pugPipe = require('gulp-pug');

async function pug() {
  src('./src/index.pug')
      .pipe(pugPipe({}))
      .pipe(dest('./public'))
}

async function css() {
  src('./src/index.scss')
    .pipe(mode.development(sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({cascade: false}))
    .pipe(cleanCSS())
    .pipe(mode.development(sourcemaps.write()))
    .pipe(dest('./public'))
}

async function js() {
  src([
    './src/model/**/*.js',
    './src/view/**/*.js',
    './src/Controller.js',
    './src/index.js',
  ])
    .pipe(concat('script.js'))
    .pipe(babel({
      presets: ["@babel/preset-env"]
     }))
    .pipe(uglify())
    .pipe(dest('./public'))
}

async function server() {
  browserSync.init({
    server: {
      baseDir: './public'
    }
  });

  watch('./src/index.pug', series(pug, reloadBrowser));
  watch('./src/index.scss', series(css, reloadBrowser));
  watch('./src/**/*.js', series(js, reloadBrowser));
}

async function reloadBrowser() {
  browserSync.reload();
}

async function clear() {
  src('./public', { read: false, allowEmpty: true }).pipe(clean());
}

async function buildTask() {
  const build = series(clear, parallel(pug, css, js))
  build();
}

module.exports = {
  build: buildTask,
  start: series(buildTask, server),
}
