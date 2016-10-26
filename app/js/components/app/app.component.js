const AppComponent = {
    templateUrl: 'app/app.tpl.html',
    bindings: {},
	transclude: true,    
    controller: ['$state',function ($state) {
        	'ngInject';
        }]
}

export default {
	name: 'app',
	obj: AppComponent
};