const template = require("./diseaseListing.tpl.html");

const diseaseListingComponent = {
    template,
    bindings: {
        disease: "=",
        onRemoveParam: "<"
    },
    controller: [
        "$rootScope",
        "$log",
        function($rootScope, $log) {
            "ngInject";
            $log = $log.getInstance("diseaseListingComponent", true);

            this.$onInit = () => {
                $log.log(`${this.name}:`);
            };
        }
    ]
};

export default {
    name: "diseaseListing",
    obj: diseaseListingComponent
};
