describe('UNIT::component: queryOverview:', () => {
 
  let parentScope;
  let element;  
  let mutationListings;
  let diseaseListings;
  var $componentController;
  

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
            <query-overview mutation-set='mutationList' disease-set='diseaseList'/>
        `);
        $compile(element)(parentScope);      
        parentScope.$digest();

        mutationListings = angular.element(element[0].querySelectorAll('mutation-listing'));
        diseaseListings = angular.element(element[0].querySelectorAll('disease-listing'));

 
    }));
    


    it('renders the proper number of mutationsListing components',()=>{
      expect(mutationListings.length).toEqual(parentScope.mutationList.length);
    });

    it('renders the proper number of diseaseListing components',()=>{
      expect(diseaseListings.length).toEqual(parentScope.diseaseList.length);
    });





});