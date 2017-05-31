describe('UNIT::component: querySetMutations:',()=>{

 let parentScope;
  let element;  
  let mutationListings;
  let diseaseListings;
  var $componentController;
  let $_rootScope;
  

  function findIn(element, selector) {
  	return angular.element(element[0].querySelector(selector));
   }


   //load templates from $templateCache
  beforeEach(angular.mock.module('app'));
  beforeEach(angular.mock.module('app.components'));
  beforeEach(inject(function(_$componentController_) {
    $componentController = _$componentController_;
  }));
  beforeEach(inject(($compile, $rootScope) => {
      	$_rootScope = $rootScope;
        parentScope = $rootScope.$new();
        parentScope.mutationList =[
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

        element = angular.element(`
            <query-set-mutations mutations-set="mutationList" />
        `);

        $compile(element)(parentScope);      
        parentScope.$digest();

 
    }));


  it('should display the proper number mutationList', ()=>{
  	let geneCards = angular.element(element[0].querySelectorAll('.gene-card'));
  	expect(geneCards.length).toEqual(parentScope.mutationList.length);
  });


  // TODO: better left for E2E testing 
  xit('should highlight the hovered gene', ()=>{
  	let ctrl = element.isolateScope().$ctrl;
  	expect(ctrl.geneHovered).toEqual(false);

  	let mutationLabels = angular.element(element[0].querySelectorAll('.gene-label'));
  	expect(mutationLabels.length).toEqual(parentScope.mutationList.length);

  	angular.element(mutationLabels[1]).triggerHandler('mouseover');
  	parentScope.$digest();
	expect(ctrl.geneHovered).toBeTruthy();
  });




  xdescribe('event emitters: ',()=>{

  	it('sortMutations("symbol") fires mutationSet:sort event ', ()=>{
        const mutationSort_spy = jasmine.createSpy('mutationSort_spy');
        $_rootScope.$on('mutationSet:sort', mutationSort_spy);
        
        const emitEventButton = findIn(element, '.glyphicon-sort');
        emitEventButton.triggerHandler('click');

        expect(mutationSort_spy).toHaveBeenCalledWith(jasmine.anything(), {sortOn: 'symbol'});
      });



  	it('clearMutationSet() fires mutationSet:clear event ', ()=>{
        const mutationClear_spy = jasmine.createSpy('mutationClear_spy');
        $_rootScope.$on('mutationSet:clear', mutationClear_spy);
        
        const emitEventButton = findIn(element, '.clear-button');
        emitEventButton.triggerHandler('click');

        expect(mutationClear_spy).toHaveBeenCalled();
      });

  });



});