function NotificationService($window, $log, growl) {
  'ngInject';
  $log = $log.getInstance('NotificationService', true);
  $log.log('');

  const service = {
    enabled: true, 
    disable:()=>{  service.enabled = false; },
  	notify:function(args){
      
      let settings = angular.extend({}, {show:true, config:{}},args);
  		if(service.enabled && settings.show) growl[settings.type](settings.message, settings.config);

    }
  };
  
  
  
  return service;

}

export default {
  name: 'NotificationService',
  fn: 	NotificationService
};
