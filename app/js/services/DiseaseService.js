function DiseaseService($q, $resource, AppSettings, DiseaseModel, $log, filterFilter, _, $localStorage) {
  'ngInject';

  $log = $log.getInstance('DiseaseService', true);
  $log.log('');

  // const DISEASE_ENDPOINT = `${AppSettings.api.baseUrl}${AppSettings.api.diseases}/`;
  const DISEASE_ENDPOINT = `http://localhost\:8080/diseases`;

  const DISEASES_RESOURCE = $resource(DISEASE_ENDPOINT,{},{ query:  {isArray:false} });

  const service = {};
 

  // converts raw server response to array Diesease Model promises
  // all models will be populated when resolved
  let _responseTransformer = (serverResponse, mutationsGenes)=>{
    return serverResponse.map((diseaseResponse)=>new DiseaseModel(diseaseResponse, mutationsGenes));
  }


  /**
   * Gets all disease resources either from the server or a local storage method
   * converts them to DiseaseModels which come back as promises in order to allow them to fetch aggregate data
   *
   * @param { String } searchQuery  -  query string passed from user input in QueryBuilder::onInputChange
   * @param { Object } dataSource  -   where to retrieve results from
   * @param { Array } mutationsGenes  -  array of gene entrezid, usually from queryBuilder user selected genes
   *
   * @return {Array} filtered array of DieseasModels
   */
  service.query = (searchQuery, mutationsGenes)=>{
    let diseasePromise;
    
    $log.log(`query:${AppSettings.api.baseUrl}${AppSettings.api.diseases}/`);

    
    if ($localStorage.diseaseData) {
      $log.log('fetch disease data from localStorage')
      if(!$localStorage.diseaseData.count) reject(`No Diseae Types found matching: "${searchQuery}"`);
      diseasePromise =  Promise.resolve($localStorage.diseaseData);

    } else {

      diseasePromise = new Promise((resolve, reject)=>{

        $log.log('fetch disease data from localStorage');

        DISEASES_RESOURCE.query((data) => {
          if(!diseaseResponse.count) reject(`No Diseae Types found matching: "${searchQuery}"`);
          $localStorage.diseaseData = _.assign({}, data);
          resolve(data);
        });

      });

    }



    return diseasePromise
              .then(diseaseResponse => {
                  let filteredResults = filterFilter(diseaseResponse.results, searchQuery);
                  $log.log(`${filteredResults.length} filtered results found, building DiseaseModels ...`);
                  // wait for all models to be populated before resolving
                  return $q.all( _responseTransformer(filteredResults, mutationsGenes) );
              });


  };//END service.query




  return service;

}

export default {
  name: 'DiseaseService',
  fn:   DiseaseService
};
