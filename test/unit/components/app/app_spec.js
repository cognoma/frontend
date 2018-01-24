describe('Unit: Component: App', function() {

  let element,
      queryBuilder,
      scope,
      parentScope,
      $componentController,
      ctrl;

  beforeEach(angular.mock.module('app'));

  beforeEach(inject(function(_$componentController_) {
    $componentController = _$componentController_;
  }));


  beforeEach(function() {
    
    angular.mock.inject(($compile, $rootScope) => {
      scope = $rootScope;
     
      element = angular.element(
        `<app id="app"  class="row"></app>`
      );

      $compile(element)(scope);
    });
  });



  
 
it('should render the app element',()=>{
  expect(element).not.toEqual(undefined);
});


it('should have a STATE object attached to the controller',()=>{
  ctrl = $componentController('app', {scope:scope},null);
  
  expect(ctrl.STATE).toBeDefined();

  expect(ctrl.STATE.query).toEqual({
                                      title:     '',
                                      mutations: [],
                                      diseases:  []
                                    });
});



});

