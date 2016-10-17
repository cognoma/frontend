const QueryParamSelectorComponent = {
    templateUrl: 'queryBuilder/queryParamSelector/queryParamSelector.tpl.html',
    bindings: {},
	transclude: true,    
    controller: function () {
    	'ngInject';
    }
}

export default {
	name: 'queryParamSelector',
	obj: QueryParamSelectorComponent
};