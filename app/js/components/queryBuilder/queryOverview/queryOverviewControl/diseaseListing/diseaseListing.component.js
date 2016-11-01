const diseaseListingComponent = {
    templateUrl: 'queryBuilder/queryOverview/queryOverviewControl/diseaseListing/diseaseListing.tpl.html',
    bindings: {
        name: '@',
        positives: '=',
        negatives: '='
    },
    controller: function () {
    	'ngInject';
        console.log(this);
    }
}

export default { 
	name: 'diseaseListing',
	obj: diseaseListingComponent
};