import angular from 'angular';

const bulk = require('bulk-require');
const modelsModule = angular.module('app.models', []);
const models = bulk(__dirname, ['./**/!(*index|*.spec).js']);

function declare(serviceMap) {
  Object.keys(serviceMap).forEach((key) => {
    let item = serviceMap[key];

    if (!item) {
      return;
    }

    if (item.fn && typeof item.fn === 'function') {
      modelsModule.factory(item.name,  item.fn);
    } else {
      declare(item);
    }
  });
}

declare(models);

export default modelsModule;
