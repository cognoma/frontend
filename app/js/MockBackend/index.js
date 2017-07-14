import angular from 'angular';
import '../../../node_modules/angular-mocks/ngMockE2E.js';

import * as geneData from './mockData/mock-genes.js';
import * as diseaseData from './mockData/mock-disease.js';
import * as samplesData from './mockData/mock-samples.js';

let requires = ['ngMockE2E', 'ngStorage'];
let MockBackend = angular.module('MockBackend', requires);



function MockBackendOnRun($httpBackend, _, $sessionStorage) {
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
    
    // Query; returns all samples.
    $httpBackend.whenGET('/samples').respond(diseaseData);  


    // return random number of positives per sample
    $httpBackend.whenGET(/samples\?limit=1\&disease=(\w+)\&mutations__gene=(\d+)/, undefined, ['id']).respond(function(method, url, data, headers, params) {

      let samplesList = _.filter(samplesData.results, sample=>{ 
        return sample.disease == params.id;
      });

      let POSITIVES = params.mutations__gene.length ? (Math.floor(Math.random() * samplesList.length) ): 0;

      return [200, {count: POSITIVES }, {}];
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


    /* =======================================================================
      Users endpoints
    ========================================================================== */
    let USERS = [
            {
              "id":         1,
              "name":       "Ben Dolly",
              "email":      null,
              "random_slugs":['7cyb92tknsy2454px41scmb08'],
              "created_at": "2017-06-04T02:41:49.895919Z",
              "updated_at": "2017-06-04T02:41:49.895982Z"
            }];


    $httpBackend.whenGET(/\/users\/(\d+)/, undefined, ['id']).respond(function(method, url, data, headers, params) {
      let user = _.find(USERS, function(user){ return user.id == params.id; });
      // pull from sessionStorage 
      if(user == undefined) user = $sessionStorage.cognomaUser;
      return [200, {user}, {}];
    });            


    $httpBackend.whenGET('/users').respond(function() {
      
      return [200, {
                    count: USERS.length, 
                    prev:null, 
                    next:null, 
                    results:USERS
                    }, 
                    {}];
    });


    $httpBackend.whenPOST(/\/users\//).respond(function(method, url, data, headers) {
      let incrementID = USERS[USERS.length-1].id+1;

      let newUser = {
              "id":         incrementID,
              "name":       data.userName || `Anonymous Researcher ${incrementID}`,
              "email":      data.email || null,
              "random_slugs":[_.uniqueId()],
              "created_at": Date.now(),
              "updated_at": ""
            };

      USERS.push( newUser);
      return [200,{user: newUser}];
    });


    // Passthrough everything
    $httpBackend.whenGET(/[\s\S]*/).passThrough();

}



angular.module('MockBackend').run(MockBackendOnRun);


export default MockBackend;
