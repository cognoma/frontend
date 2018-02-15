const template = require('./app.tpl.html');

const AppComponent = {
    template,
    bindings: {},
    controller: ['$rootScope','$log','UserAuth','NotificationService', function($rootScope, $log,UserAuth, NotificationService){
        'ngInject';
        $log = $log.getInstance('AppComponent', false);
        $log.log('');

        this.$onInit=()=>{

            UserAuth
            .login()
            .then(authenticatedUser=>{
                this.STATE.user = authenticatedUser;

                NotificationService.notify({
                    type:    'success',
                    message: `Logged in as <strong>${authenticatedUser.name}</strong>`,
                    isDismissable: true
                });
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