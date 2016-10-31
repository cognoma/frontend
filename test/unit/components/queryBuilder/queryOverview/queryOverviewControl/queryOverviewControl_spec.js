describe('UNIT::component: queryOverviewControl', () => {

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
    	parentScope.title = 'PARENT_TITLE';
      parentScope.setTitle = 'PARENT_SET-TITLE';
      parentScope.desc = 'Lorem ipsum dolor sit amet';
      parentScope.listType = 'PARENT_LIST-TYPE';

        element = angular.element(`
        	<query-overview-control 
              title="{{title}}" 
              set-title="{{setTitle}}" 
              desc="{{desc}}" 
              list-type="genes" 
              param-list="[{entrezid: 'XXx1x'}, {entrezid: 'ABscd'}, {entrezid: 'Foobar'}]">
          </query-overview-control>
        `);
        $compile(element)(parentScope);
    
        parentScope.$digest();
 
    }));
    
    // Attribute: title
    it('title attr: displays initial state value', () => {
      let title_attrVal = findIn(element, '.js-test-title').text();
      expect(title_attrVal).toEqual(parentScope.title);
    });
 
    it('title attr:: displays changed state value on $digest', () => {
      parentScope.title = 'CHANGED_VALUE';
      parentScope.$digest();
      let title_attrVal = findIn(element, '.js-test-title').text();
      expect(title_attrVal).toEqual('CHANGED_VALUE');
    });




    // Attribute: set-title
    it('set-title attr: displays initial state value', () => {
      let setTitle_attrVal = findIn(element, '.js-test-setTitle').text();
      expect(setTitle_attrVal).toEqual(parentScope.setTitle);
    });
 
    it('set-title attr:: displays changed state value on $digest', () => {
      parentScope.setTitle = 'CHANGED_VALUE';
      parentScope.$digest();
      let setTitle_attrVal = findIn(element, '.js-test-setTitle').text();
      expect(setTitle_attrVal).toEqual('CHANGED_VALUE');
    });


    // Attribute: list-type
    xit('list-type attr: displays initial state value', () => {});
    xit('list-type attr: displays changed state value on $digest', () => {});

    // Attribute: description
    xit('desc attr: displays initial state value', () => {});
    xit('desc attr: displays changed state value on $digest', () => {});

    // Attribute: param-list
    xit('param-list attr: displays initial state value', () => {});
    xit('param-list attr:: displays changed state value on $digest', () => {});




});