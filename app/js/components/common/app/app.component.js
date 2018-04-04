const template = require("./app.tpl.html");

const AppComponent = {
  template,
  bindings: {},
  controller: [
    "$rootScope",
    "$scope",
    "$log",
    "UserAuth",
    "NotificationService",
    function($rootScope, $scope, $log, UserAuth, NotificationService) {
      "ngInject";
      $log = $log.getInstance("AppComponent", false);
      $log.log("");

      this.$onInit = () => {
        UserAuth.login().then(authenticatedUser => {
          this.STATE.user = authenticatedUser;

          NotificationService.notify({
            type: "success",
            message: `Logged in as <strong>${authenticatedUser.name}</strong>`,
            isAutoDismiss: true
          });
        });
      };

      const initialState = {
        query: {
          title: "",
          mutations: [],
          diseases: []
        },
        user: {}
      };

      this.STATE = angular.copy(initialState);

      $rootScope.$on("QUERY_SUBMITTED", () => {
        this.STATE.query = angular.copy(initialState.query);
      });
    }
  ]
};

export default {
  name: "app",
  obj: AppComponent
};
