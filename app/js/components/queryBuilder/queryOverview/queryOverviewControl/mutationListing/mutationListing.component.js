const template = require('./mutationListing.tpl.html');

const mutationListingComponent = {
    template,
    bindings: {
        'symbol':     '@',
        'entrezgene': '<'
    },
    controller: ['$rootScope','$log',function($rootScope, $log){
            'ngInject';

             $log = $log.getInstance('mutationListingComponent', true);
             $log.log(`${this.symbol}:`);

            this.removeMutation = $id=>$rootScope.$emit('mutationSet:remove:mutation', {entrezgene: $id});

        }]
}

export default {
	name: 'mutationListing',
	obj: mutationListingComponent
};
