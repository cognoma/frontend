const QueryOverviewComponent = {
    templateUrl: 'queryBuilder/queryOverview/queryOverview.tpl.html',
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