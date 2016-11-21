export default class Disease{
	'ngInject';

	constructor(DiseaseData, idx, dependencies){
		this._dependencies = dependencies;
		this.idx = idx;
		angular.extend(this, DiseaseData);
		// console.log(`Disease::${this.acronym}`);
	}

	populateSamples(){
			// console.log(`Disease::${this.acronym}:populateSamples`);

			return this._dependencies.$http
						.get(`/samples?disease=${this.acronym}`)		
						.then(response=>{
							this.samples = response.data;
							return this;
						})
	}




};
  
