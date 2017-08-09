function DiseaseService($q, $resource, AppSettings, DiseaseModel, $log, filterFilter, _, $localStorage) {
  'ngInject';

  $log = $log.getInstance('DiseaseService', false);
  $log.log('');

  const DISEASE_ENDPOINT  = `${AppSettings.api.baseUrl}${AppSettings.api.diseases}/`;
  const DISEASES_RESOURCE = $resource(DISEASE_ENDPOINT,{},{ query:  {isArray:false} });
  const service           = {};
 

  // converts raw server response to array Disease Model promises
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
   * @return {Array} filtered array of DiseaseModels
   */
  service.query = (searchQuery, mutationsGenes)=>{
    
    
      $log.log(`query:${AppSettings.api.baseUrl}${AppSettings.api.diseases}/`);


      let diseasePromise = new Promise((resolve, reject)=>{
          

        if ($localStorage.diseaseData && $localStorage.diseaseData.count) {
          if($localStorage.diseaseData.count == 0) return  reject(`No Disease Types found matching: "${searchQuery}"`);
          $log.log('fetch disease data from localStorage',$localStorage.diseaseData);
           resolve($localStorage.diseaseData); 
        }

        $log.log('fetch disease data from DB resource');

        DISEASES_RESOURCE.query((diseaseResponse) => {
          
          $log.log(`found ${diseaseResponse.count} disease types in DB`);
          if(diseaseResponse.count == 0) return  reject(`No Disease Types found matching: "${searchQuery}"`);

          $localStorage.diseaseData = _.assign({}, diseaseResponse);
          resolve(diseaseResponse);
        });

      });//end diseasePromise

    


    return diseasePromise
              .then(diseaseResponse => {

                  let filteredResults = filterFilter(diseaseResponse.results, searchQuery);
                  $log.log(`${filteredResults.length} filtered results found, building DiseaseModels ...`);
                  // wait for all models to be populated before resolving
                  return $q.all( _responseTransformer(filteredResults, mutationsGenes) );
              }).catch(error=>{console.log(error)});

  };//END service.query



  


  return service;

}

export default {
  name: 'DiseaseService',
  fn:   DiseaseService
};
