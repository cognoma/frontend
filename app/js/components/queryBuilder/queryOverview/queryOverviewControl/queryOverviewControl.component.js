const template = require("./queryOverviewControl.tpl.html");

const QueryOverviewControlComponent = {
    template,
    bindings: {
        title: "@",
        setTitle: "@",
        desc: "@",
        listType: "@",
        paramList: "<",
        removeParam: "<",
        isCalculating: "<"
    },
    controller: [
        "$state",
        "$log",
        function($state, $log) {
            "ngInject";

            $log = $log.getInstance("QueryOverviewControlComponent", false);

            let vm = this;

            vm.$onInit = () => {
                $log.log(vm.title);
                vm.active = $state.current.name.includes(vm.listType);
            };
        }
    ]
};

export default {
    name: "queryOverviewControl",
    obj: QueryOverviewControlComponent
};
