const QuerySetMutationsComponent = {
    templateUrl: 'queryBuilder/querySets/querySetMutations/querySetMutations.tpl.html',
    bindings: {
      mutations: "="
    },
    controller: function(){
          'ngInject';
          console.log(this);
          // this.$onInit = ()=>{
          //   this.mutationList = this.parent.mutationList;
          // };
        }
}

export default {
	name: 'querySetMutations',
	obj: QuerySetMutationsComponent
};
