const template = require("./cgTable.tpl.html");

const cgTable = {
  template,
  bindings: {
    columns: "=",
    data: "=",
    isSearching: "=",
    searchQuery: "="
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
        vm.sortType = vm.columns[0].id;
        vm.sortReverse = false;
        vm.isAllSelected = false;
      };

      vm.sortColumn = columnId => {
        vm.sortType = columnId;
        vm.sortReverse = !vm.sortReverse;
      };

      vm.areAllResultsSelected = () => {
        let notSelectedResults = _.some(
          vm.filteredSearchResults,
          result => !result.isSelected
        );
        vm.isAllSelected = !notSelectedResults;
      };

      vm.selectAllResults = isAllSelected => {
        vm.filteredSearchResults.forEach(result => {
          result.isSelected = isAllSelected;
        });
      };

      $scope.$on("SEARCH_QUERY_CHANGED", () => {
        vm.filteredSearchResults.forEach(result => {
          result.isSelected = false;
        });

        vm.isAllSelected = false;
      });
    }
  ]
};

export default {
  name: "cgTable",
  obj: cgTable
};
