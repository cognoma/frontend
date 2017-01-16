function MutationsService($q, $http, $timeout, $log, AppSettings, $httpParamSerializer) {
  'ngInject';

    $log = $log.getInstance('MutationsService', true);
    $log.log('');


  const service = {};
  

  //production - mygene.info query endpoint
  // let endpoint = (geneQuery ='')=>`${AppSettings.api.geneSearch.base}${geneQuery.toUpperCase()}&${$httpParamSerializer(AppSettings.api.geneSearch.params)}`;

  // local dev mockBackend - /genes/<query> endpoint
  let endpoint = (geneQuery ='')=>`${AppSettings.api.genes}/${geneQuery.toUpperCase()}`;
    


  /**
   * Get all genes/mutations for search query
   *  
   * @param { String } geneQuery  -  query string passed from user input in QueryBuilder::onInputChange
   */
  service.query = function(geneQuery) {
    $log.log(`query::${geneQuery.toUpperCase()}`);

    // promise wrapper 
    return new Promise((resolve, reject) => {

      // get all genes and transfrom then into Gene Models
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
