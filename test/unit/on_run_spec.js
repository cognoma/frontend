xdescribe('UNIT: on_run', ()=>{
	let $_rootScope,
		$_state, 
		_AppSettings;

	function goTo(state) {
          $_state.go(state);
          $_rootScope.$digest();
       }

	beforeEach(()=>{
		angular.mock.module('app');
        angular.mock.inject(($rootScope, $state,  AppSettings)=>{
        	$_rootScope = $rootScope;
        	$_state = $state;
			_AppSettings = AppSettings;
        });
	});

	it('should have a pageTitle defined on $rootScope', ()=>{
  		goTo('app');
  		expect($_rootScope.pageTitle).toBeDefined();
  		expect($_rootScope.pageTitle).toBe(_AppSettings.app.title);
	});





});