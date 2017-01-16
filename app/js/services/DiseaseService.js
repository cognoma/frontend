function DiseaseService($q,$resource, AppSettings, DiseaseModel, $log, filterFilter, _) {
  'ngInject';

  $log = $log.getInstance('DiseaseService', true);
  $log.log('');

  const DISEASES_RESOURCE = $resource(`${AppSettings.api.diseases}/`,{},{ 
    query:  {isArray:false}
  });

  const service = {};

  let localDiseases = sessionStorage.diseases;

  // converts raw server response to array Diesease Model promises 
  // all models will be populated when resolved
  let _responseTransformer = (serverResponse, mutationsGenes)=>serverResponse.map((diseaseResponse, idx)=>new DiseaseModel(diseaseResponse, mutationsGenes));


  service.query = (searchQuery, dataSource = "local", mutationsGenes)=>{
    $log.log(`query:${AppSettings.api.diseases}/`);
    
    // filter local results 
    let _filtered_local_results = (searchQuery)=>filterFilter(angular.fromJson(localDiseases).results, searchQuery);
      

    return new Promise((resolve, reject)=>{

        // check if stored in session 
        // if(dataSource =='local' && localDiseases){
        //   $log.log(':fromLocal');
        //   // return filtered results from logl
        //    resolve( _filtered_local_results(searchQuery) );  
        // }


        // if not grab from server 
        DISEASES_RESOURCE.query(diseaseResponse=>{
          $log.log(':fromDB to localDiseases');

          // if(dataSource == 'local'){
          //   // set to session 
          //   localDiseases = angular.toJson(diseaseResponse);
          //   // return filtered results 
          //   resolve( _filtered_local_results(searchQuery) );  
          // };


          // wait for all models to be populated before resolving 
          $q.all( _responseTransformer(diseaseResponse.results, mutationsGenes) )
            .then((resolvedModels)=>{
              diseaseResponse.results = resolvedModels;
              resolve( filterFilter(diseaseResponse.results, searchQuery) );
            });


        });
    });


  };//END service.query




  return service;

}

export default {
  name: 'DiseaseService',
  fn:   DiseaseService
};
