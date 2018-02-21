describe("UNIT::component: cgTable:", () => {
  let $componentController, $sessionStorage, parentScope, element, $_rootScope;

  function findIn(element, selector) {
    return angular.element(element[0].querySelector(selector));
  }

  beforeEach(angular.mock.module("app"));
  beforeEach(angular.mock.module("app.components"));

  beforeEach(
    inject(function(_$componentController_) {
      $componentController = _$componentController_;
    })
  );

  beforeEach(
    inject(($compile, $rootScope) => {
      $_rootScope = $rootScope;
      parentScope = $rootScope.$new();
      parentScope.columns = [
        {
          name: "Symbol",
          id: "symbol",
          isSortable: true
        },
        {
          name: "Name",
          id: "name",
          isSortable: true
        },
        {
          name: "Entrez ID",
          id: "entrezgene",
          isSortable: true
        },
        {
          name: "Score",
          id: "score",
          isSortable: true
        }
      ];

      element = angular.element(`
          <cg-table></cg-table>        
        `);

      $compile(element)(parentScope);

      parentScope.$digest();
    })
  );
});
