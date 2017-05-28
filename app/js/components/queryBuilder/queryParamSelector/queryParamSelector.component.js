const template = require('./queryParamSelector.tpl.html');

const QueryParamSelectorComponent = {
    template,
    bindings:    {
        'onParamSelect': '&',
        'mutationsSet':  '<',
        'diseaseSet':    '<',
    },
    controller: [
                '$rootScope',
                '$scope',
                '_',
                '$state',
                '$log',
                'MutationsService',
                'DiseaseService',
                '$filter',
        function(
            $rootScope, 
            $scope, 
            _, 
            $state, 
            $log,
            MutationsService,
            DiseaseService,
            $filter
            ) {

        	'ngInject';


            $log = $log.getInstance('QueryParamSelectorComponent', true);
            $log.log('');

            const vm = this;

            vm.currentState = () => $state.current.name.split('.')[2];

            vm.$onInit = ()=>{
                vm.searchResults =[];
                vm.searchQuery='';
                vm.isSearching = false;
            }


            /**
             * Filter our results so we don't return what's already added to the query
             * @param  {Array} rawSearchResults - array of objects returned from search
             * 
             * @return {Array} array of results filted by the current state state from the query
             */
            let _filteredSearchResutls = rawSearchResults =>{
                
                let comparator = vm.currentState() == 'mutations' ? '_id' : 'acronym';
                return $filter('notInArrayFilter')(rawSearchResults, vm[`${vm.currentState()}Set`], comparator); 
            }   

            /** @todo : make angular search service to abstract search functionality */
            //matches our search services to state definitions 
            const searchServices = {
                'mutations': MutationsService,
                'disease':   DiseaseService
            };

            /**
             * Query parameter search functionality, delegates searching and 
             * result transformation to angular services.
             * Returned restuls get filtered and bound to the local scope
             *  
             * @param  {String} serachQuery - user input search string
             * @return {Void}
             */
            vm.onInputChange = searchQuery=>{
                $log.info(`query: ${searchQuery}`);
                
                vm.isSearching = true;

                if(searchQuery.length == 0 ){
                    vm.searchResults = [];
                    vm.isSearching = false;
                }else{

                    // pass along the user input query and selected mutations list 
                    // to the appropriate service 
                    searchServices[vm.currentState()]
                          .query(searchQuery, {source: 'DB'}, vm.mutationsSet)
                          .then(response=>{
                            console.log(response);
                                $scope.$apply(()=>{
                                    if(response.length) vm.searchResults = _filteredSearchResutls(response);
                                    vm.isSearching = false;
                                });
                            
                          });//END searchServices[vm.currentState()]

                }
                      
                        
            };///END vm.onInputChange


        	
            // vm.instructionsTemplate = `queryBuilder/queryParamSelector/${vm.currentState()}_instructions.tpl.html`;
            
            /**
            * @param  {Object} queryParam - mutation or DiseaseModel   
            * @return {Array} of objects 
            */
            vm.removeParamFromSerachResults = queryParam=>{  
                
                let selectedResult = _.assign({}, queryParam),
                    _searchResults = _.assign([], vm.searchResults),
                    resultsIndex =  null;

                switch(vm.currentState()){
                    case 'mutations':
                        resultsIndex =  _.indexOf(_.pluck(_searchResults,'_id'),  selectedResult._id);
                    break;

                    case 'disease':
                        resultsIndex =  _.indexOf(_.pluck(_searchResults,'acronym'),  selectedResult.acronym);
                    break;
                }
    

                // remove item of search resutls
                _searchResults = [
                  ..._searchResults.slice(0, resultsIndex), 
                  ..._searchResults.slice(resultsIndex + 1)
                ];


                vm.searchResults = _searchResults;
                return vm.searchResults;
            };
            

            /** @depricated 
            // checks if set has been sorted by given params
            // let isSorted = (list, sortedList, sortedOn)=>{
            //     return _.isEqual(
            //                 _.pluck(list, sortedOn),
            //                 _.pluck(sortedList, sortedOn),
            //             );
            // };

           
            
            /**
             * @param  {Array} list- array of objects to sort  
             * @param  {String} sortOn - object key to sort on 
             * 
             * @return {Array} 
             */
            vm.sortResultsBy = (list, sortOn)=>{
                vm.searchResults = sortedResutlsBy(list, sortOn);
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
                let sortedList = _.sortBy(results, sortOn).reverse();//reverse it to make it a descending list
                
                return sortedList;
                // return (isSorted(results, sortedList, sortOn) ? results.reverse() : sortedList);
            };
            
        	
        }]
}

export default {
	name: 'queryParamSelector',
	obj:  QueryParamSelectorComponent
};