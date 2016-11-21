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

                  let pushResultToSetBy = (params)=>{
                    let resultIdx = _.indexOf(_.pluck(vm.searchResults, params.param), params.result[params.param]);
                    console.log(`pushResultToSetBy: ${params.result[params.param]}:${resultIdx}`);
                    vm.searchResults.splice(resultIdx,1);
                  };

                /* =======================================================================
                  Mutation Set Event Handlers 
                ========================================================================== */
                $rootScope.$on('mutationSet:add', (e,mutation)=>{
                    this.mutationList.push(mutation);      
                    pushResultToSetBy({result: mutation, set:this.mutationList, param: '_id'});

                    if(this.diseaseList.length) updateDL_mutationData();
                });

                $rootScope.$on('mutationSet:clear', e=>{
                    this.mutationList = [];
                });

                $rootScope.$on('mutationSet:remove:mutation', (e, mutation)=>{
                    let mutationIndex = _.indexOf(_.pluck(this.mutationList, 'entrezgene'), mutation.entrezId);
                    this.mutationList.splice(mutationIndex, 1);
                    if(this.diseaseList.length) updateDL_mutationData();
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
                    pushResultToSetBy({result: disease, set:$rootScope.diseaseList, param: 'acronym'});
                });

                $rootScope.$on('diseaseSet:remove:disease', (e, disease)=>{
                  console.log(disease);
                    let dIndex = _.indexOf(_.pluck($rootScope.diseaseList, 'acronym'), disease.name);
                    $rootScope.diseaseList.splice(dIndex, 1);
                });


                let updateDL_mutationData = ()=>{
                  // TODO: better promise and resolve configuration 
                  
                    this.diseaseList.map(diseaseResult=>{

                    diseaseResult.mutationsLoading = true;
                    return DiseaseModel.loadPositives(diseaseResult, this.mutationList)
                                       .then(data=>{
                                          data.mutationsLoading = false;
                                          let dIndex = _.indexOf(_.pluck(this.diseaseList, 'acronym'), data.acronym);
                                          $scope.$apply(()=>{this.diseaseList[dIndex] = data;});
                                          
                                          
                                          console.log(`updateDL_mutationData::${diseaseResult.acronym}(${dIndex}):${data.positives}`)

                                          // return data;
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
