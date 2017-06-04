const template = require('./app.tpl.html');

const AppComponent = {
    template,
    bindings: {},
    controller: ['$rootScope','$log','UserAuth', function($rootScope, $log,UserAuth){
        'ngInject';
        $log = $log.getInstance('AppComponent', false);
        $log.log('');

        this.$onInit=()=>{
            UserAuth
                .requestCurrentUser()
                .then(authenticatedUser=>{
                    this.STATE.user = authenticatedUser;
                });

        }

        this.STATE ={
        	query:{
        		title:     '',
        		mutations: [],
        		diseases:  []
        	},
            user:{}
        };


   }]
}

export default {
	name: 'app',
	obj: AppComponent
};