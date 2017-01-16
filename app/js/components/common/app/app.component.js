const AppComponent = {
    templateUrl: 'common/app/app.tpl.html',
    bindings: {},
    controller: ['$rootScope','$log', function($rootScope, $log){
        'ngInject';
        $log = $log.getInstance('AppComponent', true);
        $log.log('');
   }]
}

export default {
	name: 'app',
	obj: AppComponent
};