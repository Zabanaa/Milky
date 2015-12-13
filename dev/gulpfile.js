var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');
var browserSync = require('browser-sync');
var sass = require('gulp-ruby-sass');
var jade = require('gulp-jade');
var prefix = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var gutil  = require("gulp-util");
var reload = browserSync.reload;


gulp.task('browser-sync', function(){

   var files = [

      '/jade/**/*.jade',
      '/js/*.js',
      '/sass/**/*.sass'

   ];

   browserSync(files, {

      server: '../public',
      notify: true

   });

});

// Jade

gulp.task('jade', function () {

   gulp.src('./jade/*.jade')
      .pipe(jade({
         pretty: true
      }))
      .on('error', console.log)
      .pipe(gulp.dest('../public'))
      .pipe(reload({stream: true}));

});

// Sass + prefix

gulp.task('sass', function(){

   return sass('sass/main.sass', {

      style: 'compressed',
      loadPath: 'sass'

   })
   .on('error', function (err) {
      console.log('Error !', err.message);
   })
   .pipe(prefix({
      browsers: ['last 2 versions', '> 5%']
   }))
   .pipe(gulp.dest('../public/assets/css'))
   .pipe(reload({stream: true}));

});


gulp.task('imagemin', function(){

   gulp.src('img/*')
      .pipe(imagemin())
      .pipe(gulp.dest('../public/assets/img'));

});


gulp.task('watchAll', function () {

   gulp.watch('jade/**/*.jade', ['jade']); // watch the jade files
   gulp.watch('sass/**/*.sass', ['sass']); // watch the sass files
   gulp.watch('img/*', ['imagemin']); // watch the img files

});


function compile(watch) {
  var bundler = watchify(browserify('js/app.js', { debug: true }).transform(babel, {presets: ["es2015"]}));

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('js/app.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('../public/assets/'))
      .pipe(reload({stream: true}));
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
  }

  rebundle();
}

function watch() {
  return compile(true);
};

gulp.task('build', function() { return compile(); });
gulp.task('watch', function() { return watch(); });

gulp.task('default', ['watch', "jade", "sass", "imagemin", "browser-sync", "watchAll"]);
