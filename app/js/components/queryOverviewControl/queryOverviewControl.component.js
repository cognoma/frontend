const QueryOverviewControlComponent = {
    templateUrl: 'queryOverviewControl/queryOverviewControl.tpl.html',
    bindings: {
    	title:    '@',
        setTitle: '@',
        desc:     '@',
        listType: '@',
        paramList:'='
    },
	transclude: true,    
    controller: [function () {
        'ngInject';
    
    }]
}

export default { 
	name: 'queryOverviewControl',
	obj: QueryOverviewControlComponent
};