describe("UNIT::component: queryParamSelector:", () => {
  let $_componentController,
    $sessionStorage,
    parentScope,
    element,
    controller,
    $_rootScope,
    $_state;

  const unselectedResults = [
    {
      samples: 78,
      negatives: 78,
      positives: 0,
      acronym: "ACC",
      name: "adrenocortical cancer",
      isLoading: false,
      isSelected: false
    },
    {
      samples: 390,
      negatives: 390,
      positives: 0,
      acronym: "BLCA",
      name: "bladder urothelial carcinoma",
      isLoading: false,
      isSelected: false
    },
    {
      samples: 976,
      negatives: 976,
      positives: 0,
      acronym: "BRCA",
      name: "breast invasive carcinoma",
      isLoading: false,
      isSelected: false
    }
  ];

  const selectedResults = angular.copy(unselectedResults);
  selectedResults[0].isSelected = true;

  beforeEach(angular.mock.module("app"));
  beforeEach(angular.mock.module("app.components"));

  beforeEach(
    inject(($componentController, $compile, $rootScope, $state) => {
      $_componentController = $componentController;
      $_rootScope = $rootScope;
      $_state = $state;
      parentScope = $rootScope.$new();

      spyOn($_rootScope, "$emit").and.callThrough();
      $_state.current.name = "app.queryBuilder.mutations";

      parentScope.mutationsSet = [];
      parentScope.diseaseSet = [];

      element = angular.element(`
          <query-param-selector
            mutations-set="mutationsSet"
            disease-set="diseaseSet"
          ></query-param-selector>        
        `);

      $compile(element)(parentScope);

      controller = element.controller("queryParamSelector");

      parentScope.$digest();
    })
  );

  describe("add/remove from query button", () => {
    it("should be disabled when 'Search Results' tab is active and no results are selected", () => {
      controller.activeTab = "search";
      controller.searchResults = unselectedResults;
      expect(controller.isButtonDisabled()).toBe(true);
    });

    it("should be enabled when 'Search Results' tab is active and some results are selected", () => {
      controller.activeTab = "search";
      controller.searchResults = selectedResults;
      expect(controller.isButtonDisabled()).toBe(false);
    });

    it("should be disabled when 'Added to Query' tab is active and no results are selected", () => {
      controller.activeTab = "added";
      controller.mutationsSet = unselectedResults;
      expect(controller.isButtonDisabled()).toBe(true);
    });

    it("should be enabled when 'Added to Query' tab is active and some results are selected", () => {
      controller.activeTab = "added";
      controller.mutationsSet = selectedResults;
      expect(controller.isButtonDisabled()).toBe(false);
    });
  });
});
