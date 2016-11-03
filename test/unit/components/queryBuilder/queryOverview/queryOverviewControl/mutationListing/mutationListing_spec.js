describe('UNIT::component: mutationListing', () => {

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
      parentScope.listType = 'genes';
      parentScope.mutationsList = [{entrezid: 'XXx1x'}, {entrezid: 'ABscd'}, {entrezid: 'Foobar'}];
      

        element = angular.element(`
          <div>
        	   <mutation-listing                
                ng-repeat="setParam in mutationsList"
                entrezid="{{setParam.entrezid}}"
              ></mutation-listing>
            </div>
        `);
        
        
        $compile(element)(parentScope).isolateScope();
        
        parentScope.$digest();

    }));
    
    // Attribute: title
    it('title entrezid: displays initial state value', () => {
      let entrezid_attrVal = findIn(element, '.js-test-entrezid').text();
      let entrezidEl = findIn(element, '.js-test-entrezid');

      expect(entrezidEl).toBeDefined();
        // expect(entrezid_attrVal).toEqual();
    });

   
  it('repeats proper number of elements in paramList', () => {
      parentScope.mutationsList = [{entrezid: 'aa1a'}];
      parentScope.$digest();
 
      let mutationListings = angular.element(element[0].querySelectorAll('mutation-listing'));
      // make sure all of the listings get rendered
      expect(mutationListings.length).toEqual(parentScope.mutationsList.length);

    });




});