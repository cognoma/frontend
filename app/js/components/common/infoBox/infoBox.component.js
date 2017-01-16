const infoBoxComponent = {
    templateUrl: 'common/infoBox/infoBox.tpl.html',
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