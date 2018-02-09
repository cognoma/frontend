const template = require("./queryBuilder.tpl.html");

const QueryBuilderComponent = {
  template,
  bindings: {
    mutationsSet: " = ",
    diseaseSet: " = ",
    user: "          = "
  },
  controller: [
    "$scope",
    "$rootScope",
    "_",
    "DiseaseModel",
    "$state",
    "$timeout",
    "MutationsService",
    "DiseaseService",
    "$log",
    function(
      $scope,
      $rootScope,
      _,
      DiseaseModel,
      $state,
      $timeout,
      MutationsService,
      DiseaseService,
      $log
    ) {
      "ngInject";

      let vm = this;

      $log = $log.getInstance("QueryBuilderComponent", false);
      $log.log("");
      vm.currentState = () => $state.current.name.split(".")[2];
      const progressStateName =
        vm.currentState() == "mutations" ? "genes" : "samples";

      /* =======================================================================
                      querySets: list operations
                    ========================================================================== */

      /**
       * @param  {String} setType - type of query set to manipulate
       *
       * @return {Void}
       */
      vm.clearSet = setType => {
        return (vm[`${setType.setType}Set`] = []);
      };

      /**
       * Checks if set has been sorted by given params
       * @param  {Array}
       * @param  {Array}
       * @param  {String}
       *
       * @return {Boolean}
       */
      let _setIsSorted = (list, sortedList, sortedOn) => {
        return _.isEqual(
          _.pluck(list, sortedOn),
          _.pluck(sortedList, sortedOn)
        );
      };

      /**
       * Sort a set given property
       * if set is already sorted returns a reversed sorted set
       * if is NOT already sorted returns a sorted set
       *
       * @param  {Object} sortParams
       *             |- {String} set - type of query set to manipulate
       *             |- {String} sortOn - the property to sort the array by
       *
       * @return {Array} - array of objects sorted by specified property
       */
      vm.sortSetOn = sortParams => {
        let list = _.assign([], vm[`${sortParams.set}Set`]);
        let sortOn = sortParams.sortOn;
        let sortedList = _.sortBy(list, sortOn);

        vm[`${sortParams.set}Set`] = _setIsSorted(list, sortedList, sortOn)
          ? list.reverse()
          : sortedList;
        return _setIsSorted(list, sortedList, sortOn)
          ? list.reverse()
          : sortedList;
      };

      /**
       * @param  {Array} selectedParams - Array of mutations or DiseaseModels to be added
       * @return {Array | false} Array of objects if queryParam is added,
       *                         false if it already exists in set
       */
      vm.addParamsToQuery = selectedParams => {
        const addedParams = vm[`${vm.currentState()}Set`],
          comparator = vm.currentState() == "mutations" ? "_id" : "acronym";

        const filteredSelectedParams = selectedParams.filter(
          selectedParam =>
            !addedParams.find(
              addedParam => addedParam[comparator] === selectedParam[comparator]
            )
        );

        filteredSelectedParams.forEach(param => {
          addedParams.push(param);
          param.isSelected = false;
        });

        vm._updateDiseaseListingsCounts();

        return vm[`${vm.currentState()}Set`];
      };

      /**
       * @param  {Object} paramData
       *              | - {String} paramType - type of query set to manipulate
       *              | - {String | Number} id - specific identifier for item to remove from query set
       *              | - {String} paramRef - property of object to search the query set by, should be the property type of the id
       *
       * @return {Array} - return the new array for testing
       */
      vm.removeParamFromQuery = selectedParams => {
        /*$log.log(
          `removeParamFromQuery:${paramData.paramType} - ${
            paramData.id
          } ref by ${paramData.paramRef}`
        );
        let currentSet = _.assign([], vm[`${paramData.paramType}Set`]);

        let setIndex = _.indexOf(
          _.pluck(currentSet, paramData.paramRef),
          paramData.id
        );
        $log.log(`removeParamFromQuery:setIndex:${setIndex}`);

        currentSet = [
          ...currentSet.slice(0, setIndex),
          ...currentSet.slice(setIndex + 1)
        ];

        vm[`${paramData.paramType}Set`] = currentSet;

        vm._updateDiseaseListingsCounts();*/

        return vm[`${paramData.paramType}Set`];
      };

      /**
       * Update the positives and negatives count for each disease listing
       * using the DiseaseModel to calculate a new set of aggregate values
       * based on the current user selected query param. sets
       *
       * @return {Void}
       */
      vm._updateDiseaseListingsCounts = () => {
        $log.log(`_updateDiseaseListingsCounts`);
        $log.log(vm.mutationsSet);

        if (vm.diseaseSet.length) {
          vm.diseaseSet.map(diseaseModel => {
            diseaseModel.mutationsLoading = true;

            diseaseModel.getAggregates(vm.mutationsSet).then(function() {
              diseaseModel.mutationsLoading = false;
            });
          }); //END vm.diseaseSet.map
        } //end if
      }; //_updateDiseaseListingsCounts
    }
  ]
};

export default {
  name: "queryBuilder",
  obj: QueryBuilderComponent
};
