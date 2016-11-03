const QuerySetDiseaseTypeComponent = {
    templateUrl: 'queryBuilder/querySets/querySetDiseaseType/querySetDiseaseType.tpl.html',
    bindings: {},
  require:{
    'parent': '^queryBuilder'
  },
    controller: function () {
    	'ngInject';
      
      this.$onInit = ()=>{
        this.diseaseList = this.parent.diseaseList;
      }
    }
}

export default {
	name: 'querySetDiseaseType',
	obj: QuerySetDiseaseTypeComponent
};
