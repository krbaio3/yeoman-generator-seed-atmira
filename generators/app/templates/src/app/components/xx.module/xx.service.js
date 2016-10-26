(function() {
  'use strict';

  angular
    .module('fondoinvers.dataSearch')
    .service('dataSearchSrv', dataSearchSrv);

  function dataSearchSrv($http, $q) {

    function zzzz() {

      var deffered = $q.defer();

      var data = {};

      function consultaSuccess(data) {
        deffered.resolve(data);
      };

      function consultaError(error) {
        deffered.reject(error);
      };

      //$http.get('').success(consultaSuccess).error(consultaError);

      return deffered.promise;

    }

    return {
      zzzz : zzzz
    };

  }

})();
