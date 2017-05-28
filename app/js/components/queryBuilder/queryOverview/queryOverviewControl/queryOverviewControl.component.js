const template = require('./queryOverviewControl.tpl.html');

const QueryOverviewControlComponent = {
    template,
    bindings: {   
    	'title':       '@',
        'setTitle':    '@',
        'desc':        '@',
        'listType':    '@',
        'paramList':   '<',
        'removeParam': '&'
    },
    controller: ['$rootScope','$state','$log',function ($rootScope, $state, $log) {
        'ngInject';

        $log = $log.getInstance('QueryOverviewControlComponent', true);
        $log.log('');
        
        let vm = this;

        this.$onInit = ()=>{
            vm.active = $state.current.name.includes(vm.listType);
        }

        // this.removeParam = (data)=>{console.log(data)};
        

        this.clearSet = ()=>$rootScope.$emit('mutationSet:clear');

        this.resetSearch = ()=>$rootScope.$emit('paramSearch:reset');


    }]
}

export default {
	name: 'queryOverviewControl',
	obj: QueryOverviewControlComponent
};
