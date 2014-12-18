var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('default',
  function ()
  {
    gulp.src(['./NoiseLib/*.js', './NoiseLib/FastGenerators/*.js', './NoiseLib/Generators/*.js', './NoiseLib/Models/*.js', './NoiseLib/Modifiers/*.js'])
        .pipe(concat('NoiseLib.js'))
        .pipe(gulp.dest('./'))
  }
);