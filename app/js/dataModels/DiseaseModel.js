function factoryWrapper($log, _, $q, $timeout, $http, AppSettings){
  'ngInject';

  $log = $log.getInstance('DiseaseModel', false);
  $log.log('');

  const API_BASE = `${AppSettings.api.baseUrl}`;
  

   /**
   * Model constructor and initialization
   * @api public
   * @param { Object } diseaseResponse  -  disease result object from server 
   * @param { Array } mutationsGenes  -   array of gene entrezid, queryBuilder user selected genes
   */
  function DiseaseModel(diseaseResponse, mutationsGenes){
    this.samples   = 0;
    this.negatives = 0;
    this.positives = 0;
    return this.build(diseaseResponse, mutationsGenes);
  }



   /**
   * Populate model with aggregate data from api
   * @api public
   * @param { Object } diseaseResponse  -  disease result object from server 
   * @param { Array } mutationsGenes  -   array of gene entrezid, queryBuilder user selected genes
   * 
   * @return Promise - resolved when all aggregate data has been received and processed
   */
  DiseaseModel.prototype.build = function(diseaseResponse, mutationsGenes){
      $log.log(`build:${diseaseResponse.acronym}`);

      let dfd = $q.defer();
      angular.extend(this, diseaseResponse, {});

        this.getAggregates(mutationsGenes)
            .then(()=>{
              dfd.resolve(this);      
            });
        
      
      return dfd.promise;
  };



   /**
   * GET samples total number of samples from api and set to model property 
   * @api private 
   * 
   * @return Promise - resolved when response returns from api
   */
  DiseaseModel.prototype._loadSamples = function() {
    let _model = this;
    const SAMPLES_ENDPOINT = `${API_BASE}${AppSettings.api.samples}?disease=${this.acronym}`;

    $log.log(`_loadSamples:${SAMPLES_ENDPOINT}`);

    return $http.get(SAMPLES_ENDPOINT)
                .then(samplesResponse=>{
                    _model.samples = samplesResponse.data.count;
                    $log.log(`_loadSamples:${samplesResponse.data.count} loaded for ${this.acronym}`);
                    return _model.samples;
          });
  }

  
  /**
   * GET (positives) - total number of samples in disease that have a mutated gene a user selected gene
   * sets the total count to a model property 
   * @api private 
   * @param { Array } mutationsGenes  -   array of gene entrezIds, queryBuilder user selected genes
   *
   * @return Promise | Null 
   */
  DiseaseModel.prototype._loadMutatedGenes = function(mutationsGenes = []){
    $log.log(`_loadMutatedGenes:${mutationsGenes.length}`);
    let _model = this;
    let mutationsParams = this._buildMutationsGenesParams(mutationsGenes);
    
    const POSITIVES_ENDPOINT = `${API_BASE}${AppSettings.api.samples}?limit=1&disease=${this.acronym}${mutationsParams}`;
    
    
    if(mutationsGenes.length){
      return $http.get(POSITIVES_ENDPOINT)
                .then(mutatedGenesResponse=>{
                  _model.positives = mutatedGenesResponse.data.count;
                  return _model;
                });  
    }else{
      _model.positives = 0
      return _model;
    }

  }



  // simple math for the number of samples without a mutated gene 
  // matching the user selected genes
  DiseaseModel.prototype._setNegatives = function(){
     this.negatives = this.samples - this.positives;
     $log.log(`_setNegatives:${this.negatives}`);
  }



  // convenience method to build "&mutations__gene=<entrezID>&mutations__gene=<entrezID>"
  DiseaseModel.prototype._buildMutationsGenesParams = function(mutationsGenes) {
    $log.log(`_buildMutationsGenesParams:${mutationsGenes.length}`);
    let mutationsGenesParams = '';
    mutationsGenes.map((gene)=>{ mutationsGenesParams += `&mutations__gene=${gene.entrezgene}`});
    return mutationsGenesParams;
  }  



  /**
   * Aggregate data from api to set the model's (samples, positives, negatives) properties.
   * Promise chaining in this method allows us to return a model result only after it has
   * been fully populated with aggregate data from disparate sources. 
   * @api public
   * 
   * @param { Array } mutationsGenes  -   array of gene entrezid, queryBuilder user selected genes
   * 
   * @return {Object} Promise - resolved with model that is fully populated with aggregate data
   */
  DiseaseModel.prototype.getAggregates = function(mutationsGenes) {
    $log.log('getAggregates:');
    
    let dfd = $q.defer();

    // each method returns a promise 
    // so chain them together then resolve method promise 
    // once all data is received
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
