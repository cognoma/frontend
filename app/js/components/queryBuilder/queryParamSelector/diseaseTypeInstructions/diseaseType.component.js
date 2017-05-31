const template = require('./diseaseType_instructions.tpl.html');

const DiseaseTypeInstructionsComponent = {
    template,
    bindings:{},
    controller: ['$log',

        function( $log) {
        	'ngInject';
            $log = $log.getInstance('DiseaseTypeInstructionsComponent', true);
            $log.log('');

            // const vm = this;
        	
        }]
}

export default {
	name: 'diseaseTypeInstructions',
	obj:  DiseaseTypeInstructionsComponent
};