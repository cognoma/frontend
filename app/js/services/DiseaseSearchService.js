function DiseaseSearchService($q, DiseaseResource) {
  'ngInject';

  const service = {};
  
  
  service.get = function(searchQuery) {
  
  
    return new Promise((resolve, reject) => {

      return DiseaseResource
              .get(searchQuery)
              .then(
                  // sucess
                  results => { 
                    // return and resolve once all 
                    // genes are poupulate from thier promises
                    console.log(results);
                    return $q.all(results.data)
                             .then( data=>resolve(data) )
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
