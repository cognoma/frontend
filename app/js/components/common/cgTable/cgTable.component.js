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
    "$log",
    "_",
    function($log, _) {
      "ngInject";
      $log = $log.getInstance("cgTableComponent", false);
      $log.log("");

      let vm = this;

      vm.$onInit = () => {
        vm.sortType = vm.columns[0].id;
        vm.sortReverse = false;
      };

      vm.sortColumn = columnId => {
        console.log(columnId);
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
        vm.filteredSearchResults.map(result => {
          result.isSelected = isAllSelected;
        });
      };
    }
  ]
};

export default {
  name: "cgTable",
  obj: cgTable
};
