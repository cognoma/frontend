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
                 'MutationsService',
                 'DiseaseService',
                 '$log',
                 function($scope, $rootScope, _, DiseaseModel, $state,$q, $timeout, MutationsService, DiseaseService, $log) {
            	     'ngInject';
                   let vm = this;
                   
                   $log = $log.getInstance('QueryBuilderComponent', true);
                   $log.log('');
                   

            	     this.diseaseList = [];
            	     this.mutationList = [];

                   vm.currentState = ()=>$state.current.name.split('.')[2];


                   vm.searchResults = [];

                   vm._pushResultToSetBy = (params)=>{
                    let resultIdx = _.indexOf(_.pluck(vm.searchResults, params.param), params.result[params.param]);
                    // console.log(`pushResultToSetBy: ${params.result[params.param]}:${resultIdx}`);
                    vm.searchResults.splice(resultIdx,1);
                  };

                  vm._clearSet = (set)=>{
                    this[`${set}List`] = [];
                  };


                   vm.setIsSorted = (list, sortedList, sortedOn)=>{
                      return _.isEqual(
                                  _.pluck(list, sortedOn),
                                  _.pluck(sortedList, sortedOn),
                              );
                  };

                  vm.sortSetOn = (list, sortOn)=>{
                    let sortedList = _.sortBy(list, sortOn);
                    return (vm.setIsSorted(list, sortedList, sortOn) ? list.reverse() : sortedList);
                  };
            
                  

                /* =======================================================================
                  Mutation Set Event Handlers 
                ========================================================================== */
                $rootScope.$on('mutationSet:add', (e,mutation)=>{
                    this.mutationList.push(mutation);      
                    vm._pushResultToSetBy({result: mutation, set:this.mutationList, param: '_id'});

                    if(this.diseaseList.length) vm._updateDL_mutationData();
                });

                $rootScope.$on('mutationSet:clear', ()=>{ vm._clearSet('mutation'); });


                $rootScope.$on('mutationSet:remove:mutation', (e, mutation)=>{
                    let mutationIndex = _.indexOf(_.pluck(this.mutationList, 'entrezgene'), mutation.entrezgene);

                    this.mutationList.splice(mutationIndex, 1);
                    if(this.diseaseList.length) vm._updateDL_mutationData();
                });

                $rootScope.$on('mutationSet:sort', (e, data)=>{
                    this.mutationList = vm.sortSetOn(this.mutationList, data.sortOn );
                });


                /* =======================================================================
                  Disease List Event Handlers 
                ========================================================================== */
                $rootScope.$on('diseaseSet:clear', (e,disease)=>{ vm._clearSet('disease'); });

                $rootScope.$on('diseaseSet:add', (e,disease)=>{
                    this.diseaseList.push(disease);
                    vm._pushResultToSetBy({result: disease, set:this.diseaseList, param: 'acronym'});
                });

                $rootScope.$on('diseaseSet:sort', (e, data)=>{
                    this.diseaseList = vm.sortSetOn(this.diseaseList, data.sortOn );
                });

                $rootScope.$on('diseaseSet:remove:disease', (e, disease)=>{
                    let dIndex = _.indexOf(_.pluck(this.diseaseList, 'acronym'), disease.name);
                    this.diseaseList.splice(dIndex, 1);
                });


                vm._updateDL_mutationData = ()=>{

                    this.diseaseList.map(diseaseModel=>{
                        diseaseModel.mutationsLoading = true;

                        // mock server delay 
                        $timeout(()=>{
                          diseaseModel.getAggregates(this.mutationList)
                                    .then(function(updatedModel) {
                                      diseaseModel.mutationsLoading = false;
                                    });
                        }, 250);//END $timeout

                    });//END this.diseaseList.map

                }//END vm._updateDL_mutationData 


                /* =======================================================================
                  Query Param Selector Events
                ========================================================================== */
                // TODO: make angular search service to abstract search functionality
                const searchServices = {
                    'mutations': MutationsService,
                    'disease':   DiseaseService
                };


                this.onInputChange = (searchQuery)=>{
                    $log.info(`query: ${searchQuery}`);

                      if(searchQuery.length == 0 ){
                          vm.searchResults = [];
                      }else{

                        // pass along the user input query and selected mutations list 
                        searchServices[vm.currentState()]
                          .query(searchQuery, {source: 'DB'}, this.mutationList)
                          .then(response=>{

                            // make sure we update the views 
                            $scope.$apply(()=>{
                              vm.searchResults = response; 
                            });

                          });//END searchServices[vm.currentState()]

                      }
                      
                        
                };///END this.onInputChange

                

                
            }]
}

export default {
	name: 'queryBuilder',
	obj:  QueryBuilderComponent
};
