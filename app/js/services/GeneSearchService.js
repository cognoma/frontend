function GeneSearchService($http) {
  'ngInject';

  const service = {};

  service.get = function() {

    return new Promise((resolve, reject) => {
      $http.get('https://mygene.info/v3/query?q=super&species=human&entrezonly=true')
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
