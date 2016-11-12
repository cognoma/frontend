function GeneSearchService($http) {
  'ngInject';

  const service = {};

  service.get = function(geneQuery) {

    return new Promise((resolve, reject) => {
      console.log(`https://mygene.info/v3/query?q=${geneQuery}&suggest_from=symbol^2,alias&species=human&entrezonly=true`);
      $http.get(`https://mygene.info/v3/query?q=${geneQuery}&suggest_from=symbol^2,alias&species=human&entrezonly=true`)
           .success((data) => {
             resolve(data);
           })
           .error((err, status) => {
             reject(err, status);
           });
    });

  };

  return service;

}

export default {
  name: 'GeneSearchService',
  fn: GeneSearchService
};
