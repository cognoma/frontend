const QuerySetMutationsComponent = {
    templateUrl: 'queryBuilder/querySets/querySetMutations/querySetMutations.tpl.html',
    bindings: {
      'mutationSet': '=',
      'diseaseSet':  '='
    },
    controller: ['$rootScope',function($rootScope){
              'ngInject';

              let vm = this;
              

              this.clearMutationSet = ()=>$rootScope.$emit('mutationSet:clear');

              
              let _mutationsSorted = false,
                  _prevSetLength = 0;
              this.sortMutationsById = ()=>{ 
                if(this.mutationSet.length != _prevSetLength) _mutationsSorted = false;
                $rootScope.$emit('mutationSet:sortBy:Id', {sorted:  _mutationsSorted});
                if(!_mutationsSorted)  _mutationsSorted = true;
                _prevSetLength = this.mutationSet.length;
              }


              vm.geneHovered = false;
              this.highlightGene = idx=>{
                vm.geneHovered = !vm.geneHovered;

                this.mutationSet[idx].active = !this.mutationSet[idx].active;
                if(this.mutationSet[idx].active){
                    let cardListContainer = document.querySelector('.gene-card-display');
                    let cards = document.querySelectorAll('.gene-card-display .gene-card');
                    cardListContainer.scrollTop = cards[idx].offsetTop - 20;    

                }

              };



            }]
}

export default {
	name: 'querySetMutations',
	obj: QuerySetMutationsComponent
};