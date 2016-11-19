export default class Disease{
	'ngInject';

	constructor(DiseaseData, idx, dependencies){
		this._dependencies = dependencies;
		this.idx = idx;
		this.updateCounts = this.populateSampleMutations;
		angular.extend(this, DiseaseData);
		// console.log(`Disease::${this.acronym}`);
	}

	populateSamples(){
			// console.log(`Disease::${this.acronym}:populateSamples`);
			
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
		console.log(`Disease::${this.acronym}:populateSampleMutations`);
		let dfd = this._dependencies.$q.defer();

		let Converter = require("csvtojson").Converter;
		let converter = new Converter({constructResult:false});
		let posCount = 0;
		let selectedMutations = this._dependencies.$rootScope.mutationList;
		let mutationsParams = this._dependencies._.pluck(this._dependencies.$rootScope.mutationList, "symbol").join('+');
		
	
		//record_parsed will be emitted each csv row being processed 
		converter.on("record_parsed", function (jsonObj) {
			let resultRow = jsonObj[Object.keys(jsonObj)[0]]

			selectedMutations.forEach(gene=>{
				if( resultRow.match(gene) ) posCount++;
			});
		});


		converter.on("end_parsed",()=>{
    		// console.log(jsonObj); //here is your result json object 
    		this.positives = posCount;
    		dfd.resolve(this);
		});


		require("request").get(`http://www.cbioportal.org/webservice.do?cmd=getMutationData&genetic_profile_id=${this.acronym.toLowerCase()}_tcga_mutations&gene_list=${mutationsParams}`).pipe(converter);
		
		return dfd.promise;
	}


};
  
