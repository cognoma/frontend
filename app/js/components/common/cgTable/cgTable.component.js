const template = require("./cgTable.tpl.html");

const cgTable = {
  template,
  bindings: {
    'columns': '=',
    'data': '=',
    'isSearching': '=',
    'searchQuery': '='
  },
  controller: [
    "$log",
    function($log) {
      "ngInject";
      $log = $log.getInstance("cgTableComponent", false);
      $log.log("");

      let vm = this;

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
