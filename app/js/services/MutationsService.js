function MutationsService($q, $http, $timeout, $log, AppSettings, $httpParamSerializer) {
  'ngInject';

    $log = $log.getInstance('MutationsService', false);
    $log.log('');


  const service = {};
  

  
  let endpoint = (geneQuery ='')=>{
    let _geneQuery = geneQuery.toUpperCase();
    return `${AppSettings.api.geneSearch.base}${_geneQuery}&${$httpParamSerializer(AppSettings.api.geneSearch.params)}`;  
    
  }

  
  
  /**
   * Get all genes/mutations for search query
   *  
   * @param { String } geneQuery  -  query string passed from user input in QueryBuilder::onInputChange
   * 
   * @return {Array } array of objects containing the gene results
   */
  service.query = function(geneQuery) {
    $log.log(`query::${geneQuery.toUpperCase()}`);


    // promise wrapper 
    // @todo: handle reject condition
    return new Promise((resolve) => {

      // get all genes and transform then into Gene Models
      return $http.get(endpoint(geneQuery))
                  .then(results=>{
                      $log.log(`query::${geneQuery.toUpperCase()}:results.data.total = ${results.data.total}`);
                        resolve(results.data.hits);
                    });
    });//END promise wrapper



  };//END service.query


  

  return service;

}

export default {
  name: 'MutationsService',
  fn:   MutationsService
};
