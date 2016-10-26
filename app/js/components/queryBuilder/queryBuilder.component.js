const QueryBuilderComponent = {
    templateUrl: 'queryBuilder/queryBuilder.tpl.html',
    bindings: {},
    transclude: true,
    controller: ['$state',function($state) {
        	'ngInject';
        	console.log($state.get('app.queryBuilder.mutations'));
    
        }]
}

export default {
	name: 'queryBuilder',
	obj: QueryBuilderComponent
};
