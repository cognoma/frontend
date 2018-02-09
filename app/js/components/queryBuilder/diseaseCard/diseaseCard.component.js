const template = require('./diseaseCard.tpl.html');

const DiseaseCardComponent = {
    template,
    bindings: {
      item: '='
    },
    controller: ['$log',function($log) {
            'ngInject';
             $log = $log.getInstance('DiseaseCardComponent', false);
             $log.log(`${this.id}`);
              
        }]
}

export default {
	name: 'diseaseCard',
	obj: DiseaseCardComponent
};
