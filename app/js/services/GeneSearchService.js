function GeneSearchService($http, $httpParamSerializer, AppSettings, GenesResource) {
  'ngInject';

  const service = {};
  
  
  service.get = function(geneQuery) {
    
    //mygene.info query endpoint
    // let endpoint = `${AppSettings.api.geneSearch.base}${geneQuery}&${$httpParamSerializer(AppSettings.api.geneSearch.params)}`;

  
    return new Promise((resolve, reject) => {

      GenesResource
          .get({id: geneQuery}).$promise
          .then(
            results => { resolve(results); },
            (err, status) =>{ reject(err, status); }
          );

          
      // USE WITH endpoint 
      // $http.get(endpoint)
      //      .success((data) => {
      //        resolve(data);
      //      }).error((err, status) => {
      //        reject(err, status);
      //      });
           
      });


  };

  return service;

}

export default {
  name: 'GeneSearchService',
  fn:   GeneSearchService
};
