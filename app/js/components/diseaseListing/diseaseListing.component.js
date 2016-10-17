const diseaseListingComponent = {
    templateUrl: 'diseaseListing/diseaseListing.tpl.html',
    bindings: {
        name: '@',
        samples: '='
    },
	transclude: 'true',    
    controller: function () {
    	'ngInject';
        // let vm = this;
    }
}

export default { 
	name: 'diseaseListing',
	obj: diseaseListingComponent
};