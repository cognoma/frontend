const QueryOverviewComponent = {
    templateUrl: 'queryBuilder/queryOverview/queryOverview.tpl.html',
    bindings: {
    	'mutationSet': ' = ',
    	'diseaseSet': '  = '
    },
    controller: ['$log',function ($log) {
            'ngInject';
            $log = $log.getInstance('QueryOverviewComponent', true);
            $log.log('');
    }]
}

export default {
	name: 'queryOverview',
	obj: QueryOverviewComponent
};