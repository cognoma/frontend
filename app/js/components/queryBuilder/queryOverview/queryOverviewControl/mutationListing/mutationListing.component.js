const mutationListingComponent = {
    templateUrl: 'queryBuilder/queryOverview/queryOverviewControl/mutationListing/mutationListing.tpl.html',
    bindings: {
        'symbol': '@',
        'entrezgene':'<'
    },
    controller: ['$rootScope',function($rootScope){
            'ngInject';

            this.removeMutation = $id=>$rootScope.$emit('mutationSet:remove:mutation', {entrezgene: $id});
    
        }]
}

export default { 
	name: 'mutationListing',
	obj: mutationListingComponent
};