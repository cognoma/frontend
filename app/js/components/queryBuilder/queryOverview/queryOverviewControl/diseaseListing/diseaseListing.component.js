const diseaseListingComponent = {
    templateUrl: 'queryBuilder/queryOverview/queryOverviewControl/diseaseListing/diseaseListing.tpl.html',
    bindings: {
        name: '@',
        positives: '=',
        negatives: '='
    },
    controller: function () {
    	'ngInject';
    }
}

export default { 
	name: 'diseaseListing',
	obj: diseaseListingComponent
};