describe('Unit: Main', function() {


  beforeEach(function() {
    // instantiate the app module
    angular.mock.module('app');

  });

  
  it('app should exist on window', function() {
    expect(window.app).toBeDefined();
  });


});