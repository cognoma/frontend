import angular from 'angular';
import '../../../node_modules/angular-mocks/ngMockE2E.js';

import * as geneData from './mockData/mock-genes.js';
import * as diseaseData from './mockData/mock-disease.js';
import * as samplesData from './mockData/mock-samples.js';

let requires = ['ngMockE2E'];
let MockBackend = angular.module('MockBackend', requires);



function MockBackend_onRun($httpBackend, _) {
  'ngInject';
  /* =======================================================================
    Mutations Endpoints = /genes 
  ========================================================================== */
  // Query; returns all results.
  $httpBackend.whenGET('/genes').respond(geneData);

  // Get; return a list of genes by id 
  // this is to mock the myGene.info query 
  $httpBackend.whenGET(/\/genes\/(\w+)/, undefined, ['id']).respond(function(method, url, data, headers, params) {

    // filter gene data by passed in parameter
    let geneList = _.filter(geneData.hits, gene=>{ 
      return gene.symbol.includes(params.id);
    });
    
    // console.log(geneList);
    let response = angular.extend({}, geneData, {hits: geneList, total: geneList.length});
    
    if (response.hits.length <= 0 ) {
      return [404, response, {}, `No Matches Found for symbol: ${params.id}`];
    }
    
    return [200, response, {}];
  });

  /* =======================================================================
    DISEASE AND SAMPLE ENDPOINTS

    Disease Search 
    1. GET list of disease http://localhost:8080/diseases/
    2. GET disease samples count http://localhost:8080/samples?limit=-1&disease=ACC

    CALCULATE POSITIVES
    3. GET all samples in disease with mutated genes specificed  http://localhost:8080/samples?limit=1&disease=ACC&mutations__gene=<entrezid>&mutations__gene=<entrezid>
    - can be mocked using CBio: http://www.cbioportal.org/webservice.do?cmd=getMutationData&genetic_profile_id=<disease_acronym>_tcga_mutations&gene_list=<gene_symbol>+<gene_symbol> ..
      ========================================================================== */

    // Query; returns all samples.
    $httpBackend.whenGET('/samples').respond(diseaseData);  


    //GET samples per disease
    $httpBackend.whenGET(/samples\?disease=(\w+)/, undefined, ['id']).respond(function(method, url, data, headers, params) {
      
      let samplesList = _.filter(samplesData.results, sample=>{ 
        return sample.disease == params.id;
      });
    
      if (samplesList.length <= 0 ) {
        return [404, samplesList, {}, `No Samples Found for Disease: ${params.id}`];
      }
      return [200, samplesList, {}];
  });


  // GET list of all diseases
  $httpBackend.whenGET(/\/diseases\//).respond(function(method, url, data, headers, params) {

      if (diseaseData.count <= 0 ) {
        return [404, undefined, {}, `No Diseases Found`];
      }
    
      return [200, diseaseData, {}];
  });


    

}



angular.module('MockBackend').run(MockBackend_onRun);


export default MockBackend;
