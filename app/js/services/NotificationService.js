function NotificationService($window, $log, $rootScope) {
  "ngInject";
  $log = $log.getInstance("NotificationService", true);
  $log.log("");

  const service = {};

  service.notify = args => {
    $rootScope.$emit("TRIGGERED_NOTIFICATION", args);
  };

  return service;
}

export default {
  name: "NotificationService",
  fn: NotificationService
};
