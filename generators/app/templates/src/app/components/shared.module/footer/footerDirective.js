(function() {
  'use strict';


angular.module("fondoinvers")
.directive('footerTemplate', function() {
  return {
	  strict: 'E',
      scope:{
        footer: '=',
        disable: '='
      },
	  templateUrl: 'app/components/shared.module/footer/footerView.html',
    };

});


})();
