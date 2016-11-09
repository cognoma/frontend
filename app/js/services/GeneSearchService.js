function GeneSearchService($http) {
  'ngInject';

  const service = {};

  service.get = function(geneQuery) {

    return new Promise((resolve, reject) => {
      console.log(`https://mygene.info/v3/query?q=${geneQuery}`);
      $http.get(`https://mygene.info/v3/query?q=${geneQuery}`)
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
