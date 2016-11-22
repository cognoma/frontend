const QueryParamSelectorComponent = {
    templateUrl: 'queryBuilder/queryParamSelector/queryParamSelector.tpl.html',
    bindings:    {
        'onChange':'&',
        'searchResults': '='
    },
	transclude: true,    
    controller: [
                    '$rootScope',
                    '$scope',
                    '_',
                    '$state',
        function($rootScope, $scope, _, $state) {
        	'ngInject';

            const vm = this;
            
            this.$onInit = ()=>{
                vm.searchResults =[];
                vm.searchQuery='';
            }

        	
            vm.currentState = ()=>$state.current.name.split('.')[2];

            vm.instructionsTemplate = `queryBuilder/queryParamSelector/${vm.currentState()}_instructions.tpl.html`;


            $rootScope.$on('paramSearch:reset', ()=>{
                vm.searchResults =[];
                vm.searchQuery='';
                document.querySelector('input').focus();
            });



        	this.addGene = gene=>$rootScope.$emit('mutationSet:add', gene);
        	

            this.addDisease = disease=>$rootScope.$emit('diseaseSet:add', disease);
            



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
                vm.searchResults = sortResultsOn(list, sortOn);
            }
            
        	
        }]
}

export default {
	name: 'queryParamSelector',
	obj:  QueryParamSelectorComponent
};