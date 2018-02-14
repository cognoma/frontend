const template = require("./queryModal.tpl.html");

const QueryModalComponent = {
  template,
  bindings: {},
  controller: [
    "$log",
    function($log) {
      "ngInject";
      $log = $log.getInstance("QueryModalComponent", true);
      $log.log("");
    }
  ]
};

export default {
  name: "queryModal",
  obj: QueryModalComponent
};
