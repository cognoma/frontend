// import * as diseaseData from '../../../js/MockBackend/mockData/mock-disease.js';

describe('Unit:: Service: DiseaseSearchService', function() {

  let http, service;

  beforeEach(function() {
    // instantiate the app module
    angular.mock.module('app');
    
    // mock the service
    angular.mock.inject(($httpBackend, DiseaseSearchService) => {
      http = $httpBackend;
      service = DiseaseSearchService;
    });
  });

  it('should exist', function() {
    expect(service).toBeDefined();
  });

  it('should retrieve disease results', function(done) {

    http.expect('GET', '/diseases/').respond(200, { results: [] });

    service.get('',[]).then((result) => {
      expect(result).toEqual({ count: 0, results: [] });
      // expect(result).toBeDefine();
    }).catch((error) => {
      expect(error).toBeUndefined();
    }).then(done);

    http.flush();
  });
});
