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

  it("sets correct notification params when triggered by a 'TRIGGERED_NOTIFICATION' $emit event", () => {
    $_rootScope.$emit("TRIGGERED_NOTIFICATION", {
      type: "success",
      message: "This is a success message",
      isAutoDismiss: true
    });

    expect(controller.type).toEqual("success");
    expect(controller.message).toEqual("This is a success message");
    expect(controller.isAutoDismiss).toBe(true);
  });

  it("auto dismisses notification if isAutoDismiss property is not set in $emit args", () => {
    $_rootScope.$emit("TRIGGERED_NOTIFICATION", {
      type: "success",
      message: "This is a success message"
    });

    expect(controller.isAutoDismiss).toBe(false);
  });
});
