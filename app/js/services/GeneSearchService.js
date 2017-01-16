import Gene from '../dataModels/Gene.js';

function GeneSearchService($q, $http, $timeout) {
  'ngInject';

  const service = {};
  const endpoint = '/genes';  


  /**
   * Get all genes/mutations for search query
   *  
   * @param { String } geneQuery  -  query string passed from user input in QueryBuilder::onInputChange
   */
  service.get = function(geneQuery) {
    // promise wrapper 
    return new Promise((resolve, reject) => {
      // get all genes and transfrom then into Gene Models
      return $http.get(`${endpoint}/${geneQuery}`)
                  .then(results=>{
                      results.data.hits = service.build_genes(results.data.hits);
                      return $q.all(results.data.hits)
                               .then( data=>{
                                  results.data.hits = data;
                                  resolve(results);
                                } );

                    });
    });



  };//END service.get



  /**
   * Transform raw resopose data into Gene Models
   *   
   * @param { Array } raw  -  array of gene objects
   * 
   * @return { Array } array of Gene Model objects
   */
  service.build_genes = raw=>{
    return raw.map(function(geneResponse, idx){
                        let _gene = new Gene(geneResponse, idx, {$q, $timeout});
                        return _gene.getSupport();
                      });      
  };
  

  return service;

}

export default {
  name: 'GeneSearchService',
  fn:   GeneSearchService
};
