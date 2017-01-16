const template = require('./queryTitle.tpl.html')

const QueryTitleComponent = {
    template,
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
