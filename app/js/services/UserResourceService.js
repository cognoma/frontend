function UserResourceService($resource, AppSettings, $log) {
  'ngInject';
  $log = $log.getInstance('UserResourceService', true);
  $log.log('');

  const USER_ENDPOINT = `${AppSettings.api.baseUrl}${AppSettings.api.users}`;
  
  let USER  = $resource(`${USER_ENDPOINT}/:userId:userSlug`,{userId:'@id',userSlug:'@slug'},{});

  USER.getUserBySlug = userSlug=>{
  	$log.log(`getUserBySlug:${userSlug}`)
  	let _usr = $resource(`${USER_ENDPOINT}/:userSlug`,{userSlug:'@slug'},{
  					get:{
  						method:'GET',
  						headers:{
  							Authorization: `Bearer ${userSlug}`,
  							'Access-Control-Allow-Headers': '*'

  						}
  					}
  				});

  	return _usr.get({userSlug});
  };

  return USER;

}

export default {
  name: 'UserResourceService',
  fn: UserResourceService
};
