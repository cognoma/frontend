function NotificationService($window, $log) {
  'ngInject';
  $log = $log.getInstance('NotificationService', true);
  $log.log('');

  const service = {
  	notify:(message)=>{$window.alert(message)}
  };
  
  
  
  return service;

}

export default {
  name: 'NotificationService',
  fn: 	NotificationService
};
