const template = require('./navGlobal.tpl.html');

const NavGlobalComponent = {
    template,
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
