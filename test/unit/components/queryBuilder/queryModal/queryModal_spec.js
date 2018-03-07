describe("UNIT::component: queryModal:", () => {
  let $_componentController,
    $sessionStorage,
    parentScope,
    element,
    controller,
    $_rootScope,
    $_httpBackend;

  beforeEach(angular.mock.module("app"));
  beforeEach(angular.mock.module("app.components"));

  beforeEach(
    inject(($componentController, $compile, $rootScope, $httpBackend) => {
      $_componentController = $componentController;
      $_httpBackend = $httpBackend;
      $_rootScope = $rootScope;
      parentScope = $rootScope.$new();

      spyOn($_rootScope, "$emit").and.callThrough();

      parentScope.isShown = true;

      element = angular.element(`
          <query-modal
            is-shown="isShown"
          ></query-modal>        
        `);

      $compile(element)(parentScope);

      controller = element.controller("queryModal");

      $_httpBackend.whenGET("images/processing.svg").respond(200, "");
      parentScope.$digest();
    })
  );

  it("shows modal when MODAL_OPENED event is $emitted", () => {
    $_rootScope.$emit("MODAL_OPENED");
    expect(controller.isShown).toBe(true);
  });

  it("hides modal when MODAL_CLOSED event is $emitted", () => {
    $_rootScope.$emit("MODAL_CLOSED");
    expect(controller.isShown).toBe(false);
  });

  it("hides modal when close modal button is clicked", () => {
    let submitButton = angular.element(
      element[0].querySelectorAll(".js-close-button")
    );
    submitButton.triggerHandler("click");
    expect(controller.isShown).toBe(false);
  });
});
