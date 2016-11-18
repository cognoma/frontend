export default class Disease{
	'ngInject';

	constructor(DiseaseData, idx, dependencies){
		this._dependencies = dependencies;
		this.idx = idx;

		angular.extend(this, DiseaseData);
		// console.log(`Disease::${this.acronym}`);
	}

	populateSamples(){
			console.log(`Disease::${this.acronym}:populateSamples`);
			
			// this._dependencies.$http
			// 	.get('http://www.cbioportal.org/webservice.do?cmd=getMutationData&genetic_profile_id=acc_tcga_mutations&gene_list=ZFPM1')
			// 	.then(data=>{
			// 		console.log(data);
			// 	});

			return this._dependencies.$http
						.get(`/samples?disease=${this.acronym}`)		
						.then(response=>{
							this.samples = response.data;
							return this;
						})

	}

	populateSampleMutations(){

	}


};
  
