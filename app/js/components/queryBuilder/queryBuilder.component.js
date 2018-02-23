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
        return addedParams;
      };

      /**
       * @param  {Array} selectedParams - Array of mutations or DiseaseModels to be removed
       * @return {Array} - return array of added param objects
       */
      vm.removeParamsFromQuery = selectedParams => {
        const paramType = selectedParams[0].acronym ? "disease" : "mutations",
          addedParams = vm[`${paramType}Set`],
          comparator = paramType === "disease" ? "acronym" : "_id";

        selectedParams.forEach(param => {
          addedParams.splice(
            _.indexOf(
              addedParams,
              _.findWhere(addedParams, { [comparator]: param[comparator] })
            ),
            1
          );

          $log.log(`removeParamFromQuery: ${param.comparator}`);
        });

        if (paramType === "mutations") vm._updateDiseaseListingsCounts();

        $scope.$broadcast("REMOVED_PARAMS_FROM_QUERY");

        return addedParams;
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
            diseaseModel.isLoading = true;

            diseaseModel.getAggregates(vm.mutationsSet).then(function() {
              diseaseModel.isLoading = false;
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
