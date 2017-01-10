const QueryTitleComponent = {
    templateUrl: 'queryBuilder/queryTitle/queryTitle.tpl.html',
    bindings: {},
    controller: ['$log',function($log) {
          'ngInject';
          $log = $log.getInstance('QueryTitleComponent', true);
          $log.log('');
          
          
        }]
}

export default {
	name: 'queryTitle',
	obj:  QueryTitleComponent
};
