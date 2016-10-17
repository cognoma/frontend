const mutationListingComponent = {
    templateUrl: 'queryBuilder/queryOverview/queryOverviewControl/mutationListing/mutationListing.tpl.html',
    bindings: {
        entrezid: '@'
    },
	transclude: 'true',    
    controller: function () {
    	'ngInject';
        // let vm = this;

    }
}

export default { 
	name: 'mutationListing',
	obj: mutationListingComponent
};