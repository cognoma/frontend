const template = require('./diseaseListing.tpl.html');

const diseaseListingComponent = {
    template,
    bindings: {
        name:        '@',
        positives:   '=',
        negatives:   '=',
        samples:     '=',
        'isLoading': '<'
    },
    controller: ['$rootScope','$log',function ($rootScope, $log) {
            'ngInject';
            $log = $log.getInstance('diseaseListingComponent', true);
            $log.log(`${this.name}:`);

            this.removeDisease = disease=>$rootScope.$emit('diseaseSet:remove:disease', disease);
        }]
}

export default {
	name: 'diseaseListing',
	obj: diseaseListingComponent
};
