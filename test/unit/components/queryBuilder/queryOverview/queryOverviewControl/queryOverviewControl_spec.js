describe('UNIT::component: queryOverviewControl:', () => {

  let parentScope;
  let element;
  let $state;
  let mutationListings;
  let diseaseListings;
  var $componentController;


var $_locationProvider,
    $_urlRouterProvider,
    $_stateProvider,
    $_rootScope;

  function findIn(element, selector) {
  	return angular.element(element[0].querySelector(selector));
   }


   //load templates from $templateCache
  beforeEach(angular.mock.module('app'));
  beforeEach(angular.mock.module('app.components'));

  beforeEach(inject(function(_$componentController_, _$state_) {
    $componentController = _$componentController_;
    $state = _$state_;
  }));


    beforeEach(inject(($compile, $rootScope) => {
      $_rootScope = $rootScope;
      parentScope = $rootScope.$new();
      parentScope.removeParam = jasmine.createSpy('removeParam');

    	
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
                title="Genes"
                desc="classify samples by their mutation status in selected genes"
                list-type="mutations"
                param-list="mutationsList"
                remove-param="removeParam({id, paramRef, paramType})"
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
      let title_attrVal = findIn(element, '.js-test-title').text().trim();
      let titleEl = findIn(element, '.js-test-title');
        expect(titleEl).toBeDefined();
        expect(title_attrVal).toEqual("Genes (1)");
    });


    

    // Attribute: description
    it('desc attr: tooltip message displays initial state value of desc', () => {
      let infoBoxMesage_attrVal = findIn(element, '.glyphicon-info-sign').attr('uib-tooltip');
      expect(infoBoxMesage_attrVal).toEqual("classify samples by their mutation status in selected genes");
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


    it('active property set based on correct ui.state', ()=>{
      $state.go('app.queryBuilder.mutations');
      parentScope.$digest();
       //Extract the Controller reference from compiled element
      var elementController = element.isolateScope().$ctrl;
      elementController.active = $state.current.name.includes(elementController.listType);
      // Assert
      expect(elementController.active).toBeTruthy();

    });


    it('should call "removeParam" method on parent component',()=>{
      var ctrl = element.isolateScope().$ctrl;

      ctrl.removeParam({id: 4331, paramRef:'entrezgene', paramType:'mutations'});
      expect(parentScope.removeParam).toHaveBeenCalledWith({id: 4331, paramRef:'entrezgene', paramType:'mutations'}); 
      
    });

    




});
