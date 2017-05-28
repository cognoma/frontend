const template = require('./querySetMutations.tpl.html');

const QuerySetMutationsComponent = {
    template,
    bindings: {
      'mutationSet': '=',
      'diseaseSet':  '=',
      // 'clearSet': '&'
    },
    controller: [
                '$rootScope',
                '$log',
                '_',
                function($rootScope, $log,_){
              'ngInject';
              $log = $log.getInstance('QuerySetMutationsComponent', true);
              $log.log('');

              let vm = this;
              vm.clearSet = data=>{
                console.log(dta)
              }
              // this.clearMutationSet = ()=>$rootScope.$emit('mutationSet:clear');

              // this.sortMutations = sortParam=>{$rootScope.$emit('mutationSet:sort', {sortOn:  sortParam});}


              /**
             * @param  {Array} list- array of objects to sort  
             * @param  {String} sortOn - object key to sort on 
             * 
             * @return {Array} 
             */
            vm.sortResultsBy = (list, sortOn)=>{

                vm.mutationSet = sortedResutlsBy(list, sortOn);
            }


             /**
             * Sorts an Array in descending order based on teh given key
             * @param  {Array} list- array of objects to sort  
             * @param  {String} sortOn - object key to sort on 
             * 
             * @return {Array} 
             */
            let sortedResutlsBy = (list, sortOn)=>{
                let results = _.assign([], list);
                let sortedList = _.sortBy(results, sortOn);//reverse it to make it a descending list
                
                return sortedList;
                // return (isSorted(results, sortedList, sortOn) ? results.reverse() : sortedList);
            };



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
