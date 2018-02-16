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
        $log.log(`removed`);
        vm.message = "";
        vm.type = "";
      };

      $rootScope.$on("TRIGGERED_NOTIFICATION", (evt, data) => {
        const { message, type, isDismissable = false } = data;
        $log.log(`triggered: ${type} message=${message}`);

        vm.message = message;
        vm.type = type;

        if (isDismissable) {
          $timeout(() => {
            vm.removeNotification();
          }, 5000);
        }
      });
    }
  ]
};

export default {
  name: "notification",
  obj: NotificationComponent
};
