// import * as diseaseData from '../../../js/MockBackend/mockData/mock-disease.js';

describe("Unit:: Service: DiseaseService", function() {
  let http, service, $timeout, mockDiseaseModel, _AppSettings, $rootScope;

  beforeEach(function() {
    angular.mock.module("app");
    angular.mock.module("MockBackend");

    let mockDiseaseModel = {
      acronym: "mockAcronym",
      name: "mockName",
      positives: 111,
      negatives: 222,
      samples: 333
    };

    angular.mock.module(function($provide) {
      $provide.value("DiseaseModel", mockDiseaseModel);
    });
  });

  beforeEach(function() {
    angular.mock.inject(
      (
        $httpBackend,
        DiseaseService,
        _$timeout_,
        DiseaseModel,
        _$resource_,
        _AppSettings_,
        $localStorage
      ) => {
        $timeout = _$timeout_;
        http = $httpBackend;
        mockDiseaseModel = DiseaseModel;
        service = DiseaseService;

        _AppSettings = _AppSettings_;
        _AppSettings.api.baseUrl = "";
        $localStorage.diseaseData = { count: 3 };
      }
    );
  });

  it("should exist", function() {
    expect(service).toBeDefined();
  });

  it("should retrieve disease results", () => {
    http
      .expect("GET", "/diseases/")
      .respond(200, {
        count: 1,
        results: [{ acronym: "PRAD", name: "prostate adenocarcinoma" }]
      });

    let diseaseRequest = service.query("", []);

    http.flush();
  });

  afterEach(
    inject(function($httpBackend) {
      //These two calls will make sure that at the end of the test, all expected http calls were made
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    })
  );
});
