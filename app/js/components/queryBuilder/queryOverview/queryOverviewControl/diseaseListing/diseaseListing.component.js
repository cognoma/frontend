const diseaseListingComponent = {
    templateUrl: 'queryBuilder/queryOverview/queryOverviewControl/diseaseListing/diseaseListing.tpl.html',
    bindings: {
        name:        '@',
        positives:   '=',
        samples:     '=',
        'isLoading': '<'
    },
    controller: ['$rootScope',function ($rootScope) {
            'ngInject';
            this.removeDisease = disease=>$rootScope.$emit('diseaseSet:remove:disease', disease);
        }]
}

export default { 
	name: 'diseaseListing',
	obj: diseaseListingComponent
};