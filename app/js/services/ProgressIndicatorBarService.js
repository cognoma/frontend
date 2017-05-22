function ProgressIndicatorBarService($log, _, $rootScope, $timeout) {
  'ngInject';

  $log = $log.getInstance('ProgressIndicatorBarService', true);
  $log.log('');

  const service = {};
  

  // $rootScope.$on('PIB:onInit', (e,data)=>{
  //   service.registerBar(data.pib);    
  // });

  service.instanceRegister = {};

  service.registerBar = (PIB_instance)=>{
      service.instanceRegister[`${PIB_instance.uid}`] = PIB_instance;
      $log.log(`registerBar:${service.instanceRegister[`${PIB_instance.uid}`].uid}`);
  };


  service.get = function(uid){
    return new Promise((resolve, reject) => {
      
        $timeout(function() {
          let inst = service.instanceRegister[uid];
          if(inst){
            resolve(service.instanceRegister[uid]);
          }else{
              reject(`ProgressIndicatorBar ${uid} not found in instanceRegister`);
          }
        }, 10);
      
    });
  }
  

  return service;

}

export default {
  name: 'ProgressIndicatorBarService',
  fn:   ProgressIndicatorBarService
};
