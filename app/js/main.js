import angular from 'angular';

// angular modules
import constants from './constants';
import onConfig  from './on_config';
import onRun     from './on_run';
import 'angular-animate';
import 'angular-ui-router';
import 'angular-ui-bootstrap';
import './templates';
import './filters';
import './components';
import './directives';
import './services';



// create and bootstrap application
const requires = [
  'ui.router',
  'ui.bootstrap',
  'ngAnimate',
  require('angular-touch'),
  'templates',
  'app.filters',
  'app.components',
  'app.directives',
  'app.services',
];

// mount on window for testing
window.app = angular.module('app', requires);

angular.module('app').constant('AppSettings', constants);

angular.module('app').config(onConfig);

angular.module('app').run(onRun);

angular.bootstrap(document, ['app'], {
  strictDi: true
});
