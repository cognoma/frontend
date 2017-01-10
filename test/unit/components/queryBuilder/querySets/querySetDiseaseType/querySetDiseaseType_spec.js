describe('UNIT::component: querySetDiseaseType:',()=>{

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
  beforeEach(angular.mock.module('templates'));
  beforeEach(angular.mock.module('app.components'));
  beforeEach(inject(function(_$componentController_) {
    $componentController = _$componentController_;
  }));
  beforeEach(inject(($compile, $rootScope) => {
      	$_rootScope = $rootScope;
        parentScope = $rootScope.$new();
        parentScope.mutationList = [];
        parentScope.diseaseList =[
          {
            'acronym': 'ACC',
            'name': 'adrenocortical cancer',
            'positives': 20,
            'samples':[],
            'mutationsLoading': false
          },
          {
            'acronym': 'BLCA',
            'name': 'bladder urothelial carcinoma',
            'positives': 11,
            'samples':[],
            'mutationsLoading': false
          },
           {
              'acronym': 'CHOL',
              'name': 'cholangiocarcinoma',
              'positives': 33,
              'samples':[],
              'mutationsLoading': false
            }
      
        ];

        element = angular.element(`
            <query-set-disease-type disease-set="diseaseList" />
        `);

        $compile(element)(parentScope);      
        parentScope.$digest();

 
    }));


  it('should display the proper number mutationList', ()=>{
  	let diseaseCards = angular.element(element[0].querySelectorAll('.disease-card-body'));
  	expect(diseaseCards.length).toEqual(parentScope.diseaseList.length);
  });





  describe('event emitters: ',()=>{

  	it('sortSetBy("positives") fires diseaeSet:sort event ', ()=>{
        const diseaseSetSort_spy = jasmine.createSpy('diseaseSetSort_spy');
        $_rootScope.$on('diseaseSet:sort', diseaseSetSort_spy);
        
        const emitEventButton = findIn(element, '.glyphicon-sort');
        emitEventButton.triggerHandler('click');

        expect(diseaseSetSort_spy).toHaveBeenCalledWith(jasmine.anything(), {sortOn: 'positives'});
      });



  	it('clearDiseaseSet() fires diseaseSet:clear event ', ()=>{
        const diseaseClear_spy = jasmine.createSpy('diseaseClear_spy');
        $_rootScope.$on('diseaseSet:clear', diseaseClear_spy);
        
        const emitEventButton = findIn(element, '.clear-button');
        emitEventButton.triggerHandler('click');

        expect(diseaseClear_spy).toHaveBeenCalled();
      });

  });



});