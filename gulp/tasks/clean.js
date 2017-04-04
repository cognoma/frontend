import config from '../config';
import gulp   from 'gulp';
import del    from 'del';

gulp.task('clean', function() {
  del([config.buildDir + 'CNAME']);
  return del([config.buildDir]);
});
