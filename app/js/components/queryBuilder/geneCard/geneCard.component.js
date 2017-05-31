const template = require('./geneCard.tpl.html');

const GeneCardComponent = {
    template,
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
          // $log.log(`${this.entrezId}`);
          
          this.link = 'link';
          
        }]
}

export default {
	name: 'geneCard',
	obj:  GeneCardComponent
};
