describe("UNIT::component: notification:", () => {
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

      spyOn($_rootScope, "$emit").and.callThrough();

      element = angular.element(`
          <notification></notification>        
        `);

      $compile(element)(parentScope);

      controller = element.controller("notification");

      parentScope.$digest();
    })
  );

  it("shows notification when triggered by a 'TRIGGERED_NOTIFICATION' $emit event", () => {
    $_rootScope.$emit("TRIGGERED_NOTIFICATION", {
      type: "success",
      message: "This is a success message"
    });

    console.log(controller.message);
  });
});
