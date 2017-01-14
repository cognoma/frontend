
function DiseaseService($q,$resource, AppSettings, DiseaseModel, $log, filterFilter) {
  'ngInject';

  $log = $log.getInstance('DiseaseService', true);
  $log.log('');

  const DISEASES_RESOURCE = $resource(`/diseases/`,{},{
    query:  {isArray:false},
    getSamples: {url:'/samples?disease=:acronym', method:'GET', params:{acronym:'@acronym'}, isArray:true }
  });

  const service = {};

  let localDiseases = sessionStorage.diseases;

  


  service.query = (searchQuery)=>{
    $log.log('query');
    
    // filter local results 
    let _filtered_local_results = (searchQuery)=>filterFilter(angular.fromJson(localDiseases).results, searchQuery);
      

    return new Promise((resolve, reject)=>{
        // check if stored in session 
        if(localDiseases){
          $log.log(':fromLocal');
          // return filtered results from logl
           resolve( _filtered_local_results(searchQuery) );  
           return;
        }
        // if not grab from server 
        DISEASES_RESOURCE.query(diseaseResponse=>{
          $log.log(':fromDB');
          // set to session 
          localDiseases = angular.toJson(diseaseResponse);
          // return filtered results 
          resolve( _filtered_local_results(searchQuery) );
          return;
        });
    });


  };//END service.query


  // TODO:
  // x Migrate: DiseaseResourceFactory logic to pull in all from  /diseases/
  // x Transform: each result into a Disease Model 
  // x GET: disease samples total:  /samples?limit=1&disease=<disease acronym>
  // - - response: count 
  // - Build: mutationList_params: query string parameter "mutations__gene=<entrezid>" from mutationList
  // - GET Positives: for each disease result /samples?limit=1&disease=<disease acronym>&mutationList_params
  // - - response: count 
  // - Calculate" disease_negativces: samples_total - disease_positives
  
  // service.get = function(searchQuery, mutationList = null) {
        // $log.log('get');


    // return new Promise((resolve, reject) => {

    //   return DISEASES.get(searchQuery, response=>{

    //     response.results.map(function(diseaseResponse, idx){
    //         let disease  = DiseaseModel.build(diseaseResponse, idx);
    //         let samples = DISEASES.getSamples({acronym: disease.acronym}, response=>{
    //           return response;
    //         });
            
    //     });

    //   });

      // return DiseaseResource
      //         .query(mutationList)
      //         .then(
      //             // sucess
      //             results => { 
      //               // return and resolve once all 
      //               // genes are poupulate from thier promises
      //               return $q.all(results.data.results)
      //                        .then( data=>{
      //                           let response = {
      //                             count: data.length,
      //                             results: data
      //                           };
      //                           resolve(response)
      //                       } )
      //             },
      //             // error
      //             (err, status)=>reject(err, status)
      //     );

    // });


  // };

  return service;

}

export default {
  name: 'DiseaseService',
  fn:   DiseaseService
};
