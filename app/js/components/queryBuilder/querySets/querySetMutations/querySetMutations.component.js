const QuerySetMutationsComponent = {
    templateUrl: 'queryBuilder/querySets/querySetMutations/querySetMutations.tpl.html',
    bindings: {
    },
	transclude: true,
  require:{
    'parent': '^queryBuilder'
  },
    controller: function () {
      this.mutationList = [{id: 'xxx1x', name: 'gene name', desc: 'a desc', link: 'cardlink'},{id: 'xxx2x', name: 'gene name', desc: 'a desc', link: 'cardlink'},{id: 'xxx3x', name: 'gene name', desc: 'a desc', link: 'cardlink'}];
    	'ngInject';
    }
}

export default {
	name: 'querySetMutations',
	obj: QuerySetMutationsComponent
};
