const QueryBuilderComponent = {
    templateUrl: 'queryBuilder/queryBuilder.tpl.html',
    bindings: {},
    controller: ['$scope',
                 '$rootScope',
                 '_',
                 'DiseaseModel',
                 '$state',
                 '$q',
                 '$timeout',
                 'GeneSearchService',
                 'DiseaseSearchService',
                 function($scope, $rootScope, _, DiseaseModel, $state,$q, $timeout, GeneSearchService, DiseaseSearchService) {
            	     'ngInject';
                   let vm = this;

            	     $rootScope.diseaseList = this.diseaseList = [];
            	     $rootScope.mutationList = this.mutationList = [];

                   vm.currentState = ()=>$state.current.name.split('.')[2];
                   vm.searchResults = [];

                   vm._pushResultToSetBy = (params)=>{
                    let resultIdx = _.indexOf(_.pluck(vm.searchResults, params.param), params.result[params.param]);
                    // console.log(`pushResultToSetBy: ${params.result[params.param]}:${resultIdx}`);
                    vm.searchResults.splice(resultIdx,1);
                  };

                  vm._clearSet = (set)=>{
                    console.log(this[`${set}List`]);
                    this[`${set}List`] = [];
                  };

                /* =======================================================================
                  Mutation Set Event Handlers 
                ========================================================================== */
                $rootScope.$on('mutationSet:add', (e,mutation)=>{
                    this.mutationList.push(mutation);      
                    vm._pushResultToSetBy({result: mutation, set:this.mutationList, param: '_id'});

                    if(this.diseaseList.length) vm._updateDL_mutationData();
                });

                $rootScope.$on('mutationSet:clear', ()=>vm._clearSet('mutation') );

                $rootScope.$on('mutationSet:remove:mutation', (e, mutation)=>{
                    let mutationIndex = _.indexOf(_.pluck(this.mutationList, 'entrezgene'), mutation.entrezId);
                    this.mutationList.splice(mutationIndex, 1);
                    if(this.diseaseList.length) vm._updateDL_mutationData();
                });

                $rootScope.$on('mutationSet:sortBy:Id', (e, data)=>{
                    let sortedList = _.sortBy(this.mutationList, 'id');
                    this.mutationList = !data.sorted ? sortedList : this.mutationList.reverse();
                });


                /* =======================================================================
                  Disease List Event Handlers 
                ========================================================================== */
                $rootScope.$on('diseaseSet:add', (e,disease)=>{
                    this.diseaseList.push(disease);
                    vm._pushResultToSetBy({result: disease, set:$rootScope.diseaseList, param: 'acronym'});
                });

                $rootScope.$on('diseaseSet:remove:disease', (e, disease)=>{
                    console.log(`diseaseSet:remove:disease -> ${disease.name}`);
                    let dIndex = _.indexOf(_.pluck(this.diseaseList, 'acronym'), disease.name);
                    this.diseaseList.splice(dIndex, 1);
                });


                vm._updateDL_mutationData = ()=>{
                  
                    this.diseaseList.map(diseaseResult=>{

                    diseaseResult.mutationsLoading = true;
                    return DiseaseModel.loadPositives(diseaseResult, this.mutationList)
                                       .then(data=>{
                                          data.mutationsLoading = false;
                                          let dIndex = _.indexOf(_.pluck(this.diseaseList, 'acronym'), data.acronym);
                                          $scope.$apply(()=>{this.diseaseList[dIndex] = data;});
                                        });
                  })

                }


                /* =======================================================================
                  Query Param Selector Events
                ========================================================================== */
                const searchServices = {
                    'mutations': GeneSearchService,
                    'disease':   DiseaseSearchService
                };

                this.onInputChange = (searchQuery)=>{
                    console.info(`query: ${searchQuery}`);
                    if(searchQuery.length <= 0){
                        vm.searchResults = [];
                    }else{
                        
                        searchServices[vm.currentState()]
                            .get(searchQuery)
                            .then(response=>{
                                let queryResults = response.results || response.data.hits;
                                vm.searchResults = queryResults;
                            });
                        
                    }
                };

                

                
            }]
}

export default {
	name: 'queryBuilder',
	obj:  QueryBuilderComponent
};
