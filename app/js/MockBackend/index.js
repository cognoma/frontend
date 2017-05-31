import angular from 'angular';
import '../../../node_modules/angular-mocks/ngMockE2E.js';

import * as geneData from './mockData/mock-genes.js';
import * as diseaseData from './mockData/mock-disease.js';
import * as samplesData from './mockData/mock-samples.js';

let requires = ['ngMockE2E'];
let MockBackend = angular.module('MockBackend', requires);



function MockBackendOnRun($httpBackend, _) {
  'ngInject';
  /* =======================================================================
    Mutations Endpoints = /genes 
  ========================================================================== */
  // Query; returns all results.
  $httpBackend.whenGET('/genes').respond(geneData);

  // Get; return a list of genes by id 
  $httpBackend.whenGET(/\/genes\/(\w+)/, undefined, ['id']).respond(function(method, url, data, headers, params) {

    // filter gene data by passed in parameter
    let geneList = _.filter(geneData.hits, gene=>{ 
      return gene.symbol.includes(params.id);
    });
    
    // console.log(geneList);
    let response = angular.extend({}, geneData, {hits: geneList, total: geneList.length});

    return [200, response, {} ];

    
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


    $httpBackend.whenGET('http://www.cbioportal.org/webservice.do?cmd=getMutationData&genetic_profile_id=acc_tcga_mutations&gene_list=ZFPM1').passThrough();  
    
    // Query; returns all samples.
    $httpBackend.whenGET('/samples').respond(diseaseData);  


    $httpBackend.whenGET(/samples\?limit=1\&disease=(\w+)\&mutations__gene=(\d+)/, undefined, ['id']).respond(function(method, url, data, headers, params) {

      let samplesList = _.filter(samplesData.results, sample=>{ 
        return sample.disease == params.id;
      });

      return [200, {count: Math.floor(Math.random() * samplesList.length) }, {}];
    });




    //GET samples per disease
    $httpBackend.whenGET(/samples\?disease=(\w+)/, undefined, ['id']).respond(function(method, url, data, headers, params) {
      
      let samplesList = _.filter(samplesData.results, sample=>{ 
        return sample.disease == params.id;
      });
      
      // if (samplesList.length <= 0 ) {
      //   return [404, samplesList, {}, `No Samples Found for Disease: ${params.id}`];
      // }
      return [200, {count: samplesList.length, next: null, previous: null, results:samplesList}, {}];
    });

    


  // GET list of all diseases
  $httpBackend.whenGET(/\/diseases\//).respond(function() {

      if (diseaseData.count <= 0 ) {
        return [404, undefined, {}, `No Diseases Found`];
      }
    
      return [200, diseaseData, {}];
  });


    

}



angular.module('MockBackend').run(MockBackendOnRun);


export default MockBackend;
