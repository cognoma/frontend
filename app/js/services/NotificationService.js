function NotificationService($log, $rootScope) {
  "ngInject";
  $log = $log.getInstance("NotificationService", true);
  $log.log("");

  const service = {};

  /**
   * Component calls this function to emit a global event that trigger a global notification
   * @param  {object} args - An object of notification properties
   *              | - {string} type - type of notification (i.e. "success")
   *              | - {string} message - message of notification, can contain HTML
   *              | - {boolean} isAutoDismiss (default: false) - does this notification auto dismiss itself?
   */
  service.notify = args => {
    $rootScope.$emit("TRIGGERED_NOTIFICATION", args);
  };

  return service;
}

export default {
  name: "NotificationService",
  fn: NotificationService
};
