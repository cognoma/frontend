function DiseaseService_Interceptor($q, $log, AppSettings) {
  'ngInject';

  $log = $log.getInstance('DiseaseService_Interceptor', true);
  $log.log('');

  const Interceptor = {};
  const endpoint = AppSettings.api.diseases;
 
  Interceptor.request = function(config) {
    if( config.url.includes(`${AppSettings.api.base}`) ) config.headers.AccessControlAllowOrigin ='*';
    console.log(config);
    var deferred = $q.defer();
    deferred.resolve();
    return deferred.promise;
  };


  return Interceptor;


}

export default {
  name: 'DiseaseService_Interceptor',
  fn: DiseaseService_Interceptor
};
