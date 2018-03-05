const template = require("./queryOverview.tpl.html");

const QueryOverviewComponent = {
  template,
  bindings: {
    removeParam: "<",
    mutationsSet: "<",
    diseaseSet: "<",
    user: "="
  },
  controller: [
    "$log",
    "QueryBuilderService",
    "_",
    "NotificationService",
    "$rootScope",
    function($log, QueryBuilderService, _, NotificationService, $rootScope) {
      "ngInject";

      $log = $log.getInstance("QueryOverviewComponent", false);
      $log.log("");

      const vm = this;

      vm.isModalShown = false;

      // Helper function to get the total number of positive or negative samples in a query
      let getTotalsFor = setParam =>
        _.reduce(_.pluck(vm.diseaseSet, setParam), (a, b) => a + b);

      function _validateClassifier() {
        let numberPositives = getTotalsFor("positives");
        let numberNegatives = getTotalsFor("negatives");
        // 20 positive samples and 20 negative samples
        return numberPositives >= 20 && numberNegatives >= 20;
      }

      vm.clickedSubmitQuery = evt => {
        evt.preventDefault();
        if (_validateClassifier()) {
          $rootScope.$emit("MODAL_OPENED");
        } else {
          NotificationService.notify({
            type: "error",
            message:
              "The query must have at least 20 positive and 20 negative samples"
          });
        }
      };
    }
  ]
};

export default {
  name: "queryOverview",
  obj: QueryOverviewComponent
};
