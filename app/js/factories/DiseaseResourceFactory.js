function DiseaseResource($http, DiseaseModel, $httpParamSerializer, AppSettings) {
  'ngInject';

  const endpoint = '/diseases/';

  const processResponseFor = (query, mutationList)=>{
    console.log(mutationList)
  	return $http
              .get(query)
  		 		    .then(response=>{
  		 		 	       response.data.results = DiseaseModel.responseTransformer(response.data.results, mutationList);
                   
  		 		 	       return response;
  		 		     });
  }



  return{
  	query: (mutationList)=>processResponseFor(endpoint, mutationList),
    // query: () =>$http.get(endpoint).then(response=>response)
  	// get: (searchQuery)=>processResponseFor(`${endpoint}?disease=${searchQuery}`),
    
  };
  			
  
}

export default {
  name: 'DiseaseResource',
  fn: DiseaseResource
};
