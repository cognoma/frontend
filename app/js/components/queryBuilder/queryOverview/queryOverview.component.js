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
        function($log, QueryBuilderService) {
            "ngInject";

            $log = $log.getInstance("QueryOverviewComponent", false);
            $log.log("");

            const vm = this;

            vm.isModalShown = false;

            vm.clickedSubmitQuery = evt => {
                evt.preventDefault();
                vm.isModalShown = true;
            };
        }
    ]
};

export default {
    name: "queryOverview",
    obj: QueryOverviewComponent
};
