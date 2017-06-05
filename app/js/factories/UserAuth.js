function UserAuth(UserResourceService, $sessionStorage,$log) {
  'ngInject';

    $log = $log.getInstance('UserAuth', true);
  	$log.log('');


  // The public API of the service
  const Factory = {

    

    // Get the first reason for needing a login
    // getLoginReason: function() {
    //   return queue.retryReason();
    // },


    // Attempt to authenticate a user by the given userId
    login: function(userId) {

    	return new Promise((resolve)=>{
    		UserResourceService.get({userId}, function(response){
      			Factory.currentUser = response.user;
      		  	if ( Factory.isAuthenticated() ) {
      		  		$sessionStorage.cognomaUser = Factory.currentUser;
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

    // Ask the backend to see if a user is already authenticated - this may be from a previous session.
    requestCurrentUser: function() {
    	return new Promise((resolve)=>{

    		if(!$sessionStorage.cognomaUser){
    			
    			UserResourceService.save({},response=>{
    				Factory.currentUser = response.user;

    				$log.log(`created new user: ${Factory.currentUser.name}`);

    				Factory
    					.login(response.user.id)
    					.then(newUser=>resolve(newUser));
    				
    			});

    		}else{
    			$log.log('auto-login');
    			Factory
    				.login($sessionStorage.cognomaUser.id)
    				.then(user=>resolve(user));
    		}

    		

    	});
    	
      // if ( Factory.isAuthenticated() ) {
      //   return $q.when(service.currentUser);
      // } else {
      //   return $http.get('/current-user').then(function(response) {
      //     Factory.currentUser = response.data.user;
      //     return Factory.currentUser;
      //   });
      // }
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
