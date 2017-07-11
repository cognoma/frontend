function QueryBuilderService( $resource, AppSettings, NotificationService) {
  'ngInject';

  const QUERY_ENDPOINT = `${AppSettings.api.baseUrl}${AppSettings.api.classifiers}/`;

  const service = {
    submitQuery: function(diseases = [], genes =[], user){
        
      let queryResource = $resource(QUERY_ENDPOINT, {}, {
                submit: {
                  method: 'POST',
                  headers: {
                    Authorization: `Bearer ${user.random_slugs[0]}`,
                  }
                }
              });


        // Check to make sure we have at least 1 gene and 1 disease
          if(diseases.length > 0 && genes.length > 0) {
              // parse diseases for just their acronyms
              diseases = diseases.map(diseaseObj =>diseaseObj['acronym']);
              // parse genes for just their entrezgene
              genes = genes.map(gene=>gene['entrezgene']);

              // Submit our query
              queryResource
                .submit({diseases, genes})
                .$promise.then(res=>{
                  console.log(res);
                }, err=>{
                  console.log(err);
                });
                    
          } else {
            NotificationService.notify({
                type:    'error',
                message: 'You must select at least 1 disease and 1 gene.'
            });
          }
    }
  };

  return service;

}

export default {
  name: 'QueryBuilderService',
  fn: QueryBuilderService
};
