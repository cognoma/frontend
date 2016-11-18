const DiseaseCardComponent = {
    templateUrl: 'diseaseCard/diseaseCard.tpl.html',
    bindings: {
      id: '@',
      samples: '=',
      positives: '@',
      negatives: '@'
    },
    transclude: true,
    controller: function() {
      this.add = function(n1, n2){
        n1 = Number(n1);
        n2 = Number(n2);
        return n1 + n2;
      }
    	'ngInject';
    }
}

export default {
	name: 'diseaseCard',
	obj: DiseaseCardComponent
};
