const template = require('./queryOverview.tpl.html');

const QueryOverviewComponent = {
    template,
    bindings: {
        'removeParam':  '&',
    	'mutationsSet': '<',
    	'diseaseSet':   '<'
    },
    controller: ['$log',function ($log) {
            'ngInject';
            $log = $log.getInstance('QueryOverviewComponent', true);
            $log.log('');
            const vm = this;

            vm.$onInit = ()=>{
                console.log(this);
            }

            // vm.removeParam = (paramData)=>{
            //     console.log(paramData)
            // }
            
            
    }]
}

export default {
	name: 'queryOverview',
	obj: QueryOverviewComponent
};
