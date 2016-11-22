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
        let vm = this;
        
        vm.active = $state.current.name.includes(vm.listType);        
        
        this.clearSet = ()=>$rootScope.$emit('mutationSet:clear');

        this.resetSearch = ()=>$rootScope.$emit('paramSearch:reset');


    }]
}

export default { 
	name: 'queryOverviewControl',
	obj: QueryOverviewControlComponent
};