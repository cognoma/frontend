function GenesResource($http, GeneModel, $httpParamSerializer, AppSettings) {
  'ngInject';

  const endpoint = '/genes';

  //mygene.info query endpoint
  let mgGeneInfo_query = (geneQuery ='')=>`${AppSettings.api.geneSearch.base}${geneQuery}&${$httpParamSerializer(AppSettings.api.geneSearch.params)}`;

  const processResponseFor = query=>{
  	return $http.get(query)
  		 		.then(results=>{
  		 			results.data.hits = GeneModel.responseTransformer(results.data.hits);
  		 			return results;
  		 		});
  }



  return{
  	query: ()=>processResponseFor(endpoint),
  	get: (genesQuery)=>processResponseFor(`${endpoint}/${genesQuery}`),
  };
  			
  
}

export default {
  name: 'GenesResource',
  fn: GenesResource
};
