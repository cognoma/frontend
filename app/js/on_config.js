function OnConfig($stateProvider, $locationProvider, $urlRouterProvider, $compileProvider) {
  'ngInject';

  if (process.env.NODE_ENV === 'production') {
    $compileProvider.debugInfoEnabled(false);
  }

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
  
  
  
  $stateProvider
    .state({
      name:         'app',
      url:          '/',
      template:     '<app id="app" class="clearfix"></app>'
    })
    .state({
      name:       'app.queryBuilder',
      url:        'query-builder',
      component:  'queryBuilder',
      redirectTo: '/query-builder/mutations'
    })
    .state({
      name:  'app.queryBuilder.mutations',
      url:   '/mutations',
      views: {
        'queryOverview':      {component: 'queryOverview'},
        'querySet':           {component: 'querySetMutations'},
        'queryParamSelector': {component: 'queryParamSelector'}
      }
    })
    .state({
      name:         'app.queryBuilder.diseaseType',
      url:           '/disease-type',
      views:{
        'queryOverview':      {component: 'queryOverview'},
        'querySet':           {component: 'querySetDiseaseType'},
        'queryParamSelector': {component: 'queryParamSelector'}
      }
    });
  
  
  $urlRouterProvider
    .when('/query-builder','/query-builder/mutations')
    .otherwise('/');

}

export default OnConfig;
