describe('UNIT::component: queryBuilder:', () => {
 
  let parentScope;
  let element;  
  let mutationListings;
  let diseaseListings;
  var $componentController;
  let ctrl;  

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

        parentScope.mutations =[
          {
            '_id':        '4331',
            '_score':     17.74919,
            'entrezgene': 4331,
            'name':       'MNAT1, CDK activating kinase assembly factor',
            'symbol':     'MNAT1',
            'taxid':      9606
          }
        ];

      parentScope.diseaes =[
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
      
        ];

        ctrl = $componentController('queryBuilder', {scope:parentScope}, {mutationsSet: parentScope.mutations, diseaseSet: parentScope.diseaes, currentState: ()=>"mutations"});


        element = angular.element(`
            <query-builder 
                id="test-query-builder" 
                class="row"
                mutations-set="mutations"
                disease-set="diseases"
            />
        `);
        $compile(element)(parentScope);      
        parentScope.$digest();

 
    }));
    

    it('should two-way bind the mutationsSet binding',()=>{


        expect(ctrl.mutationsSet).toEqual(parentScope.mutations);
        // ctrl.addParamToQuery( 
        //   {
        //     '_id': '143384',
        //     '_score': 0.94585234,
        //     'entrezgene': 143384,
        //     'name': 'CDK2 associated cullin domain 1',
        //     'symbol': 'CACUL1',
        //     'taxid': 9606
        //   }
        //   );

        

        expect(parentScope.mutations).toEqual(ctrl.mutationsSet);

        // console.log(ctrl.currentState());
        // expect(ctrl.mutationsSet).toEqual(parentScope.mutations);

    });



    xit('clearSet: should clear all items from specified array',()=>{

    });

  

    xdescribe('MutationSet Event Handlers:',()=>{
      let ctrl, mock_mutations;
      beforeEach(()=>{
        ctrl = $componentController('queryBuilder', null);
        mock_mutations =[
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
      });


  
      it('handles mutationSet:add event', () => {
        
        spyOn(ctrl, '_pushResultToSetBy');
        spyOn(ctrl, '_updateDL_mutationData');
        
        parentScope.$emit('mutationSet:add', mock_mutations[0]);
        // parentScope.$digest();
        expect(ctrl._pushResultToSetBy).toHaveBeenCalled();
        expect(ctrl._pushResultToSetBy).toHaveBeenCalledWith({result: mock_mutations[0], set:ctrl.mutationList, param: '_id'});

        expect(ctrl.mutationList.length).toEqual(1);
        expect(ctrl.mutationList[0].entrezgene).toEqual(4331);
        expect(ctrl._updateDL_mutationData).not.toHaveBeenCalled();
      });



      it('handles mutationSet:remove:mutation event', () => {
        
        ctrl.mutationList = mock_mutations;
        // mock gene object structure expected in function
        mock_mutations[1].entrezId = mock_mutations[1].entrezgene;
        // remove second gene from list 
        parentScope.$emit('mutationSet:remove:mutation',mock_mutations[1]);
        
        expect(ctrl.mutationList.length).toEqual(2);
        expect(ctrl.mutationList[1].entrezgene).toEqual(1030);
      });


      it('handles mutationSet:clear event', () => {
        spyOn(ctrl, '_clearSet').and.callThrough();
        ctrl.mutationList = mock_mutations;
        // remove all mutations from list 
        parentScope.$emit('mutationSet:clear');
        // parentScope.$digest();
        expect(ctrl.mutationList.length).toEqual(0);
        expect(ctrl._clearSet).toHaveBeenCalledWith('mutation');
      });



    } );///END MutationsSet Eventes




    xdescribe('DiseaseSet Event Handlers:',()=>{
      let ctrl, mock_diseaess, mock_mutations;

      beforeEach(()=>{
        ctrl = $componentController('queryBuilder', null);

        mock_mutations =[
          {
            '_id':        '4331',
            '_score':     17.74919,
            'entrezgene': 4331,
            'name':       'MNAT1, CDK activating kinase assembly factor',
            'symbol':     'MNAT1',
            'taxid':      9606
          }
        ];

      mock_diseaess =[
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
      
        ];

      });

  
      xit('handles DiseaseSet:add event', () => {
        
        spyOn(ctrl, '_pushResultToSetBy');
        
        parentScope.$emit('diseaseSet:add', mock_diseaess[0]);
        
        // make sure the user has mutations selected before they can select diseases
        // if(mock_mutations.length) expect(ctrl._pushResultToSetBy).toHaveBeenCalledWith({result: mock_diseaess[0], set:ctrl.diseaseList, param: 'acronym'});

        expect(ctrl.diseaseList.length).toEqual(1);
        expect(ctrl.diseaseList[0].name).toEqual('adrenocortical cancer');
      });



      xit('handles disaseSet:remove:disease event', () => {
        ctrl.diseaseList = mock_diseaess;  
        // remove second disease from list 
        // mock the diseaseListing comonent structure
        // that the function expects
        let listingToRemove = {name: ctrl.diseaseList[1].acronym};
        parentScope.$emit('diseaseSet:remove:disease', listingToRemove);
        // parentScope.$digest();
        expect(ctrl.diseaseList.length).toEqual(2);
        expect(ctrl.diseaseList[1].name).toEqual('cholangiocarcinoma');

      });


      /*xit('handles mutationSet:clear event', () => {
        ctrl.diseaseList = mock_diseaess;
        // remove all mutations from list 
        parentScope.$emit('mutationSet:clear');
        expect(ctrl.diseaseList.length).toEqual(0);
      });*/



    } );///END MutationsSet Eventes









});