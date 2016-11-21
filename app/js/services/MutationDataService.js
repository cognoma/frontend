function MutationDataService($http, AppSettings, $rootScope, _) {
  'ngInject';

  const service = {};

  service.getPositivesFor =function(disease, selectedMutations = []){
    console.log(`MutationDataService::getPositivesFor:${disease.acronym} with ${_.pluck(selectedMutations, "symbol").join('+')}`);


    return new Promise((resolve, reject) => {

      if(selectedMutations.length > 0){
        let Converter = require("csvtojson").Converter;
        let converter = new Converter({constructResult:false});
        let posCount = 0;
        let mutationsParams = _.pluck(selectedMutations, "symbol").join('+');
    
      //record_parsed will be emitted each csv row being processed 
      converter.on("record_parsed", function (jsonObj) {
        let resultRow = jsonObj[Object.keys(jsonObj)[0]]
  
          selectedMutations.forEach(gene=>{
            if( resultRow.match(gene) ) posCount++;
          });
      });

      converter.on("end_parsed",()=>{
          disease.positives = posCount;
          resolve(disease);
      });
      

      require("request").get(`http://www.cbioportal.org/webservice.do?cmd=getMutationData&genetic_profile_id=${disease.acronym.toLowerCase()}_tcga_mutations&gene_list=${mutationsParams}`).pipe(converter);
    
  
      }else{
        reject("No Mutations Selected in Query");
      }
      
    });
    
  };


  service.get = function() {
  //   return new Promise((resolve, reject) => {
  //     $http.get('apiPath').success((data) => {
  //       resolve(data);
  //     }).error((err, status) => {
  //       reject(err, status);
  //     });
  //   });
  };

  return service;

}

export default {
  name: 'MutationDataService',
  fn: MutationDataService
};
