const QueryParamSelectorComponent = {
    templateUrl: 'queryBuilder/queryParamSelector/queryParamSelector.tpl.html',
    bindings: {},
	transclude: true,    
    controller: ['$rootScope','$scope','GeneSearchService','_',function($rootScope, $scope,GeneSearchService, _) {
        	'ngInject';
        	const vm = this;
        	vm.geneQuery='';
        	vm.results =[];
            // vm.results = [
            //     { 
            //      '_id': '105278', 
            //      '_score': 1.0571284, 
            //      'entrezgene': 105278, 
            //      'name': 'cyclin-dependent kinase 20', 
            //      'symbol': 'Cdk20', 
            //      'taxid': 10090 
            //     }, 
            //     {
            //      '_id': '4331', 
            //      '_score': 17.735683, 
            //      'entrezgene': 4331, 
            //      'name': 'MNAT1, CDK activating kinase assembly factor', 
            //      'symbol': 'MNAT1', 
            //      'taxid': 9606 
            //     }, 
            //     { '_id': '171150',
            //       '_score': 0.9574064,
            //       'entrezgene': 171150,
            //       'name': 'cyclin-dependent kinase 7',
            //       'symbol': 'Cdk7',
            //       'taxid': 10116 
            //     },
            //      { 
            //      '_id': '1030', 
            //      '_score': 0.9836988, 
            //      'entrezgene': 1030, 
            //      'name': 'cyclin dependent kinase inhibitor 2B', 
            //      'symbol': 'CDKN2B', 
            //      'taxid': 9606 
            //      },  
            //     { 
            //     '_id': '388324', 
            //     '_score': 16.368792, 
            //     'entrezgene': 388324, 
            //     'name': 'inhibitor of CDK, cyclin A1 interacting protein 1', 
            //     'symbol': 'INCA1', 
            //     'taxid': 9606 
            //     }, 
            //     { 
            //       '_id': '143384',
            //        '_score': 0.9736093,
            //        'entrezgene': 143384,
            //        'name': 'CDK2 associated cullin domain 1',
            //        'symbol': 'CACUL1',
            //        'taxid': 9606 
            //      },
            //     { 
            //      '_id': '103844',
            //      '_score': 12.799388, 
            //      'entrezgene': 103844, 
            //      'name': 'inhibitor of CDK, cyclin A1 interacting protein 1', 
            //      'symbol': 'Inca1', 
            //      'taxid': 10090 
            //     }, 
            //     { 
            //      '_id': '266713', 
            //      '_score': 10.069292, 
            //      'entrezgene': 266713, 
            //      'name': 'MNAT CDK-activating kinase assembly factor 1', 
            //      'symbol': 'Mnat1', 
            //      'taxid': 10116 
            //     }, 
            //     { 
            //      '_id': '360555', 
            //      '_score': 10.069292, 
            //      'entrezgene': 360555, 
            //      'name': 'inhibitor of CDK, cyclin A1 interacting protein 1', 
            //      'symbol': 'Inca1', 
            //      'taxid': 10116 
            //     }, 
            //      { 
            //       '_id': '12572',
            //       '_score': 0.9345328,
            //       'entrezgene': 12572,
            //       'name': 'cyclin-dependent kinase 7',
            //       'symbol': 'Cdk7',
            //       'taxid': 10090 
            //       }
            // ];



            $rootScope.$on('paramSearch:reset', ()=>{
                vm.results =[];
                vm.geneQuery='';
                document.querySelector('input').focus()
            });



        	this.addGene = gene=>{
        		let mutationIndex = _.indexOf(_.pluck(vm.results, '_id'), gene._id);
                
                vm.results.splice(mutationIndex,1);

        		$rootScope.$emit('mutationSet:add', {
        			id:gene.symbol,
					name:gene.name,
					desc:gene._score
        		});
        	};

        	this.onInputChange = ()=>{
        		GeneSearchService.get(vm.geneQuery).then(data=>{
        			$scope.$apply(()=>{vm.results = data.hits;})
        		});
        		
        		if(vm.geneQuery.length == 0) this.results = [];
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