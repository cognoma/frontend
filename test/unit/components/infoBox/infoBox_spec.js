describe('UNIT::component: infoBox', () => {

  let parentScope;
  let element;  
  let state;

  function findIn(element, selector) {
  	return angular.element(element[0].querySelector(selector));
   }
   //load templates from $templateCache
  beforeEach(angular.mock.module('templates'));
  beforeEach(angular.mock.module('app.components'));
 
  
    beforeEach(inject(($compile, $rootScope) => {
        
      parentScope = $rootScope.$new();
      parentScope.desc = 'Lorem ipsum dolor sit amet';

        element = angular.element(`
        	<info-box
            message="{{desc}}"
          ></info-box>
        `);
        $compile(element)(parentScope);
    
        parentScope.$digest();
 
    }));
    
    // Attribute: message
    it('message attr: displays initial state value', () => {
      let message_attrVal = findIn(element, '.js-test-desc').text();
      expect(message_attrVal).toEqual(parentScope.desc);
    });
 
    

});