// import * as geneData from '../MockBackend/mockData/mock-genes.js';

export default class Disease{
	'ngInject';

	constructor(DiseaseData){
		// this._dependencies = dependencies;
		this.idx = idx;
		angular.extend(this, DiseaseData);
		console.log(`Disease::${this.acronym}`);
	}

	_generateMutations(){
		let allMutations = this._dependencies._.pluck(geneData.hits, 'entrezgene');
		return this._dependencies._.sample(allMutations, this._dependencies._.random(1, allMutations.length));
	}

	// populateSamples(){
	// 		// console.log(`Disease::${this.acronym}:populateSamples`);
	// 		let self = this;

	// 		return this._dependencies.$http
	// 					.get(`/samples?disease=${this.acronym}`)		
	// 					.then(response=>{

	// 						response.data.map(sample=>{
	// 							sample.mutations = self._generateMutations();
	// 							return sample;
	// 						});

	// 						this.samples = response.data;
	// 						return this;
	// 					});
	// }


	




};
  
