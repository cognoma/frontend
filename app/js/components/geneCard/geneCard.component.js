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
          $log = $log.getInstance('GeneCardComponent', true);
          $log.log(`${this.symbol}`);
          
          this.link = 'link';
          
        }]
}

export default {
	name: 'geneCard',
	obj:  GeneCardComponent
};
