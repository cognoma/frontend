function OnConfig($stateProvider, $locationProvider, $urlRouterProvider, $compileProvider) {
  'ngInject';

  if (process.env.NODE_ENV === 'production') {
    $compileProvider.debugInfoEnabled(false);
  }

  $locationProvider.html5Mode(true);

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
      redirectTo: 'app.queryBuilder.mutations'
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
  
  
  $urlRouterProvider.otherwise('/');

}

export default OnConfig;
