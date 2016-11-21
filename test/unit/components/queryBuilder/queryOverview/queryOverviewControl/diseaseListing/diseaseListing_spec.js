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
      parentScope.diseaseList = [
        {
        'acronym': 'ACC',
        'name':    'adrenocortical cancer',
        'positives': 16,
        'samples':[
              {
                sample_id:     'TCGA-AX-A05W-01',
                disease:       'UCEC',
                mutations:     [],
                gender:        'Female',
                age_diagnosed: 60
              }
          ]
        }
      ];
      

        element = angular.element(`
          <div>
              <disease-listing
                ng-repeat="disease in diseaseList"
                name="{{disease.acronym}}"
                samples="disease.samples"
                positives="disease.positives"
                is-loading="disease.mutationsLoading"
              ></disease-listing>

            </div>
        `);
        
        
        $compile(element)(parentScope).isolateScope();
        
        parentScope.$digest();

    }));
    
    // Attribute: title
    it('shows the acronym of the diesase', () => {
      let title_attrVal = findIn(element, '.js-test-name').text();
      let titleEl = findIn(element, '.js-test-name');
      
      expect(titleEl).toBeDefined();
      expect(title_attrVal).toEqual(parentScope.diseaseList[0].acronym);
    });


    it('shows total number of samples', () => {
      
      let sampleCountEl = findIn(element, '.js-test-sampleCount');
      let sampleCount_Val = findIn(element, '.js-test-sampleCount').text();
      
      expect(sampleCountEl).toBeDefined();
      var sampleCount = parentScope.diseaseList[0].samples.length;
      expect(+sampleCount_Val).toEqual(sampleCount);
    });



    it('shows the number of negatives', () => {
      
      let negativesCountEl = findIn(element, '.js-test-negatives');
      let negativesCount_Val = findIn(element, '.js-test-negatives').text();
      
      let negs = parentScope.diseaseList[0].samples.length - parentScope.diseaseList[0].positives;

      expect(negativesCountEl).toBeDefined();
      expect(+negativesCount_Val).toEqual(negs);
    });



    it('shows the number of positives', () => {
      
      let positivesCountEl = findIn(element, '.js-test-positives');
      let positivesCount_Val = findIn(element, '.js-test-positives').text();
      
      expect(positivesCountEl).toBeDefined();
      expect(+positivesCount_Val).toEqual(parentScope.diseaseList[0].positives);
    });



    

   
  it('repeats proper number of elements in paramList', () => {
      parentScope.diseaseList = [{id: 'CCCC', positives: 100, negatives: 20},{id: 'DDDDDD', positives: 250, negatives: 20}];
      parentScope.$digest();
 
      let diseaseListings = angular.element(element[0].querySelectorAll('disease-listing'));
      // make sure all of the listings get rendered
      expect(diseaseListings.length).toEqual(parentScope.diseaseList.length);

    });




});