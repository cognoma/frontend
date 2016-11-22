import Disease from './Disease.js';

function DiseaseModel($q, $timeout, $http, $rootScope, _, MutationDataService) {
  'ngInject';
  const model = this;

  this.loadSamples = disease =>disease
                                  .populateSamples()
                                  .then(disease_w_samples=>disease_w_samples);
  
  this.loadPositives = (disease, mutations) => MutationDataService
                                              .getPositivesFor(disease, mutations)
                                              .then(disease_w_positives=>disease_w_positives);
  
  this.calculateNegatives = disease =>disease.samples.length - disease.positives;

  this.calculateMutationData = diseaseWSamples =>{
    return model.loadPositives(diseaseWSamples, $rootScope.mutationList)
                .then(dwp=>{
                  dwp.negatives = model.calculateNegatives(dwp);
                  return dwp;
                });
  }
  


  this.responseTransformer = response =>{
    return response.map(function(diseaseResponse, idx){
    	let disease = new Disease(diseaseResponse, idx,{$http, $q, $rootScope, _});

      return model.loadSamples(disease)
                  .then(dws=>model.calculateMutationData(dws));
    });      
  }

  
  return this;  
}


export default {
  name: 'DiseaseModel',
  fn:   DiseaseModel
};
