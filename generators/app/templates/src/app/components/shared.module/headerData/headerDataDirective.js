(function() {
	'use strict';


	angular.module("fondoinvers")
	.directive('headerDataTemplate', function() {
		return {
			restrict: 'E',
			templateUrl: 'app/components/shared.module/headerData/headerDataView.html'
		};

	});


})();
