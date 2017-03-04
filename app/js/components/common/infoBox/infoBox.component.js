const template = require('./infoBox.tpl.html');

const infoBoxComponent = {
    template,
    bindings: {
    	message: '@',
    },
	transclude: true,
    controller: function () {
    	'ngInject';


    }
}

export default {
	name: 'infoBox',
	obj: infoBoxComponent
};
