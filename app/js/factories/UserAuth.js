function UserAuth(UserResourceService, $cookies,$log) {
  'ngInject';

    $log = $log.getInstance('UserAuth', true);
  	$log.log('');

  let $storage = $cookies;
  let storageObjectKey = 'cognoma-user';

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
        /**
         * @tood: Setup getting a user by their slug
         */
        // if(userSlug){
          // UserResourceService.getUserBySlug({userSlug}, data=>{
          //   console.log(data);
          //   resolve(data);
          // })
        // }

    		UserResourceService.get({userId}, function(response){
          
            Factory.currentUser = response.user || response;
            

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
    
      $storage.putObject(storageObjectKey ,  userObj);
      return $storage.get(storageObjectKey);
    },

    _getUserFromStorage:()=>$storage.getObject(storageObjectKey),

    // @todo: need to set Guest User as default in backend
    _setDefaultUserName:userObj=>{
      userObj.name = `Guest User ${userObj.id}`;
      return userObj;
    },
    
    // Ask the backend to see if a user is already authenticated - this may be from a previous session.
    requestCurrentUser: function() {
      $log.log('requestCurrentUser');

    	return new Promise((resolve)=>{
      
    		if(!this._getUserFromStorage()){
    			// create User in DB
    			UserResourceService.save({},response=>{  
            let user = response.user || response;
            // set new user as current user and save to cookie
    				Factory.currentUser = Factory._setDefaultUserName(user);
            Factory._saveUserToStorage(Factory.currentUser);
          

    				$log.log(`created new user and logged in as: ${Factory.currentUser.name}`);
            // return newly created user
            resolve(this._getUserFromStorage());  

    				// Factory
    				// 	.login(user.id)
    				// 	.then(newUser=>{
        //         resolve(newUser)
        //       });
    				
    			});

    		}else{
    			$log.log('auto-login');
          resolve(this._getUserFromStorage());  

    			// Factory
    			// 	.login(this._getUserFromStorage().id)
    			// 	.then(user=>{resolve(user)});
          
    		}

    		

    	});
    	
      
    },

    // Information about the current user
    currentUser: null,
    getCurrentUser:()=>this.currentUser,

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
