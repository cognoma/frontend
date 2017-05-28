const template = require('./queryBuilder.tpl.html');

const QueryBuilderComponent = {
    template,
    bindings: {
      'mutationsSet': '=',
      'diseaseSet':   '='
    },
    controller: ['$scope',
                 '$rootScope',
                 '_',
                 'DiseaseModel',
                 '$state',
                 '$q',
                 '$timeout',
                 'MutationsService',
                 'DiseaseService',
                 'ProgressIndicatorBarService',
                 '$log',
                 function($scope, $rootScope, _, DiseaseModel, $state,$q, $timeout, MutationsService, DiseaseService, ProgressIndicatorBarService, $log) {
            	     'ngInject';

                   let vm = this;
                  

                   $log = $log.getInstance('QueryBuilderComponent', true);
                   $log.log('');
                  
                   
            	     // vm.diseaseList  = [];
            	     // vm.mutationList = [];

                   vm.progressIndicators = [
                    {
                      title:  'Search Genes',  
                      state:  'app.queryBuilder.mutations' , 
                      icon:   '', 
                      active: true,
                      type:   'icon'
                    },
                    {
                      title:  'Add Genes',     
                      state:  'app.queryBuilder.mutations' , 
                      icon:   '', 
                      active: false,
                      type:   'icon'
                    },
                    {
                      title:  'Search Samples',
                      state:  'app.queryBuilder.disease' ,   
                      icon:   '', 
                      active: false,
                      type:   'icon'
                    },
                    {
                      title:  'Add Samples',  
                      state:  'app.queryBuilder.disease' ,   
                      icon:   '', 
                      active: false ,
                      type:   'icon'
                    }
                   ];

                   let reviewIndicator = {
                            title:  'Review Query',  
                            state:  'app.queryBuilder.disease' ,   
                            icon:   '', 
                            active: false,
                            type:   'button'
                          };

                    let _showReviewIndicator = () =>{
                      let reviewIndicatorAdded = _.findWhere(vm.progressIndicators, {title: reviewIndicator.title}) != undefined;
                      if((vm.mutationsSet.length && vm.diseaseSet.length) && !reviewIndicatorAdded) vm.progressIndicators.push(reviewIndicator);
                    }

                    let _removeReviewIndicator = ()=>{
                      
                       let reviewIndicatorIndex =  _.findIndex(vm.progressIndicators,  reviewIndicator);

                       if((!vm.mutationList.length || !vm.diseaseList.length) && reviewIndicatorIndex >= 0 ){
                        vm.progressIndicators = [
                          ...vm.progressIndicators.slice(0, reviewIndicatorIndex)
                        ];
                       } 
                    };
                    

                   vm.currentState = ()=>$state.current.name.split('.')[2];

                   // vm.searchResults = [];


                   ProgressIndicatorBarService
                      .get('queryBuilderProgress')
                      .then(data=>{
                        vm.progressBar = data;
                      });
                      
                    
                    



                 

                   /* =======================================================================
                      querySets: list operations
                    ========================================================================== */

                    /**
                     * @param  {Object} queryParam - mutation or DiseaseModel   
                     * @return {Array} of objects 
                     */
                   // vm._removeParamFromSerachResults = queryParam=>{  
                   //      let selectedResult = _.assign({}, queryParam),
                   //          _searchResults = _.assign([], vm.searchResults),
                   //          resultsIndex =  _.indexOf(_.pluck(_searchResults,'_id'),  selectedResult._id);

                   //      // remove item of search resutls
                   //      _searchResults = [
                   //        ..._searchResults.slice(0, resultsIndex), 
                   //        ..._searchResults.slice(resultsIndex + 1)
                   //      ];

                   //      vm.searchResults = _searchResults;
                   //      return vm.searchResults;
                   //  };


                  // clear the querySet 
                  vm._clearSet = (set)=>{ this[`${set}List`] = []; };

                  // checks if set has been sorted by given params
                  vm.setIsSorted = (list, sortedList, sortedOn)=>{
                      return _.isEqual(
                                  _.pluck(list, sortedOn),
                                  _.pluck(sortedList, sortedOn),
                              );
                  };

                  // sort list on given param 
                  vm.sortSetOn = (list, sortOn)=>{
                    let sortedList = _.sortBy(list, sortOn);
                    return (vm.setIsSorted(list, sortedList, sortOn) ? list.reverse() : sortedList);
                  };
            
                  

                /* =======================================================================
                  querySetMutations: Event Handlers 
                  events are namspaced into "component:action:item"
                ========================================================================== */
                /**
                 * @param  {Object} queryParam - mutation or DiseaseModel   
                 * @return {Array | false} Array of objects if queryParam is added, 
                 *                         false if it already exists in set
                 */
                vm.addParamToQuery = queryParamData=>{
                  let paramSet        = _.assign([], vm[`${vm.currentState()}Set`]),
                      queryParam      = queryParamData,
                      queryParamInSet = _.findWhere(paramSet, queryParam);

                    $log.log(`:${vm.currentState()}Set`);

                    if(queryParamInSet == undefined){
                      paramSet.push(queryParam);
                      vm[`${vm.currentState()}Set`] = paramSet;

                      // if(vm.diseaseSet.length) vm._updateDieseasListingsCounts();
                      // vm.progressBar.advance();
                      
                      return vm[`${vm.currentState()}Set`];
                    }

                    return false;
                };

                


                // $rootScope.$on('mutationSet:add', (e,mutation)=>{
                //     vm.mutationsSet.push(mutation);      
                //     vm._removeParamFromSerachResults({result: mutation, set:vm.mutationsSet, param: '_id'});
                //     vm.progressBar.advance();

                //     if(vm.diseaseSet.length) vm._updateDieseasListingsCounts();
                // });


                $rootScope.$on('mutationSet:clear', ()=>{ 
                  vm._clearSet('mutation'); 
                  _removeReviewIndicator();
                });


                $rootScope.$on('mutationSet:remove:mutation', (e, mutation)=>{
                    let mutationIndex = _.indexOf(_.pluck(vm.mutationsSet, 'entrezgene'), mutation.entrezgene);
                    vm.mutationsSet.splice(mutationIndex, 1);
                    if(vm.diseaseSet.length) vm._updateDieseasListingsCounts();
                    _removeReviewIndicator();
                });


                $rootScope.$on('mutationSet:sort', (e, data)=>{
                    vm.mutationsSet = vm.sortSetOn(vm.mutationsSet, data.sortOn );
                });


                /* =======================================================================
                  querySetDiseaseType: Event Handlers 
                  events are namspaced into "component:action:item"
                ========================================================================== */
                $rootScope.$on('diseaseSet:clear', ()=>{ vm._clearSet('disease'); });

               
                $rootScope.$on('diseaseSet:sort', (e, data)=>{
                    vm.diseaseSet = vm.sortSetOn(vm.diseaseSet, data.sortOn );
                });

                $rootScope.$on('diseaseSet:remove:disease', (e, disease)=>{
                    let dIndex = _.indexOf(_.pluck(vm.diseaseSet, 'acronym'), disease.name);
                    vm.diseaseSet.splice(dIndex, 1);

                     _removeReviewIndicator();
                });


                // update the positives and negatives count 
                // for each disease listing 
                vm._updateDieseasListingsCounts = ()=>{
                    vm.diseaseSet.map(diseaseModel=>{
                        diseaseModel.mutationsLoading = true;

                        // mock server delay 
                        $timeout(()=>{
                          diseaseModel.getAggregates(vm.mutationsSet)
                                    .then(function() {
                                      diseaseModel.mutationsLoading = false;
                                    });
                        }, 250);//END $timeout

                    });//END vm.diseaseSet.map

                }//END vm._updateDieseasListingsCounts 


                
            }]
}

export default {
	name: 'queryBuilder',
	obj:  QueryBuilderComponent
};
