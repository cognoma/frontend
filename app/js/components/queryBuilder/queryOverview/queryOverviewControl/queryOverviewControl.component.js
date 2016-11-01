const QueryOverviewControlComponent = {
    templateUrl: 'queryBuilder/queryOverview/queryOverviewControl/queryOverviewControl.tpl.html',
    bindings: {
    	title:    '@',
        setTitle: '@',
        desc:     '@',
        listType: '@',
        paramList:'='
    },
    require:{
        'parent': '^queryBuilder'
    },
    controller: [function () {
        'ngInject';
        console.log(this);
    }]
}

export default { 
	name: 'queryOverviewControl',
	obj: QueryOverviewControlComponent
};