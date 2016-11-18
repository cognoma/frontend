import Disease from './Disease.js';

function DiseaseModel($q, $timeout, $http) {
  'ngInject';
  

  this.responseTransformer = (response)=>{
    
    return response.map(function(diseaseResponse, idx){
    	let disease = new Disease(diseaseResponse, idx,{$http, $q});
      
    	return disease.populateSamples();
    });      
  }

  
  return this;  
}


export default {
  name: 'DiseaseModel',
  fn:   DiseaseModel
};
