import Disease from './Disease.js';

function DiseaseModel($q, $timeout, $http, $rootScope, _, MutationDataService) {
  'ngInject';
  const model = this;

  this.loadSamples = (disease)=>{
    return disease.populateSamples()
                  .then(disease_w_samples=>disease_w_samples);
  };

  this.loadPositives =(disease, mutations)=>{
    return MutationDataService.getPositivesFor(disease, mutations)
                              .then(disease_w_positives=>disease_w_positives)
  };



  this.responseTransformer = (response)=>{
    
    return response.map(function(diseaseResponse, idx){
    	let disease = new Disease(diseaseResponse, idx,{$http, $q, $rootScope, _});

      return model.loadSamples(disease)
                  .then(dws=>{
                    return model.loadPositives(dws, $rootScope.mutationList);
                  });
                  
     //  let _diseaseWsamples ={};
    	// return disease.populateSamples()
     //                .then(response=>{
     //                    _diseaseWsamples = response;
     //                    return MutationDataService.getPositivesFor(response, $rootScope.mutationList)
     //                  })
     //                  .then(data=>{
     //                    _diseaseWsamples.positives = data;
     //                    console.log(_diseaseWsamples);
     //                    return _diseaseWsamples;
     //                  });///end .then
    });      
  }

  
  return this;  
}


export default {
  name: 'DiseaseModel',
  fn:   DiseaseModel
};
