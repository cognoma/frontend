function DiseaseSearchService($q, DiseaseResource) {
  'ngInject';

  const service = {};
  
  
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
