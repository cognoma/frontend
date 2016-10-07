'use strict';

angular.module('cognomaApp.results', ['ngRoute', 'ui.bootstrap', 'ngAnimate', 'ngSanitize' ])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/results', {
    templateUrl: 'results/results.html',
    controller: 'tabsResultsCtrl'
  });
}]);

angular.module('cognomaApp.results').controller('tabsResultsCtrl', function ($scope, $window, $http, $routeParams) {

  var classification = $routeParams.classification+'.json';

  $http.get(classification)
       .then(function(res){
          $scope.resultData = res.data;
          console.log($scope.resultData.widget.id);

          $scope.resultDetails = {
            name: $scope.resultData.widget.id,
            status: 	$scope.resultData.widget.results.Status,
            algorithm: 	$scope.resultData.widget.results.Algorithm,
            accuracy: 	$scope.resultData.widget.results.Accuracy,
            fValue: 	$scope.resultData.widget.results.fValue
          };

        });

  $scope.tabs = [
    { title:'Genes', content:'Dynamic Genes content' },
    { title:'Samples', content:'Dynamic Samples content' },
    { title:'Algorithm', content:'Dynamic Algorithm content' },
  ];

  $scope.model = {
    name: 'Tabs'
  };


});

angular.module('cognomaApp.results').controller('ModalDemoCtrl', function ($uibModal, $log) {
  var $ctrl = this;
  $ctrl.items = ['item1', 'item2', 'item3'];

  $ctrl.animationsEnabled = true;

  $ctrl.open = function (size) {
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      controllerAs: '$ctrl',
      size: size,
      resolve: {
        items: function () {
          return $ctrl.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $ctrl.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $ctrl.openComponentModal = function () {
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      component: 'modalComponent',
      resolve: {
        items: function () {
          return $ctrl.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $ctrl.selected = selectedItem;
    }, function () {
      $log.info('modal-component dismissed at: ' + new Date());
    });
  };

  $ctrl.toggleAnimation = function () {
    $ctrl.animationsEnabled = !$ctrl.animationsEnabled;
  };
});

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

angular.module('cognomaApp.results').controller('ModalInstanceCtrl', function ($uibModalInstance, items) {
  var $ctrl = this;
  $ctrl.items = items;
  $ctrl.selected = {
    item: $ctrl.items[0]
  };

  $ctrl.ok = function () {
    $uibModalInstance.close($ctrl.selected.item);
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

// Please note that the close and dismiss bindings are from $uibModalInstance.

angular.module('cognomaApp.results').component('modalComponent', {
  templateUrl: 'myModalContent.html',
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller: function () {
    var $ctrl = this;

    $ctrl.$onInit = function () {
      $ctrl.items = $ctrl.resolve.items;
      $ctrl.selected = {
        item: $ctrl.items[0]
      };
    };

    $ctrl.ok = function () {
      $ctrl.close({$value: $ctrl.selected.item});
    };

    $ctrl.cancel = function () {
      $ctrl.dismiss({$value: 'cancel'});
    };
  }
});
