const template = require('./mutations_instructions.tpl.html');

const MutationsInstructionsComponent = {
    template,
    bindings:{},
    controller: ['$log',

        function( $log) {
        	'ngInject';
            $log = $log.getInstance('MutationsInstructionsComponent', true);
            $log.log('');

            // const vm = this;
        	
        }]
}

export default {
	name: 'mutationsInstructions',
	obj:  MutationsInstructionsComponent
};