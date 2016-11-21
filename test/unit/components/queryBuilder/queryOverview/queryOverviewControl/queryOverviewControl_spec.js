describe('UNIT::component: queryOverviewControl', () => {

  let parentScope;
  let element;  
  let state;
  let mutationListings;
  let diseaseListings;
  var $componentController;


  function findIn(element, selector) {
  	return angular.element(element[0].querySelector(selector));
   }


   //load templates from $templateCache
  beforeEach(angular.mock.module('app'));
  beforeEach(angular.mock.module('templates'));
  beforeEach(angular.mock.module('app.components'));

  beforeEach(inject(function(_$componentController_) {
    $componentController = _$componentController_;
  }));
 
  
    beforeEach(inject(($compile, $rootScope) => {
      
      parentScope = $rootScope.$new();
    	parentScope.title = 'Mutations';
      parentScope.setTitle = 'Gene Set';
      parentScope.desc = 'Lorem ipsum dolor sit amet';
      parentScope.listType = 'mutations';
      parentScope.mutationsList = [
            {
            '_id':        '4331',
            '_score':     17.74919,
            'entrezgene': 4331,
            'name':       'MNAT1, CDK activating kinase assembly factor',
            'symbol':     'MNAT1',
            'taxid':      9606
          }
      ];
      

        element = angular.element(`
            <query-overview-control 
                id="#test-overviewCtrl"
                title="{{title}}" 
                set-title="{{setTitle}}" 
                desc="{{desc}}" 
                list-type="{{listType}}" 
                param-list="mutationsList"
            >
            </query-overview-control>
        `);

        var chlidScope = element.find('#test-overviewCtrl').scope();
        
        $compile(element)(parentScope);

      
        parentScope.$digest();

        mutationListings = angular.element(element[0].querySelectorAll('mutation-listing'));
        diseaseListings = angular.element(element[0].querySelectorAll('disease-listing'));
 
    }));
    
    // Attribute: title
    it('shows the title', () => {
      let title_attrVal = findIn(element, '.js-test-title').text();
      let titleEl = findIn(element, '.js-test-title');
        expect(titleEl).toBeDefined();
        expect(title_attrVal).toEqual(parentScope.title);
    });

   
    // Attribute: set-title
    it('shows the set title', () => {
      let setTitle_el = findIn(element, '.query-overview--control-setTitle');
        expect(setTitle_el).toBeDefined();
        expect(setTitle_el.text().trim()).toEqual(parentScope.setTitle);
    });
 
  

    // Attribute: description
    it('desc attr: info-box message displays initial state value of desc', () => {
      let infoBoxMesage_attrVal = findIn(element, 'info-box').attr('message');
      expect(infoBoxMesage_attrVal).toEqual(parentScope.desc);
    });
    
    // Attribute: param-list
    it('binds the mutationsList to param-list attr in controller', () => {
      // Here we are passing actual bindings to the component
      var ctrl = $componentController('queryOverviewControl', null, parentScope.mutationsList);
      expect(ctrl).toBeDefined();
      expect(ctrl[0]).toEqual(parentScope.mutationsList[0]); 
    });


    // Attribute: param-list
    it('renders the proper number of mutationListings components from param-list', () => {
      // make sure all of the listings get rendered
      parentScope.$digest();
      expect(mutationListings.length).toEqual(parentScope.mutationsList.length);
      expect(diseaseListings.length).toEqual(0);
      
    });


    it('renders the proper number of mutationListings components from param-list value on $digest', () => {
      parentScope.mutationsList = [
                                    {
                                      '_id': '4331',
                                      '_score': 17.74919,
                                      'entrezgene': 4331,
                                      'name': 'MNAT1, CDK activating kinase assembly factor',
                                      'symbol': 'MNAT1',
                                      'taxid': 9606
                                    },
                                    {
                                      '_id': '388324',
                                      '_score': 15.771275,
                                      'entrezgene': 388324,
                                      'name': 'inhibitor of CDK, cyclin A1 interacting protein 1',
                                      'symbol': 'INCA1',
                                      'taxid': 9606
                                    },
                                    {
                                      '_id': '1030',
                                      '_score': 0.9556542,
                                      'entrezgene': 1030,
                                      'name': 'cyclin dependent kinase inhibitor 2B',
                                      'symbol': 'CDKN2B',
                                      'taxid': 9606
                                    }
                                ];

      parentScope.$digest();
 
      let mutationListings = angular.element(element[0].querySelectorAll('mutation-listing'));
      // make sure all of the listings get rendered
      expect(mutationListings.length).toEqual(parentScope.mutationsList.length);
      expect(diseaseListings.length).toEqual(0);

    });




});