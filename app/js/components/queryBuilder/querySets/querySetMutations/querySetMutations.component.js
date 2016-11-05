const QuerySetMutationsComponent = {
    templateUrl: 'queryBuilder/querySets/querySetMutations/querySetMutations.tpl.html',
    bindings: {
      'mutationSet': '=',
      'diseaseSet':  '='
    },
    controller: ['$rootScope',function($rootScope){
              'ngInject';


              this.clearMutationSet = ()=>$rootScope.$emit('mutationSet:clear');

              
              let _mutationsSorted = false,
                  _prevSetLength = 0;
              this.sortMutationsById = ()=>{ 
                if(this.mutationSet.length != _prevSetLength) _mutationsSorted = false;
                $rootScope.$emit('mutationSet:sortBy:Id', {sorted:  _mutationsSorted});
                if(!_mutationsSorted)  _mutationsSorted = true;
                _prevSetLength = this.mutationSet.length;
              }



            }]
}

export default {
	name: 'querySetMutations',
	obj: QuerySetMutationsComponent
};
