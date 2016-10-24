const GeneCardComponent = {
    templateUrl: 'geneCard/geneCard.tpl.html',
    bindings: {
      id: '@',
      name: '@',
      desc: '@',
      link: '@',
    },
    transclude: true,
    controller: function() {
      this.link = 'balls';
      'ngInject';
    }
}

export default {
	name: 'geneCard',
	obj: GeneCardComponent
};
