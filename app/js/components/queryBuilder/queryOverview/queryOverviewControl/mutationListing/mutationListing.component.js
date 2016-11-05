const mutationListingComponent = {
    templateUrl: 'queryBuilder/queryOverview/queryOverviewControl/mutationListing/mutationListing.tpl.html',
    bindings: {
        entrezid: '@'
    },
	transclude: 'true',    
    controller: ['$rootScope',function($rootScope){
            'ngInject';

            this.removeMutation = $id=>$rootScope.$emit('mutationSet:remove:mutation', {id: $id});
    
        }]
}

export default { 
	name: 'mutationListing',
	obj: mutationListingComponent
};