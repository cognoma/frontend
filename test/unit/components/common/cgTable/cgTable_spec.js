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

      parentScope.data = [
        {
          samples: 78,
          negatives: 78,
          positives: 0,
          acronym: "ACC",
          name: "adrenocortical cancer",
          isLoading: false
        },
        {
          samples: 390,
          negatives: 390,
          positives: 0,
          acronym: "BLCA",
          name: "bladder urothelial carcinoma",
          isLoading: false
        },
        {
          samples: 976,
          negatives: 976,
          positives: 0,
          acronym: "BRCA",
          name: "breast invasive carcinoma",
          isLoading: false
        },
        {
          samples: 193,
          negatives: 193,
          positives: 0,
          acronym: "CESC",
          name: "cervical & endocervical cancer",
          isLoading: false
        },
        {
          samples: 36,
          negatives: 36,
          positives: 0,
          acronym: "CHOL",
          name: "cholangiocarcinoma",
          isLoading: false
        }
      ];

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
          <cg-table
            data="data"
            columns="columns"
          ></cg-table>        
        `);

      $compile(element)(parentScope);

      parentScope.$digest();
    })
  );

  it("displays the correct amount of columns", () => {
    let columnCells = angular.element(
      element[0].querySelectorAll(".cg-table__thead-row th")
    );
    expect(columnCells.length).toEqual(parentScope.columns.length + 1);
  });
});
