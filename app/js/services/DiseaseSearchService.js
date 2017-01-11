function DiseaseSearchService($q, DiseaseResource) {
  'ngInject';

  const service = {};
  // TODO:
  // - Migrate: DiseaseResourceFactory logic to pull in all from  /diseases/
  // - Transform: each result into a Disease Model 
  // - GET: disease samples total:  /samples?limit=1&disease=<disease acronym>
  // - - response: count 
  // - Build: mutationList_params: query string parameter "mutations__gene=<entrezid>" from mutationList
  // - GET Positives: for each disease result /samples?limit=1&disease=<disease acronym>&mutationList_params
  // - - response: count 
  // - Calculate" disease_negativces: samples_total - disease_positives
  
  service.get = function(searchQuery, mutationList = null) {
  
    return new Promise((resolve, reject) => {

      return DiseaseResource
              .query(mutationList)
              .then(
                  // sucess
                  results => { 
                    // return and resolve once all 
                    // genes are poupulate from thier promises
                    return $q.all(results.data.results)
                             .then( data=>{
                                let response = {
                                  count: data.length,
                                  results: data
                                };
                                resolve(response)
                            } )
                  },
                  // error
                  (err, status)=>reject(err, status)
          );
    });


  };

  return service;

}

export default {
  name: 'DiseaseSearchService',
  fn:   DiseaseSearchService
};
