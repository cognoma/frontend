const template = require("./queryModal.tpl.html");

const QueryModalComponent = {
  template,
  bindings: {
      removeParam: "<",
      mutationsSet: "<",
      diseaseSet: "<",
      user: "=",
      isShown: "="
  },
  controller: [
    "$log",
    "QueryBuilderService",
    "$rootScope",
    function($log, QueryBuilderService, $rootScope) {
      "ngInject";

      $log = $log.getInstance("queryModalComponent", false);
      $log.log("");

      const vm = this;

      vm.email = '';

      vm.clickedSubmitEmail = evt => {
        evt.preventDefault();
        QueryBuilderService.submitQuery(
            vm.diseaseSet,
            vm.mutationsSet,
            vm.user,
            vm.email
        );
      };

      $rootScope.$on("MODAL_CLOSED", () => {
        vm.isShown = false;
      });
    }
  ]
};

export default {
  name: "queryModal",
  obj: QueryModalComponent
};
