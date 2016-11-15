const QueryParamSelectorComponent = {
    templateUrl: 'queryBuilder/queryParamSelector/queryParamSelector.tpl.html',
    bindings:    {},
	transclude: true,    
    controller: ['$rootScope','$scope','GeneSearchService','_',function($rootScope, $scope,GeneSearchService, _) {
        	'ngInject';
        	const vm = this;
        	vm.geneQuery='';
        	vm.results =[];
            
            $rootScope.$on('paramSearch:reset', ()=>{
                vm.results =[];
                vm.geneQuery='';
                document.querySelector('input').focus();
            });



        	this.addGene = gene=>{
        		let mutationIndex = _.indexOf(_.pluck(vm.results, '_id'), gene._id);
                vm.results.splice(mutationIndex,1);
        		$rootScope.$emit('mutationSet:add', {
        			id:  gene.symbol,
					name:gene.name,
					desc:gene._score
        		});
        	};


        	this.onInputChange = ()=>{
                console.log(`vm.geneQuery: ${vm.geneQuery} (${vm.geneQuery.length})`);

                if(vm.geneQuery.length <= 0){
                    vm.results = [];
                }else{
                    GeneSearchService.get(vm.geneQuery)
                                 .then(data=>{
                                     $scope.$apply(()=>{vm.results = data.hits;})
                    });
                } 
        	};

            let isSorted = (list, sortedList, sortedOn)=>{
                return _.isEqual(
                            _.pluck(list, sortedOn),
                            _.pluck(sortedList, sortedOn),
                        );
            };

            let sortResultsOn = (list, sortOn)=>{
                let sortedList = _.sortBy(list, sortOn);
                return (isSorted(list, sortedList, sortOn) ? list.reverse() : sortedList);
            };
            
            this.sortResultsBy = (list, sortOn)=>{
                vm.results = sortResultsOn(list, sortOn);
            }
            
        	
        }]
}

export default {
	name: 'queryParamSelector',
	obj:  QueryParamSelectorComponent
};