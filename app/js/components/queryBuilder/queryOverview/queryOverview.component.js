const QueryOverviewComponent = {
    templateUrl: 'queryBuilder/queryOverview/queryOverview.tpl.html',
    bindings: {},
	transclude: true,    
	require:{
		'parent':'^queryBuilder'
	},
    controller: function () {
    	'ngInject';
    	
    }
}

export default {
	name: 'queryOverview',
	obj: QueryOverviewComponent
};