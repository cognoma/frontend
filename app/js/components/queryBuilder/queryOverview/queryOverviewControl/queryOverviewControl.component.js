const QueryOverviewControlComponent = {
    templateUrl: 'queryBuilder/queryOverview/queryOverviewControl/queryOverviewControl.tpl.html',
    bindings: {
    	title:    '@',
        setTitle: '@',
        desc:     '@',
        listType: '@',
        paramList:'='
    },
    controller: ['$rootScope','$state','$log',function ($rootScope, $state, $log) {
        'ngInject';

        $log = $log.getInstance('QueryOverviewControlComponent', true);
        $log.log('');

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