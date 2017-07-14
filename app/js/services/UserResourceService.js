function UserResourceService($resource, AppSettings, $log) {
  'ngInject';
  $log = $log.getInstance('UserResourceService', true);
  $log.log('');

  const USER_ENDPOINT = `${AppSettings.api.baseUrl}${AppSettings.api.users}`;
  
  let USER  = $resource(`${USER_ENDPOINT}/:userId:userSlug`,{userId:'@id',userSlug:'@slug'},{});

  return USER;

}

export default {
  name: 'UserResourceService',
  fn: UserResourceService
};
