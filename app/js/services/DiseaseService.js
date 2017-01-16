function DiseaseService($q, $resource, AppSettings, DiseaseModel, $log, filterFilter, _, $localStorage) {
  'ngInject';

  $log = $log.getInstance('DiseaseService', true);
  $log.log('');


  const DISEASES_RESOURCE = $resource(`${AppSettings.api.baseUrl}${AppSettings.api.diseases}/`,{},{
    query:  {isArray:false}
  });

  const service = {};

  let localDiseases = sessionStorage.diseases;

  // converts raw server response to array Diesease Model promises
  // all models will be populated when resolved
  let _responseTransformer = (serverResponse, mutationsGenes)=>serverResponse.map((diseaseResponse, idx)=>new DiseaseModel(diseaseResponse, mutationsGenes));


  /**
   * Gets all disease resources either from the server or a local storage method
   * converts them to DiseaseModels which come back as promises in order to allow them to fetch aggregate data
   *
   * @param { String } searchQuery  -  query string passed from user input in QueryBuilder::onInputChange
   * @param { Object } dataSource  -   where to retrieve results from
   * @param { Array } mutationsGenes  -   array of gene entrezid, usually from queryBuilder user selected genes
   *
   * @return {Array} filtered array of DieseasModels
   */
  service.query = (searchQuery, dataSource = "local", mutationsGenes)=>{
    let diseasePromise;

    $log.log(`query:${AppSettings.api.baseUrl}${AppSettings.api.diseases}/`);

    // filter results in the service to simply logic in the templates
    let _filtered_local_results = (searchQuery)=>filterFilter(angular.fromJson(localDiseases).results, searchQuery);


    if ($localStorage.diseaseData) {
      diseasePromise = Promise.resolve($localStorage.diseaseData);
    } else {
      diseasePromise = new Promise((resolve, reject)=>{
        DISEASES_RESOURCE.query((diseaseReponse) => {
          $localStorage.diseaseData = diseaseReponse
          resolve(diseaseReponse);
        });
      });
    }

    return diseasePromise
      .then(diseaseResponse => {
        $log.log(':fromDB to localDiseases');

        // wait for all models to be populated before resolving
        return $q.all( _responseTransformer(diseaseResponse.results, mutationsGenes) )
          .then((resolvedModels)=>{
            diseaseResponse.results = resolvedModels;
            return filterFilter(diseaseResponse.results, searchQuery);
          });
    });


  };//END service.query




  return service;

}

export default {
  name: 'DiseaseService',
  fn:   DiseaseService
};
