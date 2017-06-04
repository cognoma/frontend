function UserResourceService($resource, AppSettings, $log) {
  'ngInject';
  $log = $log.getInstance('UserAuthService', true);
  $log.log('');

  const USER_ENDPOINT = `${AppSettings.api.baseUrl}${AppSettings.api.users}`;
  
  let USER  = $resource(`${USER_ENDPOINT}/:userId`,{userId:'@id'},{});
  
  return USER;

}

export default {
  name: 'UserResourceService',
  fn: UserResourceService
};
