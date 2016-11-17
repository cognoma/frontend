const AppComponent = {
    templateUrl: 'app/app.tpl.html',
    bindings: {},
    controller: ['$rootScope',function($rootScope){
        'ngInject';

        $rootScope.queryBuilder = {
        	query:{
        		mutations: [],
        		diseases: [{id: 'ADRENOCORTICAL CARCINOMA', positives: 10, negatives: 20},{id: 'ADRENOCORTICAL CARCINOMA', positives: 10, negatives: 20},{id: 'ADRENOCORTICAL CARCINOMA', positives: 10, negatives: 20},{id: 'ADRENOCORTICAL CARCINOMA', positives: 10, negatives: 20}]
        	}
        };


   }]
}

export default {
	name: 'app',
	obj: AppComponent
};