const template = require("./queryOverview.tpl.html");

const QueryOverviewComponent = {
    template,
    bindings: {
        removeParam: "&",
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

            vm.clickedSubmitQuery = evt => {
                evt.preventDefault();
                QueryBuilderService.submitQuery(
                    vm.diseaseSet,
                    vm.mutationsSet,
                    vm.user
                );
            };
        }
    ]
};

export default {
    name: "queryOverview",
    obj: QueryOverviewComponent
};
