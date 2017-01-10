import Gene from './Gene.js';

function GeneModel($q, $timeout) {
  'ngInject';
  

  this.responseTransformer = (response)=>{
    return response.map(function(geneResponse, idx){
    	let _gene = new Gene(geneResponse, idx, {$q, $timeout});
    	return _gene.getSupport();
    });      
  }

  
  return this;  
}


export default {
  name: 'GeneModel',
  fn: GeneModel
};
