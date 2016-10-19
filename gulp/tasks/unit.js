import config   from '../config';
import path     from 'path';
import gulp     from 'gulp';
import {Server} from 'karma';
import gutil from 'gulp-util';
import browserSync from 'browser-sync';


let showReport = ()=>{
    console.log('showReport');
    browserSync.init({
    server: {
      baseDir: config.test.reports+'unit_tests/report-summary',
    port: config.testPort,
    ui: {
        port: config.UIPort
    },
    ghostMode: {
      links: false
    }
  }});
};


gulp.task('unit', function (done) {
  new Server({
    configFile: path.resolve(__dirname, '../..', config.test.karma),
    singleRun: true
  }, function(err){

        if(err === 0){
            showReport();
            // done();
        } else {
            done(new gutil.PluginError('karma', {
                message: 'Karma Tests failed'
            }));
        }
    }).start();

});

