import angular from 'angular';

// angular modules
import constants from './constants';
import onConfig  from './on_config';
import onRun     from './on_run';

import MockBackend from './MockBackend';
import '../../node_modules/angular-mocks/ngMockE2E.js';
import '../../node_modules/angular-resource/angular-resource.js';

import 'angular-animate';
import 'angular-resource';
import './components';
import 'angular-ui-router';
import 'ui-router-route-to-components';
import 'angular-ui-bootstrap';
import './templates';
import './filters';
import './directives';
import './services';
// import './factories';

import * as _ from 'underscore';

// small underscore.js factory
let underscore = angular.module('lib.underscore', []);
underscore.factory('_', ()=>{ return _;});


// create and bootstrap application
const requires = [
  'ui.router.components',
  'ui.router',
  'ui.bootstrap',
  'ngAnimate',
  require('angular-touch'),
  'templates',
  'app.filters',
  'app.components',
  'app.directives',
  'app.services',
  'ngMockE2E',
  'ngResource',
  'lib.underscore'
];

// mount on window for testing
window.app = angular.module('app', requires);

angular.module('app').constant('AppSettings', constants);

angular.module('app').config(onConfig);

angular.module('app').run(MockBackend);

app.factory('GenesResource', ['$resource', function($resource) {
  return $resource( '/genes/:id', {id: '@id'} );
}]);


angular.bootstrap(document, ['app'], {
  strictDi: true
});
