const template = require('./querySetDiseaseType.tpl.html');

const QuerySetDiseaseTypeComponent = {
    template,
    bindings: {
      'diseaseSet':  '<',
      'clearSet':     '&',
      'sortSet':      '&'
    },
    controller:['$rootScope','_','$log', function ($rootScope,_, $log) {
          'ngInject';
          $log = $log.getInstance('QuerySetDiseaseTypeComponent', true);
          $log.log('');

          let vm = this;
          
          vm.samplesTotal = ()=>{
            let samplesFlattened = _.pluck(this.diseaseSet, 'samples').map(samples=>{
              return (typeof samples  == 'number' ? samples : samples.length);
            });

            return _.reduce(samplesFlattened, (a,b)=>a+b);
          }

          vm.setTotalFor = setParam=>_.reduce(_.pluck(this.diseaseSet, setParam), (a,b)=>a+b);

        }]
}

export default {
	name: 'querySetDiseaseType',
	obj: QuerySetDiseaseTypeComponent
};
