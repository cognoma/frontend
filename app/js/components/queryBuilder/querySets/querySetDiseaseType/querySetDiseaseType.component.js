const QuerySetDiseaseTypeComponent = {
    templateUrl: 'queryBuilder/querySets/querySetDiseaseType/querySetDiseaseType.tpl.html',
    bindings: {
      'mutationSet': '=',
      'diseaseSet':  '='
    },
    controller: function () {
    	'ngInject';
      console.log(this);
    }
}

export default {
	name: 'querySetDiseaseType',
	obj: QuerySetDiseaseTypeComponent
};
