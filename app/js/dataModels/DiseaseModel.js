function factoryWrapper($log, _, $q, $timeout, $http, AppSettings){
  'ngInject';

  $log = $log.getInstance('DiseaseModel', false);
  $log.log('');

  // TODO:
  // x Migrate: DiseaseResourceFactory logic to pull in all from  /diseases/
  // x Transform: each result into a Disease Model 
  // x GET: disease samples total:  /samples?limit=1&disease=<disease acronym>
  // x - response: count 
  // x Build: mutationList_params: query string parameter "mutations__gene=<entrezid>" from mutationList
  // x GET Positives: for each disease result /samples?limit=1&disease=<disease acronym>&mutationList_params
  // x - response: count 
  // x Calculate" disease_negativces: samples_total - disease_positives


  function DiseaseModel(diseaseResponse, mutationsGenes){
    this.samples   = 0;
    this.negatives = 0;
    this.positives = 0;
    return this.build(diseaseResponse, mutationsGenes);
  }



  // populate model with data 
  DiseaseModel.prototype.build = function(diseaseResponse, mutationsGenes){
      $log.log(`build:${diseaseResponse.acronym}`);

      let dfd = $q.defer();
      angular.extend(this, diseaseResponse, {});

        this.getAggregates(mutationsGenes)
            .then(model_w_aggs=>{
              dfd.resolve(this);      
            });
        
      
      return dfd.promise;
  };




  // get samples count from DB 
  DiseaseModel.prototype._loadSamples = function() {
    let _model = this;
    let samples_endpoint = `${AppSettings.api.samples}?disease=${this.acronym}`;
    $log.log(`_loadSamples:${samples_endpoint}`);

    return $http.get(`${AppSettings.api.samples}?disease=${this.acronym}`)
                .then(samplesResponse=>{
                    _model.samples = samplesResponse.data.count;
                    return _model.samples;
          });
  }

  

  // get positives count from DB 
  // TODO: build functionality in MockBackend to mimic correct api response 
  DiseaseModel.prototype._loadMutatedGenes = function(mutationsGenes = []){
    $log.log(`_loadMutatedGenes:${mutationsGenes.length}`);
    let _model = this;
    let mutationsParmas = this._buildMutationsGenesParams(mutationsGenes);
    let postivies_endpoint =  `${AppSettings.api.samples}?limit=1&disease=${this.acronym}${mutationsParmas}`;
    
    if(mutationsGenes.length){
      return $http.get(postivies_endpoint)
                .then(mutatedGenesResponse=>{
                  _model.positives = mutatedGenesResponse.data.count;
                  return _model;
                });  
    }else{
      return null;
    }

  }




  DiseaseModel.prototype._setNegatives = function(){
    $log.log(`_setNegatives:`);
     this.negatives = this.positives ?  (this.samples - this.positives) : null;
  }



  // build the mutations gene query params 
  DiseaseModel.prototype._buildMutationsGenesParams = function(mutationsGenes) {
    $log.log(`_buildMutationsGenesParams:${mutationsGenes.length}`);
    let mutations__genes = '';
    mutationsGenes.map((gene)=>{ mutations__genes += `&mutations__gene=${gene.entrezgene}`});
    return mutations__genes;
  }  





  // caluculate model: samples, positives, negatives
  // from aggregate sources
  DiseaseModel.prototype.getAggregates = function(mutationsGenes) {
    $log.log('getAggregates:');
    let _model = this;
    let dfd = $q.defer();

    this._loadSamples()
        .then(()=>this._loadMutatedGenes(mutationsGenes))
        .then(()=>{
          this._setNegatives();
          dfd.resolve(this);
        });

    return dfd.promise;
  }




  return DiseaseModel;
}///END factoryWrapper



export default {
  name:         'DiseaseModel',
  fn:           factoryWrapper
};
