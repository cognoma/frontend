describe('UNIT::component: mutationListing:', () => {

  let parentScope;
  let element;  
  let state;
  let $_rootScope;


  function findIn(element, selector) {
  	return angular.element(element[0].querySelector(selector));
   }


   beforeEach(angular.mock.module('app'));

  
 
  
    beforeEach(inject(($compile, $rootScope) => {
      $_rootScope = $rootScope;
      parentScope = $rootScope.$new();

      parentScope.removeParam = jasmine.createSpy('onRemoveParam');
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
          <div>
              <mutation-listing
                ng-if="listType == 'mutations' "
                ng-repeat="gene in mutationsList"
                symbol="gene.symbol"
                entrezgene="gene.entrezgene"
                on-remove-param="removeParam({id, paramRef,paramType})"
              ></mutation-listing>
            </div>
        `);
        
        
        $compile(element)(parentScope);
        
        parentScope.$digest();

    }));
    
    // Attribute: title
    it('title entrezgene: displays initial state value', () => {
      let entrezgeneEl = findIn(element, '.query-overview--control-param-title');
      expect(entrezgeneEl).toBeDefined();
      expect(entrezgeneEl.text()).toEqual(parentScope.mutationsList[0].symbol); 
    });

   
  it('repeats proper number of elements in paramList', () => {
      parentScope.mutationsList =[
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

    });


  it('should call "removeParam" method on parent component',()=>{
      const removeParamButton = findIn(element, '.glyphicon-remove-circle');
      removeParamButton.triggerHandler('click');
 
      expect(parentScope.removeParam).toHaveBeenCalledWith({id: 4331, paramRef:'entrezgene', paramType:'mutations'});
    });

  
  

});