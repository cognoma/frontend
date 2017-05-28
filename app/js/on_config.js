function OnConfig($stateProvider, $locationProvider, $urlRouterProvider, $compileProvider,$httpProvider, $resourceProvider, $provide) {
  'ngInject';

  if (process.env.NODE_ENV === 'production') {
    $compileProvider.debugInfoEnabled(false);
  }

  //activate LogDecorator for $log
  require('./utils/logging/LogDecorator.js')($provide);

  // used for github pages deployments 
  $locationProvider.html5Mode({
    enabled: location.hostname.includes('github.io') ? false : true,
    requireBase: false
  });
  
  // Don't strip trailing slashes from calculated URLs
  $resourceProvider.defaults.stripTrailingSlashes = false;

  // TODO: possibly separate queryBuilder functionality into it's own app
  $urlRouterProvider.when('/query-builder','/query-builder/mutations');
  
  
  $stateProvider
    .state({
      name:         'app',
      url:          '/',
      template:     `<app id="app" class="row"></app>`,
    })
    .state({
      name:       'app.queryBuilder',
      title:      'Query Builder:',
      url:        'query-builder',
      template:   `<query-builder 
                        id="query-builder" 
                        class="row"
                        mutations-set="$ctrl.STATE.query.mutations"
                        disease-set="$ctrl.STATE.query.diseases"
                   />`,
      redirectTo: '/query-builder/mutations',      
    })
    .state({
      name:  'app.queryBuilder.mutations',
      title: 'Query Builder: Mutations',
      url:   '/mutations',
      views: {
        'queryOverview':      {template: `<query-overview 
                                                mutation-set="$ctrl.mutationsSet" 
                                                disease-set="$ctrl.diseaseSet"
                                            />`},

        'querySet':           {template: `<query-set-mutations 
                                                mutation-set="$ctrl.mutationsSet" />`},

        'queryParamSelector': {template: `<query-param-selector 
                                                disease-set="$ctrl.diseaseSet"
                                                mutations-set="$ctrl.mutationsSet" 
                                                on-change="$ctrl.onInputChange(search)" 
                                                on-param-select="$ctrl.addParamToQuery(queryParamData)"
                                          />`}
      }
    })
    .state({
      name:   'app.queryBuilder.disease',
      title:  'Query Builder: Disease Type',
      url:    '/disease-type',
      views:{
        'queryOverview':      {template: `<query-overview 
                                                mutation-set="$ctrl.mutationsSet"
                                                disease-set="$ctrl.diseaseSet"/>`},

        'querySet':           {template: `<query-set-disease-type 
                                                disease-set="$ctrl.diseaseSet" />`},

        'queryParamSelector': {template: `<query-param-selector 
                                                disease-set="$ctrl.diseaseSet"
                                                mutations-set="$ctrl.mutationsSet" 
                                                on-change="$ctrl.onInputChange(search)" 
                                                search-results="$ctrl.searchResults" 
                                                on-param-select="$ctrl.addParamToQuery(queryParamData)"
                                          />`}
      }
    });
  
  
  
    
    $urlRouterProvider.otherwise('/');

}

export default OnConfig;
