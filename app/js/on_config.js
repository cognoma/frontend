function OnConfig($stateProvider, $locationProvider, $urlRouterProvider, $compileProvider, $provide) {
  'ngInject';

  if (process.env.NODE_ENV === 'production') {
    $compileProvider.debugInfoEnabled(false);
  }

  //activate LogDecorator
  require('./utils/logging/LogDecorator.js')($provide);

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
  
  
  $urlRouterProvider.when('/query-builder','/query-builder/mutations');
  
  $stateProvider
    .state({
      name:         'app',
      url:          '/',
      template:     '<app id="app" class="row"></app>'
    })
    .state({
      name:       'app.queryBuilder',
      title:      'Query Builder:',
      url:        'query-builder',
      template:   '<query-builder id="query-builder" class="row"/>',
      redirectTo: '/query-builder/mutations'
    })
    .state({
      name:  'app.queryBuilder.mutations',
      title: 'Query Builder: Mutations',
      url:   '/mutations',
      views: {
        'queryOverview':      {template: '<query-overview mutation-set="$ctrl.mutationList" disease-set="$ctrl.diseaseList"/>'},
        'querySet':           {template: '<query-set-mutations mutation-set="$ctrl.mutationList" />'},
        'queryParamSelector': {template: '<query-param-selector on-change="$ctrl.onInputChange(search)" search-results="$ctrl.searchResults" />'}
      }
    })
    .state({
      name:   'app.queryBuilder.disease',
      title:  'Query Builder: Disease Type',
      url:    '/disease-type',
      views:{
        'queryOverview':      {template: '<query-overview mutation-set="$ctrl.mutationList" disease-set="$ctrl.diseaseList"/>'},
        'querySet':           {template: '<query-set-disease-type disease-set="$ctrl.diseaseList" />'},
        'queryParamSelector': {template: '<query-param-selector on-change="$ctrl.onInputChange(search)" search-results="$ctrl.searchResults" />'}
      }
    });
  
  
  
    
    $urlRouterProvider.otherwise('/');

}

export default OnConfig;
