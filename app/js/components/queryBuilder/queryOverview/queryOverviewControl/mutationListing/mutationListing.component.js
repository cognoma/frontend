const mutationListingComponent = {
    templateUrl: 'queryBuilder/queryOverview/queryOverviewControl/mutationListing/mutationListing.tpl.html',
    bindings: {
        'symbol': '@',
        'entrezId':'<'
    },
    controller: ['$rootScope',function($rootScope){
            'ngInject';

            this.removeMutation = $id=>$rootScope.$emit('mutationSet:remove:mutation', {entrezId: $id});
    
        }]
}

export default { 
	name: 'mutationListing',
	obj: mutationListingComponent
};