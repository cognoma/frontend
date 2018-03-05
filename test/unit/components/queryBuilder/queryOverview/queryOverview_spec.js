describe("UNIT::component: queryOverview:", () => {
  let parentScope;
  let element;
  let $state;
  let mutationListings;
  let diseaseListings;
  let $componentController;
  let $httpBackend;

  function findIn(element, selector) {
    let el = element[0] ? element[0] : element;
    return angular.element(el.querySelector(selector));
  }

  //load templates from $templateCache
  beforeEach(angular.mock.module("app"));
  beforeEach(angular.mock.module("app.components"));
  beforeEach(
    inject(function(_$componentController_, _$state_) {
      $componentController = _$componentController_;
      $state = _$state_;
    })
  );
  beforeEach(
    inject(($compile, $rootScope, _$httpBackend_) => {
      $httpBackend = _$httpBackend_;
      $httpBackend.whenGET("images/processing.svg").respond(200, "");

      parentScope = $rootScope.$new();

      parentScope.removeParamFromQuery = jasmine.createSpy("removeParam");

      parentScope.mutationList = [
        {
          _id: "4331",
          _score: 17.74919,
          entrezgene: 4331,
          name: "MNAT1, CDK activating kinase assembly factor",
          symbol: "MNAT1",
          taxid: 9606
        },
        {
          _id: "388324",
          _score: 15.771275,
          entrezgene: 388324,
          name: "inhibitor of CDK, cyclin A1 interacting protein 1",
          symbol: "INCA1",
          taxid: 9606
        },
        {
          _id: "1030",
          _score: 0.9556542,
          entrezgene: 1030,
          name: "cyclin dependent kinase inhibitor 2B",
          symbol: "CDKN2B",
          taxid: 9606
        }
      ];

      parentScope.diseaseList = [
        {
          acronym: "ACC",
          name: "adrenocortical cancer",
          positives: 20,
          samples: [],
          mutationsLoading: false
        },
        {
          acronym: "BLCA",
          name: "bladder urothelial carcinoma",
          positives: 11,
          samples: [],
          mutationsLoading: false
        },
        {
          acronym: "CHOL",
          name: "cholangiocarcinoma",
          positives: 33,
          samples: [],
          mutationsLoading: false
        }
      ];
      element = angular.element(`
            <query-overview 
              mutations-set='mutationList' 
              disease-set='diseaseList'
              remove-param="removeParamFromQuery"
            />
        `);
      $compile(element)(parentScope);
      parentScope.$digest();

      mutationListings = angular.element(
        element[0].querySelectorAll("mutation-listing")
      );
      diseaseListings = angular.element(
        element[0].querySelectorAll("disease-listing")
      );
    })
  );

  it("renders the proper number of mutationsListing components", () => {
    expect(mutationListings.length).toEqual(parentScope.mutationList.length);
  });

  it("renders the proper number of diseaseListing components", () => {
    expect(diseaseListings.length).toEqual(parentScope.diseaseList.length);
  });

  it('should call "removeParamFromQuery" on parent component with given param ', () => {
    var ctrl = element.isolateScope().$ctrl;

    ctrl.removeParam({
      id: 388324,
      paramRef: "entrezgene",
      paramType: "mutations"
    });
    expect(parentScope.removeParamFromQuery).toHaveBeenCalledWith({
      id: 388324,
      paramRef: "entrezgene",
      paramType: "mutations"
    });
  });
});
