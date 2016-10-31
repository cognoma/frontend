function OnConfig($stateProvider, $locationProvider, $urlRouterProvider, $compileProvider) {
  'ngInject';

  if (process.env.NODE_ENV === 'production') {
    $compileProvider.debugInfoEnabled(false);
  }

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
  
  
  $urlRouterProvider.when('/query-builder','/query-builder/mutations');
  
  $stateProvider
    .state({
      name:         'app',
      url:          '/',
      template:     '<app id="app" class="clearfix"></app>'
    })
    .state({
      name:       'app.queryBuilder',
      title:       'Query Builder:',
      url:        'query-builder',
      component:  'queryBuilder',
      redirectTo: '/query-builder/mutations'
    })
    .state({
      name:  'app.queryBuilder.mutations',
      title: 'Query Builder: Mutations',
      url:   '/mutations',
      views: {
        'queryOverview':      {component: 'queryOverview'},
        'querySet':           {component: 'querySetMutations'},
        'queryParamSelector': {component: 'queryParamSelector'}
      }
    })
    .state({
      name:         'app.queryBuilder.diseaseType',
      title:       'Query Builder: Disease Type',
      url:           '/disease-type',
      views:{
        'queryOverview':      {component: 'queryOverview'},
        'querySet':           {component: 'querySetDiseaseType'},
        'queryParamSelector': {component: 'queryParamSelector'}
      }
    });
  
  
  
    
    $urlRouterProvider.otherwise('/');

}

export default OnConfig;
