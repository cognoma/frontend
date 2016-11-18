const QueryBuilderComponent = {
    templateUrl: 'queryBuilder/queryBuilder.tpl.html',
    bindings: {},
    controller: ['$rootScope','_',function($rootScope, _) {
            	'ngInject';

            	this.diseaseList = [{id: 'ADRENOCORTICAL CARCINOMA', positives: 10, negatives: 20},{id: 'ADRENOCORTICAL CARCINOMA', positives: 10, negatives: 20},{id: 'ADRENOCORTICAL CARCINOMA', positives: 10, negatives: 20},{id: 'ADRENOCORTICAL CARCINOMA', positives: 10, negatives: 20}];
            	this.mutationList = [];
                
                $rootScope.$on('mutationSet:add', (e,mutation)=>{
                    this.mutationList.push(mutation);
                });

                $rootScope.$on('mutationSet:clear', e=>{
                    this.mutationList = [];
                });

                $rootScope.$on('mutationSet:remove:mutation', (e, mutation)=>{
                    let mutationIndex = _.indexOf(_.pluck(this.mutationList, 'entrezgene'), mutation.entrezId);
                    this.mutationList.splice(mutationIndex, 1);
                });

                $rootScope.$on('mutationSet:sortBy:Id', (e, data)=>{
                    let sortedList = _.sortBy(this.mutationList, 'id');
                    if(!data.sorted){
                        this.mutationList = sortedList;
                    }else{
                        this.mutationList.reverse();
                    }
                });

                
            }]
}

export default {
	name: 'queryBuilder',
	obj: QueryBuilderComponent
};
