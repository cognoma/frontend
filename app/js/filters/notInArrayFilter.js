function notInArrayFilter($filter, _) {
	'ngInject';
  return function(list, arrayFilter, element){
  		// console.log(`list:`,list)
  		// console.log(`arrayFilter:`,arrayFilter);

        if(Array.isArray(list)){
            return $filter("filter")(list, function(listItem){
                return _.findWhere(arrayFilter, listItem) == undefined;
            });
        }
    };

}

export default {
  name: 'notInArrayFilter',
  fn:   notInArrayFilter
};