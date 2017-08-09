describe('UNIT::component: diseaseListing:', () => {

  let parentScope;
  let element;  
  let state;
  let $_rootScope;


  function findIn(element, selector) {
    let el = element[0] ? element[0] : element;
  	return angular.element(el.querySelector(selector));
   }


   
  beforeEach(angular.mock.module('app'));
  // beforeEach(angular.mock.module('app.components'));

  
 
  
    beforeEach(inject(($compile, $rootScope) => {
      $_rootScope = $rootScope;
      parentScope = $rootScope.$new();

      parentScope.listType = 'disease';

      parentScope.paramList = [
        {
        'acronym': 'ACC',
        'name':    'adrenocortical cancer',
        'positives': 16,
        'negatives': -15,
        'mutationsLoading':false,
        'samples':[{}]
        }
      ];

      parentScope.removeParam = jasmine.createSpy('onRemoveParam');
      

        element = angular.element(`
          <div>

              <disease-listing
                ng-if="listType == 'disease'"
                ng-repeat="disease in paramList | orderBy : 'positives' : true "
                name="{{::disease.name}}"
                samples="disease.samples"
                positives="disease.positives"
                negatives="disease.negatives"
                is-loading="disease.mutationsLoading"
                on-remove-param="removeParam({id, paramRef,paramType})"
              ></disease-listing>

            </div>
        `);
        
        
        $compile(element)(parentScope).isolateScope();
        
        parentScope.$digest();

    }));
    
    // Attribute: title
    it('shows the name of the disease', () => {
      let title_attrVal = findIn(element, '.js-test-name').text();
      let titleEl = findIn(element, '.js-test-name');
      
      expect(titleEl).toBeDefined();
      expect(title_attrVal).toEqual(parentScope.paramList[0].name);
    });


    it('shows total number of samples', () => {
      let sampleCountEl = findIn(element, '.js-test-sampleCount');
      let sampleCount_Val = findIn(element, '.js-test-sampleCount').text();
      
      expect(sampleCountEl).toBeDefined();
      var sampleCount = parentScope.paramList[0].samples.length;
      expect(+sampleCount_Val).toEqual(sampleCount);
    });



    it('shows the number of negatives', () => {
      let negativesCountEl = findIn(element, '.js-test-negatives');
      let negativesCount_Val = findIn(element, '.js-test-negatives').text();
      
      let negs = parentScope.paramList[0].samples.length - parentScope.paramList[0].positives;

      expect(negativesCountEl).toBeDefined();
      expect(+negativesCount_Val).toEqual(negs);
    });



    it('shows the number of positives', () => {
      let positivesCountEl = findIn(element, '.js-test-positives');
      let positivesCount_Val = findIn(element, '.js-test-positives').text();
      expect(positivesCountEl).toBeDefined();
      expect(+positivesCount_Val).toEqual(parentScope.paramList[0].positives);
    });

   
    it('repeats proper number of elements in paramList in desc order by "positives"', () => {

      parentScope.paramList =[
          {
            'acronym': 'ACC',
            'name':    'adrenocortical cancer',
            'positives': 16,
            'negatives': -13,
            'mutationsLoading':false,
            'samples':[{}, {}, {}]
          },
          {
            'acronym': 'BLCA',
            'name': 'bladder urothelial carcinoma',
            'positives': 1,
            'negatives': 1,
            'mutationsLoading':false,
            'samples':[{}]
          },
          {
            'acronym': 'BRCA',
            'name': 'breast invasive carcinoma',
            'positives': 3,
            'negatives': 3,
            'mutationsLoading':false,
            'samples':[{}, {}, {}, {}, {}, {}]
          }];
      parentScope.$digest();
 
      let diseaseListings = angular.element(element[0].querySelectorAll('disease-listing'));
      // make sure all of the listings get rendered
      expect(diseaseListings.length).toEqual(parentScope.paramList.length);

      // test order by 'positives' on ng-repeat
      let secondNameAttrVal = findIn(diseaseListings[1], '.js-test-name').text();
      expect(secondNameAttrVal).toEqual(parentScope.paramList[2].name);

    });

    
    it('should call "removeParam" method on parent component',()=>{
      const removeParamButton = findIn(element, '.glyphicon-remove-circle');
      removeParamButton.triggerHandler('click');
 
      expect(parentScope.removeParam).toHaveBeenCalledWith({id:'adrenocortical cancer',paramRef:'name', paramType:'disease' });
    });

    



});