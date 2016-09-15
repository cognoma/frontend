const NavBarComponent = {
    templateUrl: 'navbar/navbar.tpl.html',
    controller: function (AppSettings) {
    	'ngInject';
    	let vm = this; 
   		vm.navbarSchema = AppSettings.navbarSchema;
    },
    bindings: {}
}

export default {
name: 'navBar',
obj: NavBarComponent
};