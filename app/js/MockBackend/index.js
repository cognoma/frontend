import * as geneData from './mockData/genes.js';

function MockBackend($httpBackend, _) {
  'ngInject';
  
  // Query; returns all results.
  $httpBackend.whenGET('/genes').respond(geneData);

  // Get; return a list of genes by id .
  $httpBackend.whenGET(/\/genes\/(\w+)/, undefined, ['id']).respond(function(method, url, data, headers, params) {
    

    let geneList = _.filter(geneData.hits, gene=>{ 
      return gene.symbol.includes(params.id);
    });
    
    // console.log(geneList);
    let results = angular.extend({}, geneData, {hits: geneList, total: geneList.length});

    if (results.hits.length <= 0 ) {
      return [404, results, {}, `No Matches Found for symbol: ${params.id}`];
    }
    
    return [200, results, {}];
  });
  

}

export default MockBackend;
