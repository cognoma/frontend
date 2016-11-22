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

              this.sortMutations = sortParam=>{$rootScope.$emit('mutationSet:sort', {sortOn:  sortParam});}
                


              vm.geneHovered = false;
              this.highlightGene = idx=>{
                vm.geneHovered = !vm.geneHovered;

                this.mutationSet[idx].active = !this.mutationSet[idx].active;
                // if(this.mutationSet[idx].active){
                //     let cardListContainer = document.querySelector('.gene-card-display');
                //     let cards = document.querySelectorAll('.gene-card-display .gene-card');
                //     cardListContainer.scrollTop = cards[idx].offsetTop - 20;    

                // }

              };



            }]
}

export default {
	name: 'querySetMutations',
	obj: QuerySetMutationsComponent
};
