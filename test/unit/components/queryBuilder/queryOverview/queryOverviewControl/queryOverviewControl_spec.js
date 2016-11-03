describe('UNIT::component: queryOverviewControl', () => {

  let parentScope;
  let element;  
  let state;
let mutationListings;
let diseaseListings;

  function findIn(element, selector) {
  	return angular.element(element[0].querySelector(selector));
   }


   //load templates from $templateCache
  beforeEach(angular.mock.module('templates'));
  beforeEach(angular.mock.module('app.components'));
 
  
    beforeEach(inject(($compile, $rootScope) => {
      
      parentScope = $rootScope.$new();
    	parentScope.title = 'PARENT_TITLE';
      parentScope.setTitle = 'genes';
      parentScope.desc = 'Lorem ipsum dolor sit amet';
      parentScope.listType = 'PARENT_LIST-TYPE';
      parentScope.mutationsList = [{entrezid: 'XXx1x'}, {entrezid: 'ABscd'}, {entrezid: 'Foobar'}];
      

        element = angular.element(`
        	   <query-overview-control 
                id="overviewCtrl"
                 title="{{title}}" 
                 set-title="{{setTitle}}" 
                 desc="{{desc}}" 
                 list-type="{{setTitle}}" 
                 param-list="mutationsList">
             </query-overview-control>
        `);

        var chlidScope = element.find('#overviewCtrl').scope();
        
        $compile(element)(parentScope);
      
        parentScope.$digest();

        mutationListings = angular.element(element[0].querySelectorAll('mutation-listing'));
        diseaseListings = angular.element(element[0].querySelectorAll('disease-listing'));
 
    }));
    
    // Attribute: title
    it('title attr: displays initial state value', () => {
      let title_attrVal = findIn(element, '.js-test-title').text();
      let titleEl = findIn(element, '.js-test-title');
        expect(titleEl).toBeDefined();
        expect(title_attrVal).toEqual('PARENT_TITLE');
    });

   
    // Attribute: set-title
    // it('set-title attr: displays initial state value', () => {
    //   let setTitle_attrVal = findIn(element, '.js-test-setTitle').text();
    //   expect(setTitle_attrVal).toEqual(parentScope.setTitle);
    // });
 
    
    // Attribute: list-type
    it('list-type attr: displays initial state value', () => {
      let setTitle_attrVal = findIn(element, '.js-test-setTitle').text();
      expect(setTitle_attrVal).toEqual(parentScope.setTitle);
    });
    

    // Attribute: description
    it('desc attr: info-box message displays initial state value of desc', () => {
      let infoBoxMesage_attrVal = findIn(element, 'info-box').attr('message');
      expect(infoBoxMesage_attrVal).toEqual(parentScope.desc);
    });
    

    // Attribute: param-list
    it('param-list::genes attr: displays initial state array', () => {
      // make sure all of the listings get rendered
      expect(mutationListings.length).toEqual(parentScope.mutationsList.length);
      expect(diseaseListings.length).toEqual(0);

    });


  it('param-list attr::genes displays changed state value on $digest', () => {
      parentScope.mutationsList = [{entrezid: 'aa1a'}];
      parentScope.$digest();
 
      let mutationListings = angular.element(element[0].querySelectorAll('mutation-listing'));
      // make sure all of the listings get rendered
      expect(mutationListings.length).toEqual(parentScope.mutationsList.length);
      expect(diseaseListings.length).toEqual(0);

    });




});