// import DiseaseModel from './Disease.js';
class DiseaseModel{
  'ngInject';

  constructor($log, _){
    this.$log = $log.getInstance('DiseaseModel', true);
    this._ = _;
  }

  build(diseaseResponse,idx){
    this.idx = idx;
    angular.extend(this, diseaseResponse);
    return this;
  }

}


DiseaseModel.$inject = ['$log','_'];


// function _DiseaseModel(data) {
  // 'ngInject';
  // $log = $log.getInstance('DiseaseModel', false);
  // $log.log('');

  // const model = this;
  
  // this.loadSamples = disease => disease
  //                                 .populateSamples()
  //                                 .then(disease_w_samples=>disease_w_samples);
  
  // this.loadPositives = (disease, mutations) => MutationDataService
  //                                                 .getPositivesFor(disease, mutations)
  //                                                 .then(disease_w_positives=>disease_w_positives);

  
  // this.calculateNegatives = disease => disease.samples.length - disease.positives;

  
  // this.calculatePositives = (diseaseWSamples, mutationList) =>{
  //   // GET NUMBER OF SAMPLES WITH MUTATIONS 
    
  //   // get the user selected mutations ids in array 
  //   let selectedMutations_ids = _.pluck(mutationList, 'entrezgene');
  //   let diseaseSamples_mutations = _.pluck(diseaseWSamples.samples,'mutations');
  //   let count = 0;

  //   // check the intersection and add to the count 
  //   diseaseSamples_mutations.forEach(sampleMutations=>{
  //     if(_.intersection(sampleMutations, selectedMutations_ids).length ) count++;
  //   })


  //   return  count;
  // };


  // this.calculateMutationData = (disease, mutationList) =>{

  //   return model.loadSamples(disease, mutationList)
  //               .then(dws=>{
  //                 dws.positives = model.calculatePositives(dws, mutationList);
  //                 dws.negatives = model.calculateNegatives(dws);
  //                 return dws;
  //               });
  // }
  


  // this.responseTransformer = (response, mutationList )=>{
  //   return response.map(function(diseaseResponse, idx){
  //   	let disease = new Disease(diseaseResponse, idx, {$http,_});

  //     return model.calculateMutationData(disease, mutationList)
  //                 .then(dws=>model.calculateMutationData(dws, mutationList));
  //   });      
  // }

// }




export default {
  name: 'DiseaseModel',
  fn:   DiseaseModel
};
