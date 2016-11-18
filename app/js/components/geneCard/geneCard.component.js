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
      console.log(this);
      
    }
}

export default {
	name: 'geneCard',
	obj:  GeneCardComponent
};
