function UserResourceService($resource, AppSettings, $log) {
  'ngInject';
  $log = $log.getInstance('UserResourceService', true);
  $log.log('');

  const USER_ENDPOINT = `${AppSettings.api.baseUrl}${AppSettings.api.users}/slug`;

  return $resource(`${USER_ENDPOINT}/:userId:userSlug`,{userId:'@id',userSlug:'@slug'},{});

}

export default {
  name: 'UserResourceService',
  fn: UserResourceService
};
