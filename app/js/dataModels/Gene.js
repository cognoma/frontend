export default class Gene{
	'ngInject';

	constructor(GeneData, idx, dependencies){
		// console.log(`Gene::${GeneData.symbol}`);
		this._dependencies = dependencies;

		this.idx = idx;
		this.congnoma_supported = false;

		angular.extend(this, GeneData);
	}

	getSupport(){

		// mock server response time
		let dfd = this._dependencies.$q.defer();
		// this._dependencies.$timeout(()=>{
		// 	this.congnoma_supported = typeof this.entrezgene == 'number' ? true :false;
		// 	console.log(`Gene::${this.symbol}:geSupport:${this.congnoma_supported}`);
		// 	dfd.resolve(this);
		// }, 250*this.idx);

		this.congnoma_supported = typeof this.entrezgene == 'number' ? true :false;
		// console.log(`Gene::${this.symbol}:geSupport:${this.congnoma_supported}`);
		dfd.resolve(this);


		// console.log(`check support for: ${entrezID}`);
		return dfd.promise;
	}


};
  
