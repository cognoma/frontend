const QueryBuilderComponent = {
    templateUrl: 'queryBuilder/queryBuilder.tpl.html',
    bindings: {},
    controller: ["$timeout",function($timeout) {
            	'ngInject';
            	this.diseaseList = [{id: 'ADRENOCORTICAL CARCINOMA', positives: 10, negatives: 20},{id: 'ADRENOCORTICAL CARCINOMA', positives: 10, negatives: 20},{id: 'ADRENOCORTICAL CARCINOMA', positives: 10, negatives: 20},{id: 'ADRENOCORTICAL CARCINOMA', positives: 10, negatives: 20}];
            	this.mutationList = [{id: 'xxx1x', name: 'gene name', desc: 'a desc', link: 'cardlink'},{id: 'xxx2x', name: 'gene name', desc: 'a desc', link: 'cardlink'},{id: 'xxx3x', name: 'gene name', desc: 'a desc', link: 'cardlink'}];   
            	$timeout(()=>{	
            		this.mutationList = [{id: 'xxx1x', name: 'gene name', desc: 'a desc', link: 'cardlink'}];   
            	}, 2000);
            }]
}

export default {
	name: 'queryBuilder',
	obj: QueryBuilderComponent
};
