const template = require('./queryOverview.tpl.html');

const QueryOverviewComponent = {
    template,
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
