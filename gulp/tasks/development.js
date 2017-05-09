import gulp        from 'gulp';
import runSequence from 'run-sequence';

gulp.task('dev', ['clean'], function(cb) {

  global.isProd = false;

<<<<<<< HEAD
  runSequence(['styles', 'images', 'fonts','views'], 'browserify', 'watch', cb);
=======
  runSequence(['styles', 'images', 'fonts','views'], 'browserify','watch', cb);
>>>>>>> db29ca0bad9e3bf3617019a0881965a5475f5ab0

});
