'use strict';

angular.module('cognomaApp.results', ['ngRoute', 'ui.bootstrap', 'ngAnimate', 'ngSanitize' ])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/results', {
    templateUrl: 'results/results.html',
    controller: 'tabsResultsCtrl'
  });
}]);

angular.module('cognomaApp.results').controller('tabsResultsCtrl', function ($scope, $window) {

  $scope.tabs = [
    { title:'Genes', content:'Dynamic Genes content' },
    { title:'Samples', content:'Dynamic Samples content' },
    { title:'Algorithm', content:'Dynamic Algorithm content' },
    { title:'Submission', content:'Dynamic Submission content' },
    { title:'Results', content:'Dynamic Results content' }
  ];

  $scope.model = {
    name: 'Tabs'
  };

  $scope.resultDetails = {
    name: 'model1234'
  };

});
