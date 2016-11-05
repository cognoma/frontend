const QueryOverviewControlComponent = {
    templateUrl: 'queryBuilder/queryOverview/queryOverviewControl/queryOverviewControl.tpl.html',
    bindings: {
    	title:    '@',
        setTitle: '@',
        desc:     '@',
        listType: '@',
        paramList:'='
    },
    controller: ['$rootScope',function ($rootScope) {
        'ngInject';

        this.addGene = ()=>{
            $rootScope.$emit('mutationSet:add',
                                           {id: 'xxx9x', 
                                            name: 'gene name 10', 
                                            desc: 'a new desc', 
                                            link: 'cardlink'}
                                        );
        };
        

        this.clearSet = ()=>$rootScope.$emit('mutationSet:clear');


    }]
}

export default { 
	name: 'queryOverviewControl',
	obj: QueryOverviewControlComponent
};