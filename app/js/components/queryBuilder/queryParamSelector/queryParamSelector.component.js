const QueryParamSelectorComponent = {
    templateUrl: 'queryBuilder/queryParamSelector/queryParamSelector.tpl.html',
    bindings: {},
	transclude: true,    
    controller: ['$rootScope','$scope','GeneSearchService',function($rootScope, $scope,GeneSearchService) {
        	'ngInject';
        	const vm = this;
        	vm.geneQuery="";
        	vm.results =[];

        	this.addGene = gene=>{
        		console.log(gene);
        		$rootScope.$emit('mutationSet:add', {
        			id:gene.symbol,
					name:gene.name,
					desc:gene._score
        		});
        	}

        	this.onInputChange = ()=>{
        		console.log("onInputChange");
        		if(vm.geneQuery.length >= 3){
        			GeneSearchService.get(vm.geneQuery).then(data=>{
        				console.log(data);
        				$scope.$apply(()=>{vm.results = data.hits;})
        			})	
        		}

        		if(vm.geneQuery.length == 0) this.results = [];
        		
        	}
        	
        }]
}

export default {
	name: 'queryParamSelector',
	obj: QueryParamSelectorComponent
};