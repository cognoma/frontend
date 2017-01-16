const GeneCardComponent = {
    templateUrl: 'geneCard/geneCard.tpl.html',
    bindings: {
      symbol:   '@',
     'entrezId' : '<',
      name:     '@',
      score:    '@',
      link:     '@'
    },
    controller: ['$log',function($log) {
          'ngInject';
          $log = $log.getInstance('GeneCardComponent', false);
          $log.log(`${this.name}`);
          
          this.link = 'link';
          
        }]
}

export default {
	name: 'geneCard',
	obj:  GeneCardComponent
};
