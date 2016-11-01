(function() {
  'use strict';

  angular
    .module('xxxxx.xx')
    .config(configuration);

  /* @ngInject */
  function configuration($stateProvider) {
    $stateProvider
      .state('data', {
        url: '/',
        templateUrl: 'app/components/yyyy.module/xx.component.html',
        controller: 'xx.controller',
        controllerAs:'xxCtrl'

      });
  }
})();
