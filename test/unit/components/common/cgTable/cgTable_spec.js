describe("UNIT::component: cgTable:", () => {
  let $_componentController,
    $sessionStorage,
    parentScope,
    element,
    controller,
    $_rootScope;

  beforeEach(angular.mock.module("app"));
  beforeEach(angular.mock.module("app.components"));

  beforeEach(
    inject(($componentController, $compile, $rootScope) => {
      $_componentController = $componentController;
      $_rootScope = $rootScope;
      parentScope = $rootScope.$new();

      parentScope.data = [
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
        },
        {
          samples: 193,
          negatives: 193,
          positives: 0,
          acronym: "CESC",
          name: "cervical & endocervical cancer",
          isLoading: false,
          isSelected: false
        },
        {
          samples: 36,
          negatives: 36,
          positives: 0,
          acronym: "CHOL",
          name: "cholangiocarcinoma",
          isLoading: false,
          isSelected: true
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

      controller = element.controller("cgTable");

      parentScope.$digest();
    })
  );

  it("displays the correct number of columns", () => {
    let columnCells = angular.element(element[0].querySelectorAll("th"));
    expect(columnCells.length).toEqual(parentScope.columns.length + 1);
  });

  it("displays the correct number of rows", () => {
    let tableRows = angular.element(element[0].querySelectorAll("tbody tr"));
    expect(tableRows.length).toEqual(parentScope.data.length);
  });

  it("detects if all results are selected", () => {
    expect(controller.areAllResultsSelected()).toBe(false);
  });

  it("selects all results", () => {
    controller.selectAllResults(true);
    const areResultsAllSelected = parentScope.data.every(
      result => result.isSelected === true
    );
    expect(areResultsAllSelected).toBe(true);
  });

  it("unselects all results", () => {
    controller.selectAllResults(false);
    const areResultsAllUnselected = parentScope.data.every(
      result => result.isSelected === false
    );
    expect(areResultsAllUnselected).toBe(true);
  });

  it("sets sortType and sortReverse correctly when sorting", () => {
    controller.sortColumn("Name");
    expect(controller.sortType).toEqual("Name");
    expect(controller.sortReverse).toBe(true);
  });
});
