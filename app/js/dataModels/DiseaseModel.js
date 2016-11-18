import Disease from './Disease.js';

function DiseaseModel($q, $timeout, $http, $rootScope, _) {
  'ngInject';
  

  this.responseTransformer = (response)=>{
    
    return response.map(function(diseaseResponse, idx){
    	let disease = new Disease(diseaseResponse, idx,{$http, $q, $rootScope, _});
      
    	return disease.populateSamples().then(response=>disease.populateSampleMutations());
    });      
  }

  
  return this;  
}


export default {
  name: 'DiseaseModel',
  fn:   DiseaseModel
};
