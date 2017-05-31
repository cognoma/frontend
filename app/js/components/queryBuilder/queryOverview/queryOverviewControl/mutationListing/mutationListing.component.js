const template = require('./mutationListing.tpl.html');

const mutationListingComponent = {
    template,
    
    bindings: {
        'symbol':        '<',
        'entrezgene':    '<',
        'onRemoveParam': '&'
    },
    controller: ['$rootScope','$log',function($rootScope, $log){
            'ngInject';
             
             const vm = this;

             vm.$onInit = ()=>{
                $log = $log.getInstance('mutationListingComponent', true);
                $log.log(`${this.symbol}:`);   
             }
             

        }]
}

export default {
	name: 'mutationListing',
	obj: mutationListingComponent
};
