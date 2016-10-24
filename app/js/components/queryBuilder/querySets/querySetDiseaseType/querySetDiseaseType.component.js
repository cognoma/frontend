const QuerySetDiseaseTypeComponent = {
    templateUrl: 'queryBuilder/querySets/querySetDiseaseType/querySetDiseaseType.tpl.html',
    bindings: {},
	transclude: true,
  require:{
    'parent': '^queryBuilder'
  },
    controller: function () {
      this.diseaseList = [{id: 'ADRENOCORTICAL CARCINOMA', positives: 10, negatives: 20},{id: 'ADRENOCORTICAL CARCINOMA', positives: 10, negatives: 20},{id: 'ADRENOCORTICAL CARCINOMA', positives: 10, negatives: 20},{id: 'ADRENOCORTICAL CARCINOMA', positives: 10, negatives: 20}];
    	'ngInject';
    }
}

export default {
	name: 'querySetDiseaseType',
	obj: QuerySetDiseaseTypeComponent
};
