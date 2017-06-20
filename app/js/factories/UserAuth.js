function UserAuth(UserResourceService, $sessionStorage,$log) {
  'ngInject';

    $log = $log.getInstance('UserAuth', true);
  	$log.log('');

  let $storage = $sessionStorage;

  // The public API of the service
  const Factory = {

    

    // Get the first reason for needing a login
    // getLoginReason: function() {
    //   return queue.retryReason();
    // },


    // Attempt to authenticate a user by the given userId
    login: function(userId = null, userSlug = null) {
      $log.log(`login::userId=${userId} userSlug=${userSlug}`);

    	return new Promise((resolve)=>{

        if(userSlug){
          console.log(
            UserResourceService.getUserBySlug(userSlug)
          );
          // UserResourceService.getUserBySlug({userSlug}, data=>{
          //   console.log(data);
          //   resolve(data);
          // })
        }

    		UserResourceService.get({userId}, function(response){
          let user = response.user || response;
            
      			Factory.currentUser = Factory._setDefaultUserName(user);

      		  	if ( Factory.isAuthenticated() ) {
      		    	$log.log(`logged in as user: ${Factory.currentUser.name}`);
      		    	resolve(Factory.currentUser);
      		  }

      		});

    	});
      
    },

    // Give up trying to login and clear the retry queue
    // cancelLogin: function() {
    //   closeLoginDialog(false);
    //   redirect();
    // },

    // Logout the current user and redirect
    // logout: function(redirectTo) {
    //   $http.post('/logout').then(function() {
    //     service.currentUser = null;
    //     redirect(redirectTo);
    //   });
    // },

    _saveUserToStorage:(userObj)=>{
      $storage.cognomaUser =  userObj
      return $storage.cognomaUser;
    },

    // @todo: need to set Guest User as default in backend
    _setDefaultUserName:userObj=>{
      userObj.name = `Guser User ${userObj.id}`;
      return userObj;
    },
    
    // Ask the backend to see if a user is already authenticated - this may be from a previous session.
    requestCurrentUser: function() {
      $log.log('requestCurrentUser');

    	return new Promise((resolve)=>{

    		if(!$sessionStorage.cognomaUser){
    			// crate User in DB
    			UserResourceService.save({},response=>{  
            let user = response.user || response;
            
    				Factory.currentUser = Factory._setUserDefaultName(user);
            Factory._saveUserToStorage(Factory.currentUser);

    				$log.log(`created new user: ${Factory.currentUser.name}`);

    				Factory
    					.login(user.id)
    					.then(newUser=>{
                resolve(newUser)
              });
    				
    			});

    		}else{
    			$log.log('auto-login');
    			Factory
    				.login($sessionStorage.cognomaUser.id)
    				.then(user=>{resolve(user)});
    		}

    		

    	});
    	
      
    },

    // Information about the current user
    currentUser: null,

    // Is the current user authenticated?
    isAuthenticated: function(){
      return !!Factory.currentUser;
    },
    
    // Is the current user an adminstrator?
    isAdmin: function() {
      return !!(Factory.currentUser && Factory.currentUser.admin);
    }
  };

  return Factory;

}

export default {
  name: 'UserAuth',
  fn: UserAuth
};
