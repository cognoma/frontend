xdescribe('Unit: Component: App', function() {
    


  let element;
  let scope;
  
  beforeEach(function() {
    
    // angular.mock.module('app');

    angular.mock.inject(($compile, $rootScope) => {
      scope = $rootScope;
      
      

      element = angular.element(
        `<nav-global
            id="nav-global"
            class="dashboard-column 
                   col-xs-1 
                   col-sm-1 
                   col-lg-1"
          >
          </nav-global>

          <ui-view></ui-view>
        `
      );

      $compile(element)(scope);
      scope.$digest();
    });
  });





  // it('should bind itself to the element', function() {
  //   element.triggerHandler('click');
  //   expect(window.alert).toHaveBeenCalledWith(`Element clicked: ${scope.message}`);
  // });

  // xit('should update its bindings', function() {
  //   scope.message = 'A new sample message';
  //   scope.$digest();
  //   element.triggerHandler('click');
  //   expect(window.alert).toHaveBeenCalledWith(`Element clicked: ${scope.message}`);
  // });

  // it('should bind a title property to its template', function() {
  //   expect(element.find('h1').text()).toBe(`Directive title: ${scope.title}`);
  // });

});
