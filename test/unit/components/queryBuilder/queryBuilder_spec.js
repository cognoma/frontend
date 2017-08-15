describe('UNIT::component: queryBuilder:', () => {
 
  let parentScope;
  let element;  
  let mutationListings;
  let diseaseListings;
  var $componentController;
  let ctrl;
  let bindings;  

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
        parentScope.STATE = {
                              query:{
                                      title:     '',
                                      mutations: [{
                                                  '_id':        '4331',
                                                  '_score':     17.74919,
                                                  'entrezgene': 4331,
                                                  'name':       'MNAT1, CDK activating kinase assembly factor',
                                                  'symbol':     'MNAT1',
                                                  'taxid':      9606
                                                }],
                                      diseases:  [{
                                                        'acronym':          'ACC',
                                                        'name':             'adrenocortical cancer',
                                                        'positives':        20,
                                                        'samples':          [],
                                                        'mutationsLoading': false
                                                      },
                                                      {
                                                        'acronym':          'BLCA',
                                                        'name':             'bladder urothelial carcinoma',
                                                        'positives':        11,
                                                        'samples':          [],
                                                        'mutationsLoading': false
                                                      },
                                                       {
                                                          'acronym':          'CHOL',
                                                          'name':             'cholangiocarcinoma',
                                                          'positives':        33,
                                                          'samples':          [],
                                                          'mutationsLoading': false
                                                        }
                                                  ]
                                    }
                            };

        
      

      bindings = { mutationsSet:parentScope.STATE.query.mutations, 
                       diseaseSet:parentScope.STATE.query.diseases, 
                       currentState:()=>'mutations',
                       _updateDiseaseListingsCounts:()=>{},
                       progressBar:{
                        advance:()=>{},
                        goTo:()=>{}
                       }
                      };

        ctrl = $componentController('queryBuilder', {scope:parentScope}, bindings);


        element = angular.element(`
              <progress-indicator-bar uid="queryBuilderProgress" steps="[]" />

              <query-builder 
                  id="test-query-builder" 
                  class="row"
                  mutations-set="parentScope.STATE.query.mutations"
                  disease-set="parentScope.STATE.query.diseases"
              />
        `);
        $compile(element)(parentScope);      
        parentScope.$digest();

 
    }));



  it('clearSet: should clear all items from given setType',()=>{
      ctrl.clearSet({setType:'mutations'});
      expect(ctrl.mutationsSet.length).toBe(0);
  });

it('should sort the specified set by the passed param name',()=>{
  // rearrange the disease order 

  bindings.diseaseSet =   [
                                        parentScope.STATE.query.diseases[1], 
                                        parentScope.STATE.query.diseases[2],
                                        parentScope.STATE.query.diseases[0]
                                      ];                               
  ctrl = $componentController('queryBuilder', {scope:parentScope}, bindings);
  

  expect(
    ctrl.sortSetOn({sortOn: 'acronym', set:'disease'})  
  ).toEqual([
  {
                                                        'acronym':          'ACC',
                                                        'name':             'adrenocortical cancer',
                                                        'positives':        20,
                                                        'samples':          [],
                                                        'mutationsLoading': false
                                                      },
                                                      {
                                                        'acronym':          'BLCA',
                                                        'name':             'bladder urothelial carcinoma',
                                                        'positives':        11,
                                                        'samples':          [],
                                                        'mutationsLoading': false
                                                      },
                                                       {
                                                          'acronym':          'CHOL',
                                                          'name':             'cholangiocarcinoma',
                                                          'positives':        33,
                                                          'samples':          [],
                                                          'mutationsLoading': false
                                                        }
  ]);


  

});
  
    

  describe('mutationsSet',()=>{

    it('should remove a specified param from the set',()=>{

      expect(ctrl.mutationsSet).toEqual(parentScope.STATE.query.mutations);

      expect(
        ctrl.removeParamFromQuery({paramType:'mutations',id:4331, paramRef:'entrezgene'})
      ).toEqual([]);
      
      expect(ctrl.mutationsSet.length).toEqual(0);
      
    });




    it('should add a specified param to the set',()=>{
      
      expect(ctrl.mutationsSet).toEqual(parentScope.STATE.query.mutations);

      let additionalParam = {
                              '_id':        '388324',
                              '_score':     15.771275,
                              'entrezgene': 388324,
                              'name':       'inhibitor of CDK, cyclin A1 interacting protein 1',
                              'symbol':     'INCA1',
                              'taxid':      9606
                            };

      expect(
        ctrl.addParamToQuery(additionalParam)
      ).toEqual([...parentScope.STATE.query.mutations, additionalParam]);
      
      expect(ctrl.mutationsSet.length).toEqual(2);
      
    });


  });






  describe('diseaseSet',()=>{

    beforeEach(()=>{ ctrl.currentState = ()=>'disease'});

    it('should remove a specified param from the set',()=>{
      expect(ctrl.diseaseSet).toEqual(parentScope.STATE.query.diseases);
      expect(
        ctrl.removeParamFromQuery({paramType:'disease',id:'BLCA', paramRef:'acronym'})
      ).toEqual([{
                      'acronym':          'ACC',
                      'name':             'adrenocortical cancer',
                      'positives':        20,
                      'samples':          [],
                      'mutationsLoading': false
                    },
                   {
                      'acronym':          'CHOL',
                      'name':             'cholangiocarcinoma',
                      'positives':        33,
                      'samples':          [],
                      'mutationsLoading': false
                    }
                    ]);
      
      expect(ctrl.diseaseSet.length).toEqual(2);
      
    });





     it('should add a specified param to the set',()=>{

      expect(ctrl.diseaseSet).toEqual(parentScope.STATE.query.diseases);

      let additionalParam = {
                              "acronym": "SKCM",
                              "name": "skin cutaneous melanoma",
                              'positives':        111,
                              'samples':          [],
                              'mutationsLoading': false
                            };

                            
      expect(
        ctrl.addParamToQuery(additionalParam)
      ).toEqual([...parentScope.STATE.query.diseases, additionalParam]);
      
      expect(ctrl.diseaseSet.length).toEqual(4);
      
    });




  });

    

    







});