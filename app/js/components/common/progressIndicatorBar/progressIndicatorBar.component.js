const template = require('./progressIndicatorBar.tpl.html');

const progressIndicatorBarComponent = {
    template,
    bindings: {
        'steps':'=',
        'foo': '='
    },
    controller: ['$log',
                 '$rootScope',
                 '_',
                 '$state',
                 '$timeout',
                 function ($log, $rootScope, _, $state, $timeout) {

            'ngInject';
            $log = $log.getInstance('progressIndicatorBarComponent', true);
            $log.log('');

            let vm = this;

            const TOTAL_LINE_WIDTH = () =>(100 / vm.steps.length);
            
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
                $state.go(nextStep.state);
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
                // change state to selectedStep state 
                $state.go(selectedStep.state);
                // return the selected step object 
                return selectedStep;
            };

            // update progress bar when state is change from other navigation
            $rootScope.$on('$stateChangeSuccess', (event, toState, toParams, fromState, fromParams) => {
                let stateSteps = _.where(vm.steps, {state: toState.name});
            });




    }]
};




export default {
	name: 'progressIndicatorBar',
	obj: progressIndicatorBarComponent
};
