const QuerySetMutationsComponent = {
    templateUrl: 'queryBuilder/querySets/querySetMutations/querySetMutations.tpl.html',
    bindings: {},
    require:{
      'parent': '^queryBuilder'
    },
    controller: function(){
          'ngInject';
          this.$onInit = ()=>{
            this.mutationList = this.parent.mutationList;
          };
        }
}

export default {
	name: 'querySetMutations',
	obj: QuerySetMutationsComponent
};
