const template = require("./notification.tpl.html");

const NotificationComponent = {
  template,
  controller: [
    "$log",
    "$rootScope",
    "$timeout",
    function($log, $rootScope, $timeout) {
      "ngInject";
      $log = $log.getInstance("NotificationComponent", false);
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
