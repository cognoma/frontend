const template = require("./mutationListing.tpl.html");

const mutationListingComponent = {
    template,

    bindings: {
        gene: "<",
        onRemoveParam: "<"
    },
    controller: [
        "$rootScope",
        "$log",
        function($rootScope, $log) {
            "ngInject";

            const vm = this;

            vm.$onInit = () => {
                $log = $log.getInstance("mutationListingComponent", true);
                $log.log(`${this.gene.symbol}:`);
            };
        }
    ]
};

export default {
    name: "mutationListing",
    obj: mutationListingComponent
};
