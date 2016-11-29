angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("app/app.tpl.html","<nav-global\n	id=\"nav-global\"\n	class=\"dashboard-column \n		   col-xs-1 \n		   col-sm-1 \n		   col-lg-1\"\n>\n</nav-global>\n\n<ui-view \n	class=\"dashboard-column \n		   col-xs-11\n		   col-sm-11\n		   col-lg-11\">\n</ui-view>\n\n\n\n\n\n\n");
$templateCache.put("diseaseCard/diseaseCard.tpl.html","<div class=\"\n        panel \n        panel-default\n        disease-card\"\n\n      style=\"color: black\"\n>\n      <div class=\"panel-body disease-card-body\">\n      <div class=\"row \">\n        <h5 class=\"col-xs-10 disease-card-title\">{{$ctrl.id}}</h5>\n        <!-- <span class=\"glyphicon glyphicon-info-sign col-xs-2\"></span> -->\n      </div>\n      <div class=\"row disease-card-counts\">\n        <div class=\"col-xs-4 samples\">\n          <h6>SAMPLES</h6>\n          <p class=\"sample-count\">{{$ctrl.samples.length}}</p>\n        </div>\n        <div class=\"col-xs-4 samples positives\">\n          <h6>POSITIVES</h6>\n          <p class=\"sample-pos\">{{$ctrl.positives}}</p>\n        </div>\n        <div class=\"col-xs-4 samples negatives\">\n          <h6>NEGATIVES</h6>\n          <p class=\"sample-neg\">{{$ctrl.negatives}}</p>\n        </div>\n      </div>\n      </div>\n  </div>\n");
$templateCache.put("geneCard/geneCard.tpl.html","<div class=\"panel panel-default gene-card\">\n\n  <div class=\"panel-heading gene-card-heading\">\n    {{$ctrl.symbol}}  <span class=\"label label-default\"><small>{{$ctrl.entrezId}}</small></span>\n  </div>\n\n  <div class=\"panel-body text-left\" style=\"color: black\">\n    <small>{{$ctrl.name}}</small>\n    <a href=\"#\" class=\"card-link\"><h4>{{$ctrl.link}}</h4></a>\n  </div>\n</div>\n<!-- bind the date in here from genCard controller to fill in template with selected gene info -->\n");
$templateCache.put("home/home.tpl.html","\n\n<h1 class=\"heading -large\">{{ $ctrl.title | ExampleFilter }}!</h1>\n\n<h3 class=\"heading -medium\">Here is a fancy number served up courtesy of Angular: <span class=\"number-example\">{{ $ctrl.number }}</span></h3>\n\n<img src=\"images/angular.png\" height=\"100\" />\n<img src=\"images/gulp.png\" height=\"100\" />\n<img src=\"images/browserify.png\" height=\"100\" />\n\n<hr/>\n<div example-directive title=\"WOW!\" click-message=\"You clicked me!\">Directive is not loaded.</div>\n");
$templateCache.put("infoBox/infoBox.tpl.html","<div class=\"row info-box is-open\">\n    <span class=\"col-lg-1 glyphicon glyphicon-info-sign\" aria-hidden=\"true\"></span>\n    <div class=\"col-lg-10 info-box-message js-test-desc\">{{$ctrl.message}}</div>\n    <span class=\"col-lg-1 glyphicon glyphicon-remove-circle text-danger\" aria-hidden=\"true\"></span>\n</div>\n");
$templateCache.put("navGlobal/navGlobal.tpl.html","<ul class=\"nav nav-pills\">\n  <li class=\"nav-pills-item\" role=\"presentation\" >\n  	<a ui-sref=\"app\" href=\"#\">Home</a>\n  </li>\n  <li class=\"nav-pills-item\" role=\"presentation\" ui-sref-active=\"active\">\n  	<a href=\"#\">Profile</a>\n  </li>\n  <li class=\"nav-pills-item\" role=\"presentation\" ui-sref-active=\"active\" >\n  		<a ui-sref=\"app.queryBuilder\" href=\"#\">Query</a>\n   </li>\n</ul>");
$templateCache.put("queryBuilder/queryBuilder.tpl.html","<section\n	ui-view=\"queryOverview\"\n	id=\"query-overview\"\n	class=\"dashboard-column\n		   col-xs-2\n		   col-sm-2\n		   col-lg-2\"\n>\n</section>\n\n\n<section \n	ui-view=\"querySet\"\n	class=\"query-set\n		   dashboard-column\n		   col-xs-3\n		   col-sm-3\n		   col-lg-3\"\n>	\n</section >\n\n\n<section\n	ui-view=\"queryParamSelector\"\n	class=\"query-param-selector\n		   dashboard-column\n		   col-xs-7\n		   col-sm-7\n		   col-lg-7\"\n>\n</section> \n");
$templateCache.put("queryBuilder/queryOverview/queryOverview.tpl.html","<div class=\"row dashboard-column-header\">\n  <h2>QUERY</h2>\n</div>\n\n\n<query-overview-control \n  class=\"row\" \n  title=\"Mutations\" \n  set-title=\"Gene Set\" \n  desc=\"classify samples by their mutation status in selected genes\" \n  list-type=\"mutations\" \n  param-list=\"$ctrl.mutationSet\">\n</query-overview-control>\n\n\n<query-overview-control \n  class=\"row\" \n  title=\"Disease Type\" \n  desc=\"Select Samples to Include in Query by Disease Type\" \n  list-type=\"disease\" \n  param-list=\"$ctrl.diseaseSet\">\n</query-overview-control >\n\n\n\n\n");
$templateCache.put("queryBuilder/queryParamSelector/disease_instructions.tpl.html","<section class=\"col-lg-12 query-param-selector--instrs\">\n		<div class=\"row\">\n			<h1 class=\"col-lg-12\" >BUILD A CLASSIFICATION ALOGRITHM BY:</h1>	\n		</div>\n		<div class=\"row\">\n			<ol class=\"col-lg-10 col-lg-offset-1 text-left\">\n				<li>\n					<h3>Searching for Samples by Disease Type</h3>\n				</li>\n				<li>\n					<h3>Selecting Samples by Disease Type to add to your Disease Type Set by Clicking or Dragging and Dropping to the Disease Type Set sidebar</h3>\n				</li>\n			</ol>\n		</div>\n		\n	</section>");
$templateCache.put("queryBuilder/queryParamSelector/mutations_instructions.tpl.html","<section class=\"col-lg-12 query-param-selector--instrs\">\n		<div class=\"row\">\n			<h1 class=\"col-lg-12\" >BUILD A CLASSIFICATION ALOGRITHM BY:</h1>	\n		</div>\n		<div class=\"row\">\n			<ol class=\"col-lg-10 col-lg-offset-1 text-left\">\n				<li>\n					<h3>Searching for Genes by name of alternative Gene ID</h3>\n				</li>\n				<li>\n					<h3>Selecting Genes to add to your Gene Set by Clicking or Dragging to the Gene Set sidebar </h3>\n					<blockquote >\n						<small>\n							The genes in your <strong>Gene Set</strong> will compose the Y vector that is used to determine gene or pathway inactivation. The hypothesis assumption is that a mutation in any gene in your Gene Set will cause a measurable change in downstream gene expression that can be detected by the algorithm you build.\n						</small>\n					</blockquote>	\n				</li>\n				<li>\n					<h3>Searching for Samples by Disease Type</h3>\n				</li>\n				<li>\n					<h3>\n						Selecting Disease Types to add to your Disease Types Set by Clicking or Dragging to the Disease Types Set sidebar \n					</h3>\n				</li>\n			</ol>\n		</div>\n		\n	</section>");
$templateCache.put("queryBuilder/queryParamSelector/queryParamSelector.tpl.html","<header class=\"row dashboard-column-header\">\n	<h2>Paramater Selector</h2>\n</header>	\n\n<div class=\"row query-param-selector-ctrls\">\n	<div \n		class=\"col-lg-1\"\n		ng-if=\"$ctrl.searchResults.length\"\n	>\n		<small>results</small>\n		<span  class=\"badge badge--counter\">\n			{{ filteredResults != undefined ? filteredResults.length : $ctrl.searchResults.length }}\n		</span>\n		\n	</div>\n	\n	<div \n		class=\"\"\n		ng-class=\"{\n			\'col-lg-10 col-lg-offset-1\' : $ctrl.searchResults.length == 0,\n			\'col-lg-9\' : $ctrl.searchResults.length > 0\n		}\"\n	>\n  			<input type=\"text\" \n  				   class=\"form-control\" \n  				   placeholder=\"Search {{$ctrl.currentState()}} by Name\"\n  				   \n  				   ng-model=\"$ctrl.searchQuery\"\n  				   ng-change=\"$ctrl.onChange({search: $ctrl.searchQuery})\"\n  				   autofocus=\"1\"\n  			>		\n	</div>\n	\n\n	<div \n		class=\"col-lg-1\"\n		ng-if=\"$ctrl.searchResults.length\"\n	>\n		<button \n			type=\"button\" \n			class=\"btn \n				   btn-xs \n				   btn--mutation-sort\n				   glyphicon \n				   glyphicon-sort-by-attributes-alt\n				   text-uppercase\"\n			ng-click=\"$ctrl.sortResultsBy($ctrl.results, \'_score\')\"\n		>\n									 	<p>Score</p>\n		</button>\n	</div>\n	\n</div>\n\n\n\n<div ng-if=\"$ctrl.searchResults.length == 0\"\n	 ng-include=\"$ctrl.instructionsTemplate\" \n 	 class=\"row\">\n</div>\n\n<section \n	class=\"row query-param-selector-results\"\n	ng-if=\"$ctrl.searchResults.length\"\n>\n	<div class=\"col-lg-12\">\n\n		<div ng-if=\"$ctrl.currentState() == \'disease\'\" class=\"row\">\n			<div class=\"col-lg-offset-8 col-lg-4\" >\n				<div class=\"row results-headers\">\n					<p class=\"col-lg-4\"><small>Samples</small></p>\n					<p class=\"col-lg-4\"><small>Positives</small></p>\n					<p class=\"col-lg-4\"><small>Negatives</small></p>	\n				</div>\n			</div>\n		</div>\n\n		<div class=\"row results-row\">\n			\n			<gene-card \n				ng-if=\"$ctrl.currentState() == \'mutations\'\"\n				class=\"col-lg-3 result\"\n				ng-repeat=\"gene in $ctrl.searchResults\"\n				symbol=\"{{gene.symbol}}\"\n				entrez-id=\"gene.entrezgene\"\n				name=\"{{gene.name}}\"\n				score=\"{{gene._score}}\"\n				link=\"\"\n				ng-click=\"$ctrl.addGene(gene)\"\n			></gene-card>\n		\n			<disease-card\n				ng-if=\"$ctrl.currentState() == \'disease\'\"\n				class=\"col-lg-12 result\"\n    			ng-repeat=\"disease in $ctrl.searchResults | orderBy: \'-positives\' | filter:$ctrl.searchQuery as filteredResults \"\n    			id=\"{{disease.name}}\"\n    			samples=\"disease.samples\"\n    			positives=\"{{disease.positives}}\" \n    			negatives=\"{{disease.samples.length - disease.positives}}\"\n    			ng-click=\"$ctrl.addDisease(disease)\"\n  			></disease-card>\n\n		</div>	\n	</div>\n</section>\n\n");
$templateCache.put("queryBuilder/queryOverview/queryOverviewControl/queryOverviewControl.tpl.html","<div \n	class=\"query-overview--control \n			   query-overview--{{$ctrl.title.toLowerCase()}}\n         row\n			\"\n  ng-class=\"{\'active\': $ctrl.active}\"\n>\n\n  <h4 class=\"query-overview--control-title row\" >\n  	<span class=\"badge badge--counter\"  >{{$ctrl.paramList.length}}</span>\n    <span class=\"js-test-title\" ui-sref=\"app.queryBuilder.{{$ctrl.listType}}\">{{::$ctrl.title}}</span>\n  </h4>\n\n  <h5 ng-if=\"$ctrl.setTitle\" \n      class=\"query-overview--control-setTitle js-test-setTitle\">\n      {{::$ctrl.setTitle}}\n  </h5>\n\n  <info-box\n  	ng-if=\"$ctrl.desc\"\n  	message=\"{{$ctrl.desc}}\"\n  ></info-box>\n\n  <div class=\"row query-overview--control-params\">\n		\n  		<mutation-listing\n        class=\"col-lg-6\"\n  			ng-if=\" $ctrl.listType == \'mutations\' \"\n  			ng-repeat=\"gene in $ctrl.paramList\"\n  			symbol=\"{{gene.symbol}}\"\n        entrezgene=\"gene.entrezgene\"\n  		></mutation-listing>\n\n  		<disease-listing\n  			ng-if=\"$ctrl.listType == \'disease\'\"\n  			ng-repeat=\"disease in $ctrl.paramList\"\n  			name=\"{{disease.name}}\"\n        samples=\"disease.samples\"\n        positives=\"disease.positives\"\n        negatives=\"disease.negatives\"\n        is-loading=\"disease.mutationsLoading\"\n  		></disease-listing>\n\n  		<button \n        ui-sref=\"app.queryBuilder.{{$ctrl.listType}}\"\n  			ng-class=\"{ \'col-xs-6 col-lg-4\': $ctrl.listType == \'mutations\',\n  						      \'col-xs-10\': $ctrl.listType == \'disease\' }\"\n  			class=\"query-overview--control-param  query-overview--control-param-add text-uppercase\"\n        ng-click=\"$ctrl.resetSearch()\">\n  			ADD {{ $ctrl.listType }}\n  				\n  		</buttom>	\n\n        \n  </div>\n\n</div>");
$templateCache.put("queryBuilder/querySets/querySetDiseaseType/querySetDiseaseType.tpl.html","  <div class=\"dashboard-column-header\">\n    <h2>DISEASE Type SET</h2>\n    <span class=\"badge\">{{$ctrl.diseaseSet.length}}</span>\n  </div>\n  <div class=\"list-controls\">\n    <div class=\"col-xs-10\">\n      <span>SELECTED DISEASE TYPES</span>\n      <span \n        class=\"glyphicon glyphicon-sort\"\n        ng-click=\"$ctrl.sortSetBy(\'positives\')\"\n      >  \n        </span>\n    </div>\n    <div class=\"col-xs-2\">\n      <span class=\"label clear-button disease-clear-button\"\n            ng-click=\"$ctrl.clearDiseaseSet()\">CLEAR</span>\n    </div>\n  </div>\n\n  <div class=\"col-xs-12 sample-set-bar\">\n    <span>SAMPLES {{ $ctrl.samplesTotal() }}</span>\n    <span>POSTIVES\n      <span class=\"glyphicon glyphicon-plus-sign text-success\"></span>{{$ctrl.setTotalFor(\'positives\')}}\n    </span>\n    <span>NEGATIVES\n      <span class=\"glyphicon glyphicon-minus-sign text-danger\"></span>\n      {{$ctrl.setTotalFor(\'negatives\')}}</span>\n  </div>\n\n  \n<!-- Disease Cards -->\n<div class=\"card-container\">\n<div class=\"disease-card-display col-xs-12\">\n\n  <div \n    class=\"row\"\n    ng-repeat=\"disease in $ctrl.diseaseSet track by $index\"\n    ng-if=\"$ctrl.diseaseSet.length\"\n  >\n    <disease-card\n      id=\"{{disease.name}}\"\n      positives=\"{{disease.positives}}\"\n      negatives=\"{{disease.negatives}}\"\n      samples=\"disease.samples\"\n    ></disease-card>\n  </div>\n  \n\n\n  <div class=\"empty-card-space col-xs-12\">\n    <h4 class=\"empty-card-text\"\n      ng-if=\"!$ctrl.diseaseSet.length\"\n    >\n      DRAG AND DROP OR CLICK DISEASE TYPES TO ADD\n    </h4>\n  </div>\n</div>\n\n</div>\n<!-- Ng repeat the selected Gene types -->\n<!-- Empty Card Space -->\n");
$templateCache.put("queryBuilder/querySets/querySetMutations/querySetMutations.tpl.html","<div class=\"row dashboard-column-header\">\n  <h2>MUTATIONS SET</h2>\n  <span class=\"badge\">{{$ctrl.mutationSet.length}}</span>\n</div>\n\n  <div class=\"row list-controls\">\n    <div class=\"col-xs-9\">\n      <span>SELECTED GENES</span>\n      <span class=\"glyphicon glyphicon-sort\" ng-click=\"$ctrl.sortMutations(\'symbol\')\"></span>\n    </div>\n    <div class=\"col-xs-2\">\n      <span class=\"label clear-button\" ng-click=\"$ctrl.clearMutationSet()\">CLEAR</span>\n    </div>\n  </div>\n\n\n<!-- Gene Cards -->\n<div class=\"row card-container\">\n\n<ul class=\"col-xs-3\">\n  <li class=\"label gene-label\"\n    ng-repeat=\"mutation in $ctrl.mutationSet track by $index\"\n    ng-mouseover=\"$ctrl.highlightGene($index)\"\n    ng-mouseleave=\"$ctrl.highlightGene($index)\"\n  >{{mutation.symbol}}</li>\n</ul>\n\n<div class=\"gene-card-display col-xs-9\">\n\n  <gene-card\n    ng-class=\"{\'active\':gene.active, \'faded\':  $ctrl.geneHovered}\"\n    class=\"gene-card-display-item clearfix\" \n\n    ng-if=\"$ctrl.mutationSet.length\"\n    ng-repeat=\"gene in $ctrl.mutationSet\"\n    \n    symbol=\"{{gene.symbol}}\"\n    entrez-id=\"gene.entrezgene\"\n    name=\"{{gene.name}}\"\n    score=\"{{gene._score}}\"\n  ></gene-card>\n\n  <div class=\"empty-card-space\">\n    <h4 class=\"empty-card-text\"\n      ng-if=\"!$ctrl.mutationSet.length\"\n    >\n      DRAG AND DROP OR CLICK GENES TO ADD\n    </h4>\n  </div>\n</div>\n\n</div>\n");
$templateCache.put("queryBuilder/queryOverview/queryOverviewControl/diseaseListing/diseaseListing.tpl.html","<div \n	class=\"row query-overview--control-param disease-listing\"\n	ng-class=\"{\'data-loading\': $ctrl.isLoading}\"\n>\n\n  	<span class=\"row query-overview--control-param-title js-test-name\">{{$ctrl.name}}</span>\n\n  	<summary class=\"row control-param-summary\">\n  		<p class=\"col-lg-4 sample-count\">SAMPLES <strong class=\"js-test-sampleCount\"> {{$ctrl.samples.length}}</strong> </p>\n\n  		<p class=\"col-lg-2 col-lg-offset-1 sample-positives sample-count--item\">\n  			 <span class=\"glyphicon\"\n  			 	   ng-class=\"{\'glyphicon-plus-sign\': !$ctrl.isLoading,\n  			 					\'glyphicon-refresh\': $ctrl.isLoading}\"></span> \n  			 <span ng-if=\"!$ctrl.isLoading\" class=\"js-test-positives\">{{$ctrl.positives}}</span> \n  		</p>\n\n  		<p class=\"col-lg-2 sample-negatives sample-count--item\"> \n  			<span class=\"glyphicon\"\n  					ng-class=\"{\'glyphicon-minus-sign\': !$ctrl.isLoading,\n  			 				\'glyphicon-refresh\': $ctrl.isLoading}\"\n  				></span> \n  			<span ng-if=\"!$ctrl.isLoading\" class=\"js-test-negatives\">{{$ctrl.negatives}}</span> \n  		</p>\n  	</summary>\n\n  	<button \n        class=\"glyphicon glyphicon-remove-circle text-danger col-lg-1\" \n        aria-hidden=\"true\"\n        ng-click=\"$ctrl.removeDisease($ctrl)\">\n  </button>\n\n </div>	  		\n");
$templateCache.put("queryBuilder/queryOverview/queryOverviewControl/mutationListing/mutationListing.tpl.html","<div class=\"row query-overview--control-param mutation-listing\">\n  	<span class=\"query-overview--control-param-title\">{{$ctrl.symbol}}</span>\n  	<button \n  		class=\"glyphicon glyphicon-remove-circle text-danger col-lg-1\" \n  		aria-hidden=\"true\"\n  		ng-click=\"$ctrl.removeMutation($ctrl.entrezgene)\"\n  	></button>\n </div>	  		\n");}]);