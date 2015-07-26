var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var sass = require('gulp-ruby-sass');
var jade = require('gulp-jade');
var uglify = require('gulp-uglify');
var prefix = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var reload = browserSync.reload;


// Browser Sync

gulp.task('browser-sync', function(){

   var files = [

      '/jade/**/*.jade',
      '/js/*.js',
      '/sass/**/*.sass'

   ];

   browserSync(files, {

      server: '../',
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
      .pipe(gulp.dest('../'))
      .pipe(reload({stream: true}));

});


// Sass + prefix

gulp.task('sass', function(){

   return sass('sass/main.sass', {

      style: 'expanded',
      loadPath: 'sass'

   })
   .on('error', function (err) {
      console.log('Error !', err.message);
   })
   .pipe(prefix({
      browsers: ['last 2 versions', '> 5%']
   }))
   .pipe(gulp.dest('../assets/css'))
   .pipe(reload({stream: true}));

});

// Uglify

gulp.task('uglify', function () {

   gulp.src('js/*.js')
      .pipe(uglify())
      .pipe(gulp.dest('../assets/js'))
      .pipe(reload({stream: true}));

});

// imagemin

gulp.task('imagemin', function(){

   gulp.src('img/*')
      .pipe(imagemin())
      .pipe(gulp.dest('../assets/img'));

});

// watch

gulp.task('watch', function () {

   gulp.watch('jade/**/*.jade', ['jade']); // watch the jade files
   gulp.watch('sass/**/*.sass', ['sass']); // watch the sass files
   gulp.watch('js/*.js', ['uglify']); // watch the js files
   gulp.watch('img/*', ['imagemin']); // watch the img files

});

// default

gulp.task('default', ['jade', 'sass', 'uglify', 'imagemin', 'browser-sync', 'watch']);
