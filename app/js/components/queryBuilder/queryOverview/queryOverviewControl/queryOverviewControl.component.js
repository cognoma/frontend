const QueryOverviewControlComponent = {
    templateUrl: 'queryBuilder/queryOverview/queryOverviewControl/queryOverviewControl.tpl.html',
    bindings: {
    	title:    '@',
        setTitle: '@',
        desc:     '@',
        listType: '@',
        paramList:'='
    },
    controller: ['$rootScope','$state',function ($rootScope, $state) {
        'ngInject';
        
        this.active = $state.current.name.includes(this.listType);
        
        this.clearSet = ()=>$rootScope.$emit('mutationSet:clear');
        this.resetSearch = ()=>$rootScope.$emit('paramSearch:reset');


    }]
}

export default { 
	name: 'queryOverviewControl',
	obj: QueryOverviewControlComponent
};