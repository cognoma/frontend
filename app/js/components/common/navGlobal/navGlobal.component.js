const template = require('./navGlobal.tpl.html');

const NavGlobalComponent = {
    template,
    controller: ['$log',function ($log) {
        	'ngInject';
        	$log = $log.getInstance('NavGlobalComponent', false);
        	$log.log('');
        }]
}

export default {
	name: 'navGlobal',
	obj:   NavGlobalComponent
};
