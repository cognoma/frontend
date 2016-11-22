const NavGlobalComponent = {
    templateUrl: 'navGlobal/navGlobal.tpl.html',
    controller: ['$log',function ($log) {
        	'ngInject';
        	$log = $log.getInstance('NavGlobalComponent', true);
        	$log.log('');
        }]
}

export default {
	name: 'navGlobal',
	obj:   NavGlobalComponent
};