function OnRun($rootScope, AppSettings) {
  'ngInject';

  // change page title based on state
  $rootScope.$on('$stateChangeSuccess', (event, toState) => {
    $rootScope.pageTitle = '';
    $rootScope.pageTitle += AppSettings.app.title;

    if (toState.title) {
      $rootScope.pageTitle += ' \u2014 ';
      $rootScope.pageTitle += toState.title;
    }
  });

}

export default OnRun;
