function OnConfig($stateProvider, $locationProvider, $urlRouterProvider, $compileProvider) {
  'ngInject';

  if (process.env.NODE_ENV === 'production') {
    $compileProvider.debugInfoEnabled(false);
  }

  $locationProvider.html5Mode(true);

  $stateProvider
    .state({
      name: 'app',
      url: '/',
      template: '<app></app>'
      // component: 'app'
    })
    .state({
      name: 'app.home',
      url: 'home',
      template:'<home></home>'
      // component: 'home'
    });
  
  
  $urlRouterProvider.otherwise('/');

}

export default OnConfig;
