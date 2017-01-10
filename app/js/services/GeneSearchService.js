function GeneSearchService($q, GenesResource) {
  'ngInject';

  const service = {};
  
  
  service.get = function(geneQuery) {
  
  
    return new Promise((resolve, reject) => {

      return GenesResource
              .get(geneQuery)
              .then(
                  // sucess
                  results => { 
                    // return and resolve once all 
                    // genes are poupulate from thier promises
                    return $q.all(results.data.hits)
                             .then( data=>{
                                results.data.hits = data;
                                resolve(results);
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
  name: 'GeneSearchService',
  fn:   GeneSearchService
};
