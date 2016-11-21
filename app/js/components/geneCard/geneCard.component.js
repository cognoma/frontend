const GeneCardComponent = {
    templateUrl: 'geneCard/geneCard.tpl.html',
    bindings: {
      symbol:   '@',
     'entrezId' : '<',
      name:     '@',
      score:    '@',
      link:     '@'
    },
    controller: function() {
      'ngInject';
      this.link = 'balls';
      
    }
}

export default {
	name: 'geneCard',
	obj:  GeneCardComponent
};
