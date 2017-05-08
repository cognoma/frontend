describe('UNIT::component: progressIndicatorBar:', () => {
  let $componentController;
  let parentScope;
  let element;  
  let state;
  let $_rootScope;



  function findIn(element, selector) {
  	return angular.element(element[0].querySelector(selector));
   }


   beforeEach(angular.mock.module('app'));
   beforeEach(angular.mock.module('app.components'));
  
    beforeEach(inject(function(_$componentController_) {
      $componentController = _$componentController_;
    }));


    beforeEach(inject(($compile, $rootScope) => {
      $_rootScope = $rootScope;
      parentScope = $rootScope.$new();
      parentScope.progressIndicators = [
                    {
                      title:'Search Genes',  
                      state:'app.queryBuilder.mutations' , 
                      icon:'', 
                      active:true,
                      type: 'icon'
                    },
                    {
                      title:'Add Genes',     
                      state:'app.queryBuilder.mutations' , 
                      icon:'', 
                      active:false,
                      type:'icon'
                    },
                    {
                      title:'Search Samples',
                      state:'app.queryBuilder.disease' ,   
                      icon:'', 
                      active:false,
                      type:'icon'
                    },
                    {
                      title:'Add Samples',  
                      state:'app.queryBuilder.disease' ,   
                      icon:'', 
                      active:false ,
                      type:'icon'
                    }
                   ];

        element = angular.element(`
          <progress-indicator-bar 
            id="prgs-indct-bar" 
            uid="queryBuilderProgress"
            steps="progressIndicators" 
          ></progress-indicator-bar>        
        `);
        
        
        $compile(element)(parentScope);
        
        parentScope.$digest();

    }));
    
    // Attribute: title
    // it('uid: displays initial state value', () => {
    //   let entrezgeneEl = findIn(element, '.query-overview--control-param-title');
    //   expect(entrezgeneEl).toBeDefined();
    //   expect(entrezgeneEl.text()).toEqual(parentScope.mutationsList[0].symbol); 
    // });

   
  it('repeats proper number of elements in progressIndicators', () => {
      
      parentScope.$digest();
 
      let indicators = angular.element(element[0].querySelectorAll('.prgs-indct-bar-step'));
      // make sure all of the listings get rendered
      expect(indicators.length).toEqual(parentScope.progressIndicators.length);

    });


  xit('advances the active state by one index', ($componentController) => {
      var ctrl = $componentController('progressIndicatorBar', null);

      expect(true).toBe(true);
  });


  xdescribe('event emitters:',()=>{

    // it('removeMutation() fires mutationSet:remove:mutation event ', ()=>{
    //    parentScope.mutationsList =[
    //       {
    //         '_id': '4331',
    //         '_score': 17.74919,
    //         'entrezgene': 4331,
    //         'name': 'MNAT1, CDK activating kinase assembly factor',
    //         'symbol': 'MNAT1',
    //         'taxid': 9606
    //       },
    //       {
    //         '_id': '388324',
    //         '_score': 15.771275,
    //         'entrezgene': 388324,
    //         'name': 'inhibitor of CDK, cyclin A1 interacting protein 1',
    //         'symbol': 'INCA1',
    //         'taxid': 9606
    //       },
    //       {
    //         '_id': '1030',
    //         '_score': 0.9556542,
    //         'entrezgene': 1030,
    //         'name': 'cyclin dependent kinase inhibitor 2B',
    //         'symbol': 'CDKN2B',
    //         'taxid': 9606
    //       }

    //     ];
    //     parentScope.$digest();
    //     const mutationSetRemove_spy = jasmine.createSpy('mutationSetRemove_spy');
    //     $_rootScope.$on('mutationSet:remove:mutation', mutationSetRemove_spy);
        
    //     const emitEventButton = findIn(element, '.glyphicon-remove-circle');
    //     emitEventButton.triggerHandler('click');

    //     expect(mutationSetRemove_spy).toHaveBeenCalledWith(jasmine.anything(), {entrezgene: parentScope.mutationsList[0].entrezgene});
    //   });
  })

});