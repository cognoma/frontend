describe('UNIT::component: progressIndicatorBar:', () => {

  let $componentController,
      $sessionStorage,
      parentScope,
      element,  
      $_rootScope;

 

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
    
  
   
  it('repeats proper number of elements in progressIndicators', () => {
      
      parentScope.$digest();
 
      let indicators = angular.element(element[0].querySelectorAll('.prgs-indct-bar-step'));
      // make sure all of the listings get rendered
      expect(indicators.length).toEqual(parentScope.progressIndicators.length);

    });


  it('advances the active state to the next index', () => {
      // test the advance method
      var ctrl = element.isolateScope().$ctrl;
      // should return the next active state object
      expect(ctrl.advance()).toEqual(parentScope.progressIndicators[1]);
      
      // make sure active states are set properly 
      expect(parentScope.progressIndicators[0].active).toBe(true);
      expect(parentScope.progressIndicators[1].active).toBe(true);
      expect(parentScope.progressIndicators[2].active).toBe(false);
  });


  it('takes the current active step and sets it to inactive ',()=>{
    // test the goBack method
    var ctrl = element.isolateScope().$ctrl;
    ctrl.advance();
    expect(ctrl.goBack()).toEqual(parentScope.progressIndicators[0]);
    expect(parentScope.progressIndicators[1].active).toBe(false);
    expect(parentScope.progressIndicators[0].active).toBe(true);
    
  });


  it('should activate and return the given step', ()=>{
    // test the goTo method
    // test the goBack method
    var ctrl = element.isolateScope().$ctrl;
    ctrl.goTo(parentScope.progressIndicators[2]);

    expect(ctrl.goTo(parentScope.progressIndicators[2])).toEqual(parentScope.progressIndicators[2]);

    expect(parentScope.progressIndicators[0].active).toBe(true);
    expect(parentScope.progressIndicators[1].active).toBe(true);
    expect(parentScope.progressIndicators[2].active).toBe(true);
    
    
  });


  

});