import config   from '../config';
import path     from 'path';
import gulp     from 'gulp';
import {Server} from 'karma';
import gutil from 'gulp-util';
import browserSync from 'browser-sync';



let _TEST_SERVER, _TEST_REPORT;
const isCI = process.env.CI && Boolean(process.env.CI_PULL_REQUEST);
console.log(`isCI: ${isCI}`);
console.log(process.env);

// fire up an instance of browserSync to show the Karma HTML Reports
// and live reload them as we code
let showReport = ()=>{

 _TEST_REPORT = browserSync.create('test_report');

 _TEST_REPORT.init({
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


// start up our test servers and live reload our test on each save
gulp.task('unit', (done) =>{

  // setup Karma runner server
  _TEST_SERVER = new Server({
    configFile: path.resolve(__dirname, '../..', config.test.karma)
  }, function(err){

        if(err === 0){            
            done();
        } else {

            done(new gutil.PluginError('karma', {
                message: 'Karma Tests failed'
            }));
            return process.exit(err);
        }

    });


  if(!isCI){
    
      showReport();

      _TEST_SERVER.on('run_complete',() =>{
        _TEST_REPORT.reload();
      });    
  }


  return _TEST_SERVER.start();

});

