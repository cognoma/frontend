function QueryBuilderService( $resource, $http, AppSettings, NotificationService) {
  'ngInject';

  const QUERY_ENDPOINT = `${AppSettings.api.baseUrl}${AppSettings.api.classifiers}/`;
  let USER_ENDPOINT = (slug) => `${AppSettings.api.baseUrl}${AppSettings.api.users}/${slug}/`;
  const IGNORE_EXISTING_EMAIL = true

  const service = {
    submitQuery: function(diseases = [], genes =[], user){
      if (user === null || user === undefined) {
        NotificationService.notify({
          type:    'error',
          message: `User is null or undefined.`
        });
        return
      } else if (user.random_slugs === null || user.random_slugs === undefined) {
        NotificationService.notify({
          type:    'error',
          message: `random_slugs is null or undefined.`
        });
        return
      } else if (user.random_slugs.length < 1) {
        NotificationService.notify({
          type:    'error',
          message: `random_slugs is empty.`
        });
        return
      }

      let queryResource = $resource(QUERY_ENDPOINT, {}, {
                submit: {
                  method: 'POST',
                  headers: {
                    'Authorization': `Bearer ${user.random_slugs[0]}`,
                  }
                }
              });

      function validateClassifier() {
        // Check to make sure we have at least 1 gene, 1 disease, 20 positive samples and 20 negative samples
        if(diseases.length > 0 && genes.length > 0 && number_positives > 20 && number_negatives > 20){
          return true
        } else {
          NotificationService.notify({
            type:    'error',
            message: 'You must select at least 1 disease and 1 gene; and the query must have at least 20 positive and 20 negative samples'
          });
        }
      }

      function submitClassifier() {
        // parse diseases for just their acronyms
        diseases = diseases.map(diseaseObj =>diseaseObj['acronym']);
        // parse genes for just their entrezgene
        genes = genes.map(gene=>gene['entrezgene']);

        // Submit our query
        queryResource
          .submit({diseases, genes})
          .$promise.then(res=>{

          NotificationService.notify({
            type:    'success',
            message: `<span class="glyphicon glyphicon-ok" aria-hidden="true"></span> Classifier #${res.id} submitted!
                <div class="btn-group" style="float:right;" role="group" >
                    <button type="button" class="btn btn-default">Review Submission</button>
                    <button type="button" class="btn btn-default">View My Classifiers</button>
                    <button type="button" class="btn btn-default">Create New Classifier</button>
                </div>`,
            config:{ ttl: -1  } // stay open until users closes

          });

        }, error => {
          console.log(error);
          NotificationService.notify({
            type:    'error',
            message: `Failed to submit classifier. Error: ${error}`
          });
        });

      }

      function getEmail(){
        if (user.email === null || user.email === undefined || IGNORE_EXISTING_EMAIL) {
          // update email
          let email = prompt("Enter your email address to receive your classifier:")

          function validateEmail(email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
          }

          if (validateEmail(email)) {
            // validation succeeded
            $http({
              method: 'PUT',
              url: USER_ENDPOINT(user.random_slugs[0]),
              headers: {
                'Authorization': `Bearer ${user.random_slugs[0]}`
              },
              data: {
                'email': email
              }
            }).then(function successCallback(response) {
              NotificationService.notify({
                type:    'success',
                message: `<span class="glyphicon glyphicon-ok" aria-hidden="true"></span> Email updated!`,
                config:{ ttl: -1  } // stay open until users closes
              });
              submitClassifier()
            }, function errorCallback(error) {
              console.log(error);
              NotificationService.notify({
                type:    'error',
                message: `Failed to update email.`
              });
            });
          } else {
            // validation failed
            NotificationService.notify({
              type:    'error',
              message: 'Please enter a valid email address.'
            });
          }
        } else {
          submitClassifier()
        }
      }

      if(validateClassifier()){
        getEmail()
      }
    }
  };

  return service;

}

export default {
  name: 'QueryBuilderService',
  fn: QueryBuilderService
};
