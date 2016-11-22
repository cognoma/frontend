import Disease from './Disease.js';

function DiseaseModel( $http, MutationDataService) {
  'ngInject';
  const model = this;

  this.loadSamples = disease => disease
                                  .populateSamples()
                                  .then(disease_w_samples=>disease_w_samples);
  
  this.loadPositives = (disease, mutations) => MutationDataService
                                                  .getPositivesFor(disease, mutations)
                                                  .then(disease_w_positives=>disease_w_positives);

  
  this.calculateNegatives = disease => disease.samples.length - disease.positives;

  this.calculateMutationData = (diseaseWSamples, mutationList) =>{

    return model.loadPositives(diseaseWSamples, mutationList)
                .then(dwp=>{
                  dwp.negatives = model.calculateNegatives(dwp);
                  return dwp;
                });
  }
  


  this.responseTransformer = (response, mutationList )=>{
    return response.map(function(diseaseResponse, idx){
    	let disease = new Disease(diseaseResponse, idx, {$http});

      return model.loadSamples(disease)
                  .then(dws=>model.calculateMutationData(dws, mutationList));
    });      
  }

  
  return this;  
}


export default {
  name: 'DiseaseModel',
  fn:   DiseaseModel
};
