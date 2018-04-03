const template = require("./cgTable.tpl.html");

const cgTable = {
  template,
  bindings: {
    columns: "=",
    data: "=",
    isSearching: "=",
    searchQuery: "=",
    isFilterDisabled: "=",
    sortId: "=",
    sortDirection: "="
  },
  controller: [
    "$scope",
    "$log",
    "_",
    function($scope, $log, _) {
      "ngInject";
      $log = $log.getInstance("cgTableComponent", false);
      $log.log("");

      let vm = this;

      vm.$onInit = () => {
        vm.sortType = vm.sortId || vm.columns[0].id;
        vm.sortReverse = !!vm.sortDirection ? vm.sortDirection : false;
        vm.isAllSelected = false;
        vm.filteredSearchResults = [];
      };

      /**
       * Sets isSelected to false on all filtered search results
       * Sets isAllSelected checkbox to false
       */
      function _deselectAllResults() {
        vm.filteredSearchResults.forEach(result => {
          result.isSelected = false;
        });

        vm.isAllSelected = false;
      }

      /**
       * Sorts column according to column id and reverses sort order
       * @param  {string} columnId - column id
       */
      vm.sortColumn = columnId => {
        if (vm.sortType === columnId) {
          vm.sortReverse = !vm.sortReverse;
        } else {
          vm.sortType = columnId;
        }
      };

      /**
       * Checks to see if all results are selected and updates vm.isAllSelected
       */
      vm.areAllResultsSelected = () => {
        let notSelectedResults = _.some(
          vm.filteredSearchResults,
          result => !result.isSelected
        );
        vm.isAllSelected = !notSelectedResults;
        return vm.isAllSelected;
      };

      /**
       * Programatically sets isSelected to true on all filtered search results
       * @param  {Boolean} isAllSelected - is select all checkbox checked?
       */
      vm.selectAllResults = isAllSelected => {
        vm.filteredSearchResults.forEach(result => {
          result.isSelected = isAllSelected;
        });
      };

      /**
       * Listens for SEARCH_QUERY_CHANGED event broadcast in queryParamSelector.component.js
       */
      $scope.$on("SEARCH_QUERY_CHANGED", () => {
        _deselectAllResults();
      });

      /**
       * Listens for REMOVED_PARAMS_FROM_QUERY event broadcast in queryParamSelector.component.js
       */
      $scope.$on("REMOVED_PARAMS_FROM_QUERY", () => {
        _deselectAllResults();
      });
    }
  ]
};

export default {
  name: "cgTable",
  obj: cgTable
};
