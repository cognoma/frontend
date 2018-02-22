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
    "$document",
    function($log, QueryBuilderService, $rootScope, $document) {
      "ngInject";

      $log = $log.getInstance("queryModalComponent", false);
      $log.log("");

      const vm = this;

      vm.email = "";

      function _closedModal() {
        vm.isShown = false;
        $document[0].body.classList.remove("query-modal__overlay");
      }

      function _openedModal() {
        vm.isShown = true;
        $document[0].body.classList.add("query-modal__overlay");
      }

      vm.clickedSubmitEmail = evt => {
        evt.preventDefault();
        QueryBuilderService.submitQuery(
          vm.diseaseSet,
          vm.mutationsSet,
          vm.user,
          vm.email
        );
      };

      vm.clickedClose = evt => {
        evt.preventDefault();
        _closedModal();
      };

      $rootScope.$on("MODAL_CLOSED", () => {
        _closedModal();
      });

      $rootScope.$on("MODAL_OPENED", () => {
        _openedModal();
      });
    }
  ]
};

export default {
  name: "queryModal",
  obj: QueryModalComponent
};
