const template = require('./queryOverview.tpl.html');

const QueryOverviewComponent = {
    template,
    bindings: {
    	'mutationSet': ' = ',
    	'diseaseSet': '  = '
    },
    controller: ['$scope', '$rootScope', '$log',function ($scope, $rootScope, $log) {
            'ngInject';
            $log = $log.getInstance('QueryOverviewComponent', true);
            $log.log('');

            $scope.submit = ()=>$rootScope.$emit('query:submit');

    }]
}

export default {
	name: 'queryOverview',
	obj: QueryOverviewComponent
};
