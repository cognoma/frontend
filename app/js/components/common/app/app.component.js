const template = require('./app.tpl.html');

const AppComponent = {
    template,
    bindings: {},
    controller: ['$rootScope','$log', function($rootScope, $log){
        'ngInject';
        $log = $log.getInstance('AppComponent', true);
        $log.log('');

        this.STATE ={
        	query:{
        		title:     '',
        		mutations: [],
        		diseases:  []
        	}
        };


   }]
}

export default {
	name: 'app',
	obj: AppComponent
};