const QueryOverviewComponent = {
    templateUrl: 'queryBuilder/queryOverview/queryOverview.tpl.html',
    bindings: {
    	'mutationSet': '=',
    	'diseaseSet': '='
    },
    controller: function () {
    	'ngInject';
    }
}

export default {
	name: 'queryOverview',
	obj: QueryOverviewComponent
};