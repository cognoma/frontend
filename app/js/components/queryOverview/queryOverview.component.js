const QueryOverviewComponent = {
    templateUrl: 'queryOverview/queryOverview.tpl.html',
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