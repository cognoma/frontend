import gulp        from 'gulp';
import runSequence from 'run-sequence';

gulp.task('copyCNAME', function(cb) {

  cb = cb || function() {};

  global.isProd = true;

  // copies the CNAME file to the build directory 
  // for use with github pages
  gulp.src(['./CNAME']).pipe(gulp.dest('./build'));

});
