describe('Unit: Constants', function() {

  let constants;

  beforeEach(function() {
    // instantiate the app module
    angular.mock.module('app');

    // mock the directive
    angular.mock.inject((AppSettings) => {
      constants = AppSettings;
    });
  });

  constants = {
        app:{
          title: 'Cognoma',
          version: '0.0.1'
        },
      
        api:{
          baseUrl: '/api/v1',
        }
      
      };

  it('should exist', function() {
    expect(constants).toBeDefined();
  });

  it('should have an application title', function() {
    expect(constants.app.title).toEqual('Cognoma');
  });

  it('should have an application version', function() {
    expect(constants.app.version).toEqual('0.0.1');
  });


});