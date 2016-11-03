describe('UNIT::component: diseaseListing', () => {

  let parentScope;
  let element;  
  let state;


  function findIn(element, selector) {
  	return angular.element(element[0].querySelector(selector));
   }


   //load templates from $templateCache
  beforeEach(angular.mock.module('templates'));
  beforeEach(angular.mock.module('app.components'));
 
  
    beforeEach(inject(($compile, $rootScope) => {
      
      parentScope = $rootScope.$new();
      parentScope.listType = 'genes';
      parentScope.diseaseList = [{id: 'ADRENOCORTICAL CARCINOMA', positives: 10, negatives: 20},{id: 'BBBB', positives: 15, negatives: 20},{id: 'CCCC', positives: 100, negatives: 20},{id: 'DDDDDD', positives: 250, negatives: 20}];
      

        element = angular.element(`
          <div>
        	   <disease-listing
                ng-repeat="setParam in diseaseList"
                name="{{setParam.id}}"
                positives="setParam.positives"
                negatives="setParam.negatives"
              ></disease-listing>
            </div>
        `);
        
        
        $compile(element)(parentScope).isolateScope();
        
        parentScope.$digest();

    }));
    
    // Attribute: title
    it('name attr: displays initial state value', () => {
      let title_attrVal = findIn(element, '.js-test-name').text();
      let titleEl = findIn(element, '.js-test-name');
      
      expect(titleEl).toBeDefined();
      expect(title_attrVal).toEqual(parentScope.diseaseList[0].id);
    });

    it('shows the number of negatives', () => {
      
      let negativesCountEl = findIn(element, '.js-test-negatives');
      let negativesCount_Val = findIn(element, '.js-test-negatives').text();
      
      expect(negativesCountEl).toBeDefined();
      expect(+negativesCount_Val).toEqual(parentScope.diseaseList[0].negatives);
    });

    it('shows the number of positives', () => {
      
      let positivesCountEl = findIn(element, '.js-test-positives');
      let positivesCount_Val = findIn(element, '.js-test-positives').text();
      
      expect(positivesCountEl).toBeDefined();
      expect(+positivesCount_Val).toEqual(parentScope.diseaseList[0].positives);
    });



    it('show total number of samples as a sum of positives and negatives', () => {
      
      let sampleCountEl = findIn(element, '.js-test-sampleCount');
      let sampleCount_Val = findIn(element, '.js-test-sampleCount').text();
      
      expect(sampleCountEl).toBeDefined();
      var sampleCount = parentScope.diseaseList[0].negatives + parentScope.diseaseList[0].positives;
      expect(+sampleCount_Val).toEqual(sampleCount);
    });

   
  it('repeats proper number of elements in paramList', () => {
      parentScope.diseaseList = [{id: 'CCCC', positives: 100, negatives: 20},{id: 'DDDDDD', positives: 250, negatives: 20}];
      parentScope.$digest();
 
      let diseaseListings = angular.element(element[0].querySelectorAll('disease-listing'));
      // make sure all of the listings get rendered
      expect(diseaseListings.length).toEqual(parentScope.diseaseList.length);

    });




});