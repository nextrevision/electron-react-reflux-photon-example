var gulp   = require('gulp')
  , babel  = require('gulp-babel')
  , useref = require('gulp-useref')
  , ec     = require('electron-connect')
  , del    = require('del');

var env = process.env;
var electron = null;

var paths = {
  js: [
    './app/index.js',
    './app/js/*.js',
    './app/js/**/*.js'
  ],
};

var copyPaths = [
  "app/vendor/**",
  "app/css/**",
  "app/*.html",
  "app/*.css"
];

gulp.task('default', [
  'copy',
  'js',
]);

gulp.task('clean', function() {
  del(['build', 'dist']);
});

gulp.task('copy', function() {
  gulp.src('package.json').pipe(gulp.dest('build'));
  return gulp.src(copyPaths, { base: './app' })
    .pipe(gulp.dest('build'));
});

gulp.task('serve', ['default'], function () {
  env.ENVIRONMENT = 'development';

  electron = ec.server.create({
    "path": "build",
    "spawnOpt": {
      env: env
    }
  });

  // Start browser process
  electron.start();

  // Restart browser process
  gulp.watch('./app/index.js', ['restart']);

  // Reload on JS change
  gulp.watch(paths.js, ['js', 'reload']);

  // Reload renderer process
  gulp.watch([
    './app/*.html',
    './app/**/*.html',
    './app/css/*.css'
  ], ['reload']);
});

gulp.task('js', function () {
  return gulp.src(paths.js, { base: './app' })
    .pipe(babel())
    .pipe(gulp.dest('build'));
});

gulp.task('restart', ['default'], function () {
  // Restart main process
  electron.restart();
});

gulp.task('reload', ['default'], function () {
  // Reload renderer process
  electron.reload();
});

gulp.task('useref', function () {
  return gulp.src('app/index.html')
    .pipe(useref())
    .pipe(gulp.dest('build'));
});

