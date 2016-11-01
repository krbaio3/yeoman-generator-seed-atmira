(function() {
    'use strict';

    angular
        .module('fondoinvers.shared', [])
        .component('nifSearch', {
            bindings: {
                tipoEntidadArray: '@',
                tipoEntidad: '&',
                document: '<',
                razonSocial: '<',
                showTable: '&'
            },
            controllerAs: 'vm',
            transclude: true,
            controller: 'nifSearchController',
            templateUrl: 'app/components/shared.module/nifSearch.component/nifSearch.component.html'
        });
})();
