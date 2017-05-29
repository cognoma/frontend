const template = require('./querySetMutations.tpl.html');

const QuerySetMutationsComponent = {
    template,
    bindings: {
      'mutationsSet': '<',
      'clearSet':     '&',
      'sortSet':      '&'
    },
    controller: [
                '$rootScope',
                '$log',
                function($rootScope, $log){
              'ngInject';
              $log = $log.getInstance('QuerySetMutationsComponent', true);
              $log.log('');

              let vm = this;


              vm.geneHovered = false;

              this.highlightGene = idx=>{
                vm.geneHovered = !vm.geneHovered;

                this.mutationsSet[idx].active = !this.mutationsSet[idx].active;
                if(this.mutationsSet[idx].active){
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
