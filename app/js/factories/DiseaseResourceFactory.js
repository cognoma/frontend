function DiseaseResource($http, DiseaseModel, $httpParamSerializer, AppSettings) {
  'ngInject';

  const endpoint = '/diseases/';

  const processResponseFor = query=>{
  	return $http
              .get(query)
  		 		    .then(response=>{
  		 		 	       response.data.results = DiseaseModel.responseTransformer(response.data.results);
  		 		 	       return response;
  		 		     });
  }



  return{
  	query: ()=>processResponseFor(endpoint),
    // query: () =>$http.get(endpoint).then(response=>response)
  	// get: (searchQuery)=>processResponseFor(`${endpoint}?disease=${searchQuery}`),
    
  };
  			
  
}

export default {
  name: 'DiseaseResource',
  fn: DiseaseResource
};
