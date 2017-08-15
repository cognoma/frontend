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
    login: function(userSlug = null) {
      $log.log(`login:: userSlug=${userSlug}`);

    	return new Promise((resolve)=>{
          
        if(userSlug || this._getUserFromStorage()){
          this._authenticateUser(userSlug)
            .catch(error => {
              $log.log(`login:: login failed with slug ${userSlug}, creating new user`);
              this._createNewUser()
                .then(newUser=>{
                  Factory.currentUser = newUser;
                  $log.log(`login:: created new user and logged in as: ${Factory.currentUser.name}`);
                  // return newly created user
                  resolve(Factory.currentUser);
                });
            })
            .then(authedCookieUser=>{
              resolve(authedCookieUser);
            });

        } else {
          this._createNewUser()
                  .then(newUser=>{
                      Factory.currentUser = newUser;
                      $log.log(`login::created new user and logged in as: ${Factory.currentUser.name}`);
                      // return newly created user
                      resolve(Factory.currentUser);  
                  });
        }

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


    _createNewUser:()=>{
      return new Promise((resolve)=>{
        UserResourceService.save({},newUserFromDB=>{ 
            let newUserObj = Factory._setDefaultUserName(newUserFromDB);
            Factory._saveUserToStorage(newUserObj);
            resolve(newUserObj);
        }); 
      });
    },


    _authenticateUser:(userSlug = null)=>{
      let userCookie = Factory._getUserFromStorage();
      
      return new Promise((resolve, reject)=>{

          UserResourceService.get({userSlug: userSlug ? userSlug : userCookie.random_slugs[0] }, function(response){
            Factory.currentUser =  Factory._setDefaultUserName(response);
            
            if ( Factory.isAuthenticated() ) {
                $log.log(`logged in as user: ${Factory.currentUser.name}`);
                resolve(Factory.currentUser);
            }

          }, function(error){
            reject(error)
          });

      });
    },
    

    // Information about the current user
    currentUser: null,

    // Is the current user authenticated?
    isAuthenticated: function(){
      return !!Factory.currentUser;
    },
    
    // Is the current user an administrator?
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
