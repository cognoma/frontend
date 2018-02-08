function OnConfig(
  $stateProvider,
  $locationProvider,
  $urlRouterProvider,
  $compileProvider,
  $httpProvider,
  $resourceProvider,
  $provide
) {
  "ngInject";

  if (process.env.NODE_ENV === "production") {
    $compileProvider.debugInfoEnabled(false);
  }

  //activate LogDecorator for $log
  require("./utils/logging/LogDecorator.js")($provide);

  // used for github pages deployments
  $locationProvider.html5Mode({
    enabled: location.hostname.includes("github.io") ? false : true,
    requireBase: false
  });

  // Don't strip trailing slashes from calculated URLs
  $resourceProvider.defaults.stripTrailingSlashes = false;

  // TODO: possibly separate queryBuilder functionality into it's own app
  $urlRouterProvider.when("/query-builder", "/query-builder/mutations");
  $urlRouterProvider.when("/", "/home");

  $stateProvider
    .state({
      name: "app",
      url: "/",
      template: `<app id="app" class="row"></app>`
    })
    .state({
      name: "app.home",
      title: "Cognoma",
      url: "home",
      template: `<home class="home" />`
    })
    .state({
      name: "app.queryBuilder",
      title: "Query Builder:",
      url: "query-builder",
      template: `<query-builder 
                    id="query-builder" 
                    class="query-builder"
                    mutations-set="$ctrl.STATE.query.mutations"
                    disease-set="$ctrl.STATE.query.diseases"
                    user="$ctrl.STATE.user"
                />`,
      redirectTo: "/query-builder/mutations"
    })
    .state({
      name: "app.queryBuilder.mutations",
      title: "Query Builder: Mutations",
      url: "/mutations?userSlug",
      resolve: {
        user: [
          "$stateParams",
          "UserAuth",
          function($stateParams, UserAuth) {
            return {};
          }
        ]
      },
      views: {
        queryOverview: {
          template: `<query-overview 
                        mutations-set="$ctrl.mutationsSet" 
                        disease-set="$ctrl.diseaseSet"
                        remove-param="$ctrl.removeParamFromQuery({id, paramRef,paramType})"
                        user="$ctrl.user"
                    />`
        },
        queryParamSelector: {
          template: `<query-param-selector 
                        disease-set="$ctrl.diseaseSet"
                        mutations-set="$ctrl.mutationsSet" 
                        on-change="$ctrl.onInputChange(search)" 
                        on-param-select="$ctrl.addParamsToQuery(selectedParams)"
                    />`
        }
      }
    })
    .state({
      name: "app.queryBuilder.disease",
      title: "Query Builder: Disease Type",
      url: "/disease-type",
      views: {
        queryOverview: {
          template: `<query-overview 
                        mutations-set="$ctrl.mutationsSet"
                        disease-set="$ctrl.diseaseSet"
                        user="$ctrl.user"
                    />`
        },
        queryParamSelector: {
          template: `<query-param-selector 
                        disease-set="$ctrl.diseaseSet"
                        mutations-set="$ctrl.mutationsSet" 
                        on-change="$ctrl.onInputChange(search)" 
                        search-results="$ctrl.searchResults" 
                        on-param-select="$ctrl.addParamsToQuery(selectedParams)"
                    />`
        }
      }
    });

  $urlRouterProvider.otherwise("/home");
}

export default OnConfig;
