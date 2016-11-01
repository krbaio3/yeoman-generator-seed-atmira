(function() {
    'use strict';

    angular
        .module('fondoinvers')
        .config(configuration);
    /* @ngInject */
    function configuration($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                abstract: true
            })

            .state('ESTADO1', {
              url: '/URL1',
              templateUrl: 'app/components/xxx.module/xx.component.html',
              controller: 'xxController',
              controllerAs: 'xxCtrl',
              data: {
                  pageTitle: 'TITULO'
              }
          });


        $urlRouterProvider.otherwise('/URL1');
    }
})();
