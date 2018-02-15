const template = require("./queryParamSelector.tpl.html");

const QueryParamSelectorComponent = {
  template,
  bindings: {
    onParamSelect: "&",
    onParamRemove: "&",
    mutationsSet: "<",
    diseaseSet: "<"
  },
  controller: [
    "$rootScope",
    "$scope",
    "_",
    "$state",
    "$log",
    "MutationsService",
    "DiseaseService",
    "$filter",
    function(
      $rootScope,
      $scope,
      _,
      $state,
      $log,
      MutationsService,
      DiseaseService,
      $filter
    ) {
      "ngInject";

      $log = $log.getInstance("QueryParamSelectorComponent", false);
      $log.log("");

      const vm = this;
      vm.currentState = () => $state.current.name.split(".")[2];
      vm.activeTab = "search";

      vm.$onInit = () => {
        vm.searchResults = [];
        vm.searchQuery = "";
        vm.isSearching = false;
        vm.getAddedSet = () => {
          if (vm.currentState() === "mutations") {
            return vm.mutationsSet;
          } else {
            return vm.diseaseSet;
          }
        };

        const _mutationColumns = [
          {
            name: "Symbol",
            id: "symbol",
            isSortable: true
          },
          {
            name: "Name",
            id: "name",
            isSortable: true
          },
          {
            name: "Entrez ID",
            id: "entrezgene",
            isSortable: true
          },
          {
            name: "Score",
            id: "score",
            isSortable: true
          }
        ];

        const _diseaseColumns = [
          {
            name: "Name",
            id: "name",
            isSortable: true
          },
          {
            name: "Samples",
            id: "samples",
            isSortable: true,
            showLoading: true
          },
          {
            name: "Positives",
            id: "positives",
            isSortable: true,
            showLoading: true
          },
          {
            name: "Negatives",
            id: "negatives",
            isSortable: true,
            showLoading: true
          }
        ];

        vm.columns =
          vm.currentState() === "mutations"
            ? _mutationColumns
            : _diseaseColumns;

        if (vm.currentState() === "disease") {
          getSearchResults(vm.searchQuery);
        }
      };

      /**
       * Gets the appropriate queried search results from the correct service
       * @param  {string} searchQuery - string to query on
       */
      function getSearchResults(searchQuery) {
        vm.isSearching = true;

        /**
         * pass along the user input query and selected mutations list
         * to the appropriate service
         */
        searchServices[vm.currentState()]
          .query(searchQuery, vm.mutationsSet)
          .then(response => {
            $scope.$apply(() => {
              vm.searchResults = _filteredSearchResults(
                response,
                vm[`${vm.currentState()}Set`]
              );

              if (vm.currentState() === "disease") {
                if (vm.searchResults.length) {
                  vm.searchResults.map(diseaseModel => {
                    diseaseModel.isLoading = true;

                    diseaseModel
                      .getAggregates(vm.mutationsSet)
                      .then(function() {
                        diseaseModel.isLoading = false;
                      });
                  });
                }
              }

              vm.isSearching = false;
            });
          });
      }

      /**
       * Filter our results so we don't return what's already added to the query
       * @param  {Array} rawSearchResults - array of objects returned from search
       * @param {Array} addedSet - array of selected objects added to query
       *
       * @return {Array} array of results filtered by the current state from the query
       */
      let _filteredSearchResults = (rawSearchResults, addedSet) => {
        let comparator = vm.currentState() == "mutations" ? "_id" : "acronym";
        return $filter("notInArrayFilter")(
          rawSearchResults,
          addedSet,
          comparator
        );
      };

      /** @todo : make angular search service to abstract search functionality */
      //matches our search services to state definitions
      const searchServices = {
        mutations: MutationsService,
        disease: DiseaseService
      };

      /**
       * Query parameter search functionality, delegates searching and
       * result transformation to angular services.
       * Returned results get filtered and bound to the local scope
       *
       * @param  {String} searchQuery - user input search string
       * @return {Void}
       */
      vm.onInputChange = searchQuery => {
        $log.info(`query: ${searchQuery}`);
        $scope.$broadcast("SEARCH_QUERY_CHANGED");

        // show all diseases when input is empty
        if (vm.currentState() !== "disease" && searchQuery.length == 0 && !diseaseSet.legnth) {
          vm.searchResults = [];
        } else if (vm.currentState() === "mutations") {
          getSearchResults(searchQuery);
        }
      };

      /**
       * @param  {Object} queryParam - mutation or DiseaseModel
       * @return {Array} of objects
       */
      vm.removeParamFromSearchResults = queryParam => {
        let selectedResult = _.assign({}, queryParam),
          _searchResults = _.assign([], vm.searchResults),
          resultsIndex = null;

        switch (vm.currentState()) {
          case "mutations":
            resultsIndex = _.indexOf(
              _.pluck(_searchResults, "_id"),
              selectedResult._id
            );
            break;

          case "disease":
            resultsIndex = _.indexOf(
              _.pluck(_searchResults, "acronym"),
              selectedResult.acronym
            );
            break;
        }

        // remove item of search resutls
        _searchResults = [
          ..._searchResults.slice(0, resultsIndex),
          ..._searchResults.slice(resultsIndex + 1)
        ];

        vm.searchResults = _searchResults;
        return vm.searchResults;
      };

      /**
       * Checks to see if add to/remove from query button should be disabled
       */
      vm.isButtonDisabled = () => {
        if (vm.activeTab === "search") {
          return !vm.searchResults.some(result => result.isSelected);
        } else {
          return !vm[`${vm.currentState()}Set`].some(
            result => result.isSelected
          );
        }
      };

      /**
       * Returns appropriate button title based on active tab
       * @return {string} - button title
       */
      vm.getButtonTitle = () => {
        if (vm.activeTab === "search") {
          return "Add to query";
        } else {
          return "Remove from query";
        }
      };

      /**
       * Adds selected results to query and filters out the newly added params from search results
       * @param  {Array} selectedParams - selected search params to be added
       */
      function _clickedAddButton(selectedParams) {
        const addedParams = vm.onParamSelect({ selectedParams });
        vm.searchResults = _filteredSearchResults(
          vm.searchResults,
          addedParams
        );
      }

      /**
       * Removes selected params from query and refreshes search results
       * @param  {Array} selectedParams - selected search params to be removed
       */
      function _clickedRemoveButton(selectedParams) {
        const addedParams = vm.onParamRemove({ selectedParams });
      }

      /**
       * Calls the remove/add query functions based on active tab
       */
      vm.clickedButton = () => {
        const _params =
          vm.activeTab === "search"
            ? vm.searchResults
            : vm[`${vm.currentState()}Set`];
        const _selectedParams = _params.filter(param => param.isSelected);
        if (vm.activeTab === "search") {
          _clickedAddButton(_selectedParams);
        } else {
          _clickedRemoveButton(_selectedParams);
        }
      };

      $scope.$on("REMOVED_PARAMS_FROM_QUERY", () => {
        getSearchResults(vm.searchQuery);
      });
    }
  ]
};

export default {
  name: "queryParamSelector",
  obj: QueryParamSelectorComponent
};
