const template = require('./progressIndicatorBar.tpl.html');

const progressIndicatorBarComponent = {
    template,
    bindings: {
        'steps':' = ',
        'uid': '@'
    },
    controller: ['$log',
                 '$rootScope',
                 '_',
                 '$state',
                 '$timeout',
                 '$sessionStorage',
                 function ($log, $rootScope, _, $state, $timeout, $sessionStorage) {

            'ngInject';
            $log = $log.getInstance('progressIndicatorBarComponent', true);
            $log.log('');

            
            let vm = this;


            const TOTAL_LINE_WIDTH = () =>(100 / vm.steps.length);
            // keep track of query navigation history
            let progressHistory = $sessionStorage.progressNavigationHistory = [];

            let componentHook = function(hookName, hookData){
                $rootScope.$emit(`PIB:${vm.uid}:${hookName}`, {pib:vm, hookData});
            }

            vm.$onInit=()=>{
                $log.log('$onInit');

                componentHook('onInit');
                let entryStep = _.findWhere(vm.steps, {state: $state.current.name});
                vm.goTo(_getLastHistoryStep(progressHistory, $state.current));
            }


            vm.lineWidth = ()=> {
                let reverseIdxs = _.range(vm.steps.length).reverse();
                return ( TOTAL_LINE_WIDTH() * (vm.steps.length - reverseIdxs[_currentActiveIdx() -1] ) );
            };
            

            vm.lineLeft = ()=> ( TOTAL_LINE_WIDTH() - ( TOTAL_LINE_WIDTH() / 2 ) );


            let _currentActiveIdx = ()=>_.lastIndexOf(_.pluck(vm.steps, 'active'), true);


            // takes the steps array and 
            // returns the current active step
            vm.currentStep = ()=>{
                // check each step for active state
                // return the object of the last active step
                return vm.steps[_currentActiveIdx()];
            };


            
            // sets the active state of the next inactive step
            // and returns that steps object 
            vm.advance =()=>{
                // check each step in the steps array for active state 
                // find the step with an index of +1 the current active state 
                let nextStep = vm.steps[_currentActiveIdx()+1];
                nextStep.active = true;
                progressHistory.push(nextStep);
                $state.go(nextStep.state);
                componentHook('advance', nextStep);
                return nextStep;
                // return the step object of step that was advanced to 
            };



            
            // takes the current active step and sets it to inactive 
            // returns the object of the newly active state 
            vm.goBack =()=>{
                // get current active step 
                let currentStep = vm.currentStep();
                // get step that has an index of -1 the current active (previous step)
                let previousStep =  vm.steps[_currentActiveIdx()-1];
                // set current active step to inactive
                currentStep.active = false;
                progressHistory.push(previousStep.state);
                componentHook('goback', {previousStep, currentStep});
                
                $state.go(previousStep.state);
                // return the newly active step 
                return previousStep;
            };




            vm.goTo = (selectedStep)=>{
                // get the index of the selcted step
                let selectedIdx =  _.indexOf(_.pluck(vm.steps, 'title'), selectedStep.title);
                // set all previous steps to active 
                for (var i = 0; i < selectedIdx; i++ ) { 
                    if(vm.steps[i] != undefined) vm.steps[i].active = true; 
                }
                // set all steps after selected step to inactive 
                let previousSteps = vm.steps.slice(selectedIdx+1);
                previousSteps.map(step=>{step.active = false;});

                selectedStep.active = true;

                progressHistory.push(selectedStep);
                componentHook('goTo', selectedStep);
                // change state to selectedStep state 
                $state.go(selectedStep.state );


                // return the selected step object 
                return selectedStep;
            };


            let _getLastHistoryStep = (progressHistory, toState)=>{
                let historySteps      = _.where(progressHistory, {state: toState.name});
                let lastStepInHistory = historySteps[historySteps.length-1];
                let firstStepinState  = _.findWhere(vm.steps, {state: toState.name});
                return ( lastStepInHistory ? lastStepInHistory: firstStepinState )
            }
            

            // update progress bar when state is change from other navigation
            $rootScope.$on('$stateChangeSuccess', (event, toState, toParams, fromState, fromParams) => {

                vm.goTo(_getLastHistoryStep(progressHistory, toState));
                
            });




    }]
};




export default {
	name: 'progressIndicatorBar',
	obj: progressIndicatorBarComponent
};
