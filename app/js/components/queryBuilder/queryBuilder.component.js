const template = require('./queryBuilder.tpl.html');

const QueryBuilderComponent = {
    template,
    bindings: {
      'mutationsSet': '=',
      'diseaseSet':   '=',
    },
    controller: ['$scope',
                 '$rootScope',
                 '_',
                 'DiseaseModel',
                 '$state',
                 '$timeout',
                 'MutationsService',
                 'DiseaseService',
                 'ProgressIndicatorBarService',
                 '$log',
                 function(
                    $scope, 
                    $rootScope, 
                    _, 
                    DiseaseModel, 
                    $state,
                    $timeout, 
                    MutationsService, 
                    DiseaseService, 
                    ProgressIndicatorBarService, 
                    $log
                    ) {

            	     'ngInject';

                   let vm = this;
                  
                    

                   $log = $log.getInstance('QueryBuilderComponent', true);
                   $log.log('');
                   vm.currentState = ()=>$state.current.name.split('.')[2];
                   const progessStateName = vm.currentState() == 'mutations' ? 'genes' : 'samples';

                   vm.$onInit = ()=>{
                      
                        
                        // get the progress bar controller 
                        // and attach it to the local scope
                        ProgressIndicatorBarService
                            .get('queryBuilderProgress')
                            .then(progressBarInstance=>{ 
                              vm.progressBar = progressBarInstance;
                              vm.progressBar.goTo(`Search ${progessStateName}`);
                            });

                   }

                   

                    

                    /* =======================================================================
                      Progress Indicator Bar 
                    ========================================================================== */

                   // define the steps for the query builder 
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

                        // define the 'Review Query' button to be added  
                        let reviewIndicator = {
                             title:  'Review Query',  
                             state:  'app.queryBuilder.disease' ,   
                             icon:   '', 
                             active: false,
                             type:   'button'
                         };


                   
                    /**
                     * Add the "Review Query" Button to the Progress Bar 
                     * if it's not already added 
                     */
                    let _showReviewIndicator = () =>{
                      let reviewIndicatorAdded = _.findWhere(vm.progressIndicators, {title: reviewIndicator.title}) != undefined;
                      if((vm.mutationsSet.length && vm.diseaseSet.length) && !reviewIndicatorAdded){
                        vm.progressIndicators.push(reviewIndicator);
                        vm.progressBar.goTo(reviewIndicator, false);
                      } 
                    }




                    /**
                     * Remove the "Review Query" button from the progress bar 
                     */
                    let _removeReviewIndicator = ()=>{
                      
                       let reviewIndicatorIndex =  _.findIndex(vm.progressIndicators,  reviewIndicator);

                       if((!vm.mutationsSet.length || !vm.diseaseSet.length) && reviewIndicatorIndex >= 0 ){
                        vm.progressIndicators = [
                          ...vm.progressIndicators.slice(0, reviewIndicatorIndex)
                        ];
                       } 
                    };
                    

                   

                   /* =======================================================================
                      querySets: list operations
                    ========================================================================== */

                  /**
                   * @param  {String} setType - type of query set to manipulate 
                   * 
                   * @return {Void}
                   */
                    vm.clearSet =setType=>{
                        
                        _removeReviewIndicator();
                        return vm[`${setType.setType}Set`] = [];
                    }

                  
                  /**
                   * Checks if set has been sorted by given params
                   * @param  {Array}
                   * @param  {Array}
                   * @param  {String}
                   * 
                   * @return {Boolean}
                   */
                  let _setIsSorted = (list, sortedList, sortedOn)=>{
                      return _.isEqual(
                                  _.pluck(list, sortedOn),
                                  _.pluck(sortedList, sortedOn),
                              );
                  };

                  
                  /**
                   * Sort a set given property
                   * if set is already sorted returns a reversed sorted set 
                   * if is NOT already sorted returns a sorted set 
                   * 
                   * @param  {Object} sortParams 
                   *             |- {String} set - type of query set to manipulate
                   *             |- {String} sortOn - the property to sort the array by 
                   *             
                   * @return {Array} - array of objects sorted by specified property  
                   */
                  vm.sortSetOn = (sortParams)=>{

                    let list       = _.assign([], vm[`${sortParams.set}Set`]);
                    let sortOn     = sortParams.sortOn;
                    let sortedList = _.sortBy(list, sortOn);

                    vm[`${sortParams.set}Set`] = (_setIsSorted(list, sortedList, sortOn) ? list.reverse() : sortedList);
                    return (_setIsSorted(list, sortedList, sortOn) ? list.reverse() : sortedList);
                  };
            
                  


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

                      vm._updateDieseasListingsCounts();

                      if(vm[`${vm.currentState()}Set`].length > 3) vm.progressBar.advance(false);
                      _showReviewIndicator();

                      return vm[`${vm.currentState()}Set`];
                    }

                    return false;
                };




                /**
                 * @param  {Obejct} paramData 
                 *              | - {String} paramType - type of query set to manipulate 
                 *              | - {String | Number} id - specific identifier for item to remove from query set 
                 *              | - {String} paramRef - property of object to search the query set by, should be the property type of the id 
                 *              
                 * @return {Array} - return the new array for testing 
                 */
                vm.removeParamFromQuery = (paramData)=>{
                    $log.log(`removeParamFromQuery:${paramData.paramType} - ${paramData.id} ref by ${paramData.paramRef}`); 
                    let currentSet = _.assign([],vm[`${paramData.paramType}Set`]);

                    let setIndex = _.indexOf(_.pluck(currentSet, paramData.paramRef), paramData.id);
                    $log.log(`removeParamFromQuery:setIndex:${setIndex}`);

                    currentSet = [
                      ...currentSet.slice(0, setIndex), 
                      ...currentSet.slice(setIndex + 1)
                    ];


                    vm[`${paramData.paramType}Set`] = currentSet;

                     vm._updateDieseasListingsCounts();
                    _removeReviewIndicator();

                    return vm[`${paramData.paramType}Set`];
                }





    
                /**
                 * Update the positives and negatives count for each disease listing 
                 * using the DiseaseModel to calculate a new set of aggregate values
                 * based on the current user selected query param. sets
                 * 
                 * @return {Void}
                 */
                vm._updateDieseasListingsCounts = ()=>{

                    if(vm.diseaseSet.length){

                        vm.diseaseSet.map(diseaseModel=>{
                            diseaseModel.mutationsLoading = true;

                            diseaseModel
                                .getAggregates(vm.mutationsSet)
                                .then(function() {
                                    diseaseModel.mutationsLoading = false;
                                });
                        
                        });//END vm.diseaseSet.map

                    }//end if
                    
                }//_updateDieseasListingsCounts


                
            }]
}

export default {
	name: 'queryBuilder',
	obj:  QueryBuilderComponent
};
