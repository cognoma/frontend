

const childComponentSpy = componentSpyOn('queryBuilder');

describe('Unit: Component: App', function() {
    

  let element;
  let scope;
  var $componentController;
  let ctrl;

  beforeEach(angular.mock.module('app', childComponentSpy));
  beforeEach(inject(function(_$componentController_) {
    $componentController = _$componentController_;
  }));

  beforeEach(function() {
    
    // angular.mock.module('app');

    angular.mock.inject(($compile, $rootScope) => {
      scope = $rootScope;
      
      ctrl = $componentController('app', {scope}, {STATE:{
        query:{
          mutations:[
          {
            '_id':        '4331',
            '_score':     17.74919,
            'entrezgene': 4331,
            'name':       'MNAT1, CDK activating kinase assembly factor',
            'symbol':     'MNAT1',
            'taxid':      9606
          }],
          diseaeses:[
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
      ]
        }
      }});


      element = angular.element(
        `<nav-global
            id="nav-global"
            class="dashboard-column 
                   col-xs-1 
                   col-sm-1 
                   col-lg-1"
          >
          </nav-global>

          <ui-view></ui-view>
        `
      );

      $compile(element)(scope);
      scope.$digest();
    });
  });




  it('passes parentAttr.someField to a child', () => {    
 
    console.log(childComponentSpy.bindings);
    const childAttrValue = childComponentSpy.bindings[0].mutationsSet;
    expect(childAttrValue).toEqual([
      {
            '_id':        '4331',
            '_score':     17.74919,
            'entrezgene': 4331,
            'name':       'MNAT1, CDK activating kinase assembly factor',
            'symbol':     'MNAT1',
            'taxid':      9606
          }]);
 
  });



  // it('should bind itself to the element', function() {
  //   element.triggerHandler('click');
  //   expect(window.alert).toHaveBeenCalledWith(`Element clicked: ${scope.message}`);
  // });

  // xit('should update its bindings', function() {
  //   scope.message = 'A new sample message';
  //   scope.$digest();
  //   element.triggerHandler('click');
  //   expect(window.alert).toHaveBeenCalledWith(`Element clicked: ${scope.message}`);
  // });

  // it('should bind a title property to its template', function() {
  //   expect(element.find('h1').text()).toBe(`Directive title: ${scope.title}`);
  // });

});
