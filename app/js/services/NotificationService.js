function NotificationService($window, $log, growl) {
  'ngInject';
  $log = $log.getInstance('NotificationService', true);
  $log.log('');

  const service = {
    enabled: true, 
    disable:()=>{  service.enabled = false; },
  	notify:function(args){
      
      angular.extend(args, {show:true, config:{}});

  		if(service.enabled && args.show) growl[args.type](args.message, args.config);

    }
  };
  
  
  
  return service;

}

export default {
  name: 'NotificationService',
  fn: 	NotificationService
};
