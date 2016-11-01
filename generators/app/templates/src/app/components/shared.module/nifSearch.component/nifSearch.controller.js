(function() {
    'use strict';

    angular.module('fondoinvers.shared')
        .controller('nifSearchController', function(serviciosEjemplo, dataSearchSrv) {
            var vm = this;

            vm.tipoDocumentoArray = serviciosEjemplo.getTipoDocumentos();
            vm.tipoEntidadArray = serviciosEjemplo.getTipoEntidades();
            vm.historicoRepartosArray = serviciosEjemplo.getHistoricoRepartos();

            console.log('vm.tipoEntidadArray ' + vm.tipoEntidadArray);

            vm.showTable = function(){
              console.log('ngmodel --> ' + vm.tipoEntidad);
              console.log('vm.document ' + vm.document);
              dataSearchSrv.getConsultarRepartosFondosInversionCliente(vm.tipoEntidad, vm.document.type.ad, vm.document.doc)
                .then(function(data) {
                  console.log(data);
                  vm.mostrarResultados = true;
                  //vm.historicoRepartosArray = data;
                  vm.razonSocial= vm.historicoRepartosArray[0].razon_social;
                  })
                  .catch(function(err) {
                    console.error(err);
                    //Tratamiento de errores
                  }
              );
            };

        });
})();
