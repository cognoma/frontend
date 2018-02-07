const template = require("./notification.tpl.html");

const NotificationComponent = {
  template,
  controller: [
    "$log",
    "$rootScope",
    "$scope",
    "$timeout",
    function($log, $rootScope, $scope, $timeout) {
      "ngInject";
      $log = $log.getInstance("NotificationComponent", true);
      $log.log("");

      let vm = this;

      vm.removeNotification = () => {
        vm.message = "";
        vm.type = "";
      };

      $rootScope.$on("TRIGGERED_NOTIFICATION", (evt, data) => {
        const { message, type } = data;
        vm.message = message;
        vm.type = type;

        $scope.$apply();

        $timeout(() => {
          vm.removeNotification();
        }, 5000);
      });
    }
  ]
};

export default {
  name: "notification",
  obj: NotificationComponent
};
