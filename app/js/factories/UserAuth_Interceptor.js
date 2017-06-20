function UserAuth_Interceptor($q, $log, AppSettings) {
  'ngInject';

  $log = $log.getInstance('UserAuth_Interceptor', true);
  $log.log('');

  const Interceptor = {};
  const endpoint = AppSettings.api.diseases;
 
  Interceptor.request = function(config) {
    if(config.method == 'GET' && config.url.includes('users')){
      console.log(config)
      // config.headers['Authorization'] = `Bearer ${config.params.user}`;
    } 
    // if( config.url.includes(`${AppSettings.api.base}`) ) config.headers.AccessControlAllowOrigin ='*';

    
    return config;
  };


  return Interceptor;

}


export default {
  name: 'UserAuth_Interceptor',
  fn:   UserAuth_Interceptor
};
