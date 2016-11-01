(function() {
'use strict';

var configApp = function($compileProvider, $logProvider) {
            //console.log('$LanguageSrv ==>' + $LanguageSrv)
            //LanguageSrv.set(LanguageSrv.DEFAULT);
            //Reemplazar esto con la tarea de Gulp para cuando suba a producción
            $compileProvider.debugInfoEnabled('@@debuggInfoEnabled' !== 'false');
            $logProvider.debugEnabled('@@debugLogEnabled' !== 'false');
        };

angular
    .module('xxxxx', ['xxxxx.xx', 'ui.router'])
    .component('xxxxx', {
        template: '<ui-view></ui-view>'
    })
    .config(configApp);

})();
