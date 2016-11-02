const QueryOverviewControlComponent = {
    templateUrl: 'queryBuilder/queryOverview/queryOverviewControl/queryOverviewControl.tpl.html',
    bindings: {
    	title:    '@',
        setTitle: '@',
        desc:     '@',
        listType: '@',
        paramList:'='
    },
    controller: [function () {
        'ngInject';
    }]
}

export default { 
	name: 'queryOverviewControl',
	obj: QueryOverviewControlComponent
};