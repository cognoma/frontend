const template = require("./app.tpl.html");

const AppComponent = {
  template,
  bindings: {},
  controller: [
    "$scope",
    "$log",
    "UserAuth",
    "NotificationService",
    function($scope, $log, UserAuth, NotificationService) {
      "ngInject";
      $log = $log.getInstance("AppComponent", false);
      $log.log("");

      this.$onInit = () => {
        UserAuth.login().then(authenticatedUser => {
          $scope.$apply(() => {
            this.STATE.user = authenticatedUser;

            NotificationService.notify({
              type: "success",
              message: `Logged in as <strong>${
                authenticatedUser.name
              }</strong>`,
              isAutoDismiss: true
            });
          });
        });
      };

      this.STATE = {
        query: {
          title: "",
          mutations: [],
          diseases: []
        },
        user: {}
      };
    }
  ]
};

export default {
  name: "app",
  obj: AppComponent
};
