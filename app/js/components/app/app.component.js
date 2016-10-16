const AppComponent = {
    templateUrl: 'app/app.tpl.html',
    bindings: {},
	transclude: true,    
    controller: function () {
    	'ngInject';
    }
}

export default {
	name: 'app',
	obj: AppComponent
};