(function() {
  'use strict';
 
  var moduleDependencies = [
      'ui.router'
  ];



  angular
    .module('fondoinvers.core', moduleDependencies)
    .factory('serviciosEjemplo', serviciosEjemplo);

  function serviciosEjemplo() {
    

          var _getRepartoFondosDest = function () {


              var repartoFondosArray = [
              {
                  retener: false,
                  contrato: '0082101809011237',
                  gananciales: 356.56789,
                  herencia: '',
                  condominio: ''
              },
              {     
                  retener: false,
                  contrato: '0010001200013002',
                  gananciales: 906.88043,
                  herencia: '',
                  condominio: ''
              }];

              return repartoFondosArray;
          }

          var _getCuadroDinamicoArray = function () {

              //Funcion que devuelve objetos de ejemplo para el contenedor dinamico de "resultados de búsqueda"
              var cuadroDinamicoArray = [
                    {
                        fondo: 1,
                        disponibilidad: 'CONJUNTA',
                        reparto: '% Porcentaje',
                        gananciales: '74.362%',
                        herencia: '',
                        condominio: '',
                        ref_externa: '',
                        retener: true,
                        tipo: 'DNI',
                        documento: 163560045,
                        nom_apellidos: 'ARTURO MARTÍNEZ RUÍZ',
                        relacion: 'COPARTICIPE',
                        orden: 2
                    },
                    { 
                        fondo: 2,
                        disponibilidad: 'CONJUNTA',
                        reparto: '% Porcentaje',
                        gananciales: '74.362%',
                        herencia: '',
                        condominio: '',
                        ref_externa: '',
                        retener: true,
                        tipo: 'DNI',
                        documento: 163560045,
                        nom_apellidos: 'ARTURO MARTÍNEZ RUÍZ',
                        relacion: 'COPARTICIPE',
                        orden: 2
                    }]

              return cuadroDinamicoArray;
          }

          var _getHistoricoRepartos = function () {

              var historicoRepartosArray = [
                {
                  entidad: 'Bankia',
                  oficina: '2968',
                  nif: '18900768D',
                  razon_social: 'ALBERTO FERNÁNDEZ CÓPOLA',
                  iban: '00',
                  product_comercial: 'Soy así cauto',
                  num_contrato: '0082101809011237',
                  fecha_titular: '06/03/2014',
                  tipo_distribucion: 'Testamentaria',
                  fecha_tram: '25/04/2014',
                  estado: 'Ejecutada'
                },
                {
                  entidad: 'Bankia',
                  oficina: '1259',
                  nif: '18900768D',
                  razon_social: 'ALBERTO FERNÁNDEZ CÓPOLA',
                  iban: '00',
                  product_comercial: 'Evolución prudente',
                  num_contrato: '0082101809011237',
                  fecha_titular: '15/02/2015',
                  tipo_distribucion: 'Testamentaria',
                  fecha_tram: '30/08/2015',
                  estado: 'Ejecutada'
                },
                {
                  entidad: 'Bankia',
                  oficina: '0252',
                  nif: '18900768D',
                  razon_social: 'ALBERTO FERNÁNDEZ CÓPOLA',
                  iban: '00',
                  product_comercial: 'Soy así decidido',
                  num_contrato: '0082101809011237',
                  fecha_titular: '12/04/2015',
                  tipo_distribucion: 'Testamentaria',
                  fecha_tram: '31/12/2015',
                  estado: 'Ejecutada'
                },
                {
                  entidad: 'Bankia',
                  oficina: '2968',
                  nif: '18900768D',
                  razon_social: 'ALBERTO FERNÁNDEZ CÓPOLA',
                  iban: '00',
                  product_comercial: 'Soy así flexible',
                  num_contrato: '0082101809011237',
                  fecha_titular: '25/05/2016',
                  tipo_distribucion: 'Testamentaria',
                  fecha_tram: '06/06/2016',
                  estado: 'Ejecutada'
                }
              ];

              return historicoRepartosArray;
          }


          //Funcion que devuelve objetos cliente de ejemplo
          var _getClientes = function () {
              var clientesArray = 
              [
                {
                    nif: '47106008T',
                    causante: 'PEPE GARCIA GARCIA',
                    fondo_origen: 'FONDODEPOSITOS',
                    numero_contrato: '000010001200013002',
                    reparto: 'Testamentaria',
                    fecha_reparto: '21/06/2016',
                    entidad: 'Bankia',
                    isin: 'ES0109654030'
                },
                {
                    nif: '18900768D',
                    causante: 'ALBERTO FERNÁNDEZ CÓPOLA',
                    fondo_origen: 'FONDODEPOSITOS',
                    numero_contrato: '000082101809011237',
                    reparto: 'Testamentaria',
                    fecha_reparto: '31/12/2016',
                    entidad: 'Bankia',
                    isin: 'ES0109554080'
                },
                {
                    nif: '00000000T',
                    causante: 'LAURA AVILA GARCÍA',
                    fondo_origen: 'FONDODEPOSITOS',
                    numero_contrato: '000037801200083063',
                    reparto: 'Testamentaria',
                    fecha_reparto: '04/09/2015',
                    entidad: 'Bankia',
                    isin: 'ES0200660030'
                }
              ];

              return clientesArray; 
          }

          var datosCliente; 
          var _setDatosCliente = function () {

              datosCliente = 
              {
              nif: clientesArray[0].nif,
              causante: clientesArray[0].causante,
              fondo_origen: clientesArray[0].fondo_origen,
              numero_contrato: clientesArray[0].numero_contrato,
              reparto: clientesArray[0].reparto,
              fecha_reparto: clientesArray[0].fecha_reparto,
              entidad: clientesArray[0].entidad,
              isin: clientesArray[0].isin
              }            
          }

          var datosClienteCabezera = [
          {
            nif: '47106008T',
            causante: 'PEPE GARCIA GARCIA',
            fondo_origen: 'FONDODEPOSITOS',
            numero_contrato: '000010001200013002',
            reparto: 'Testamentaria',
            fecha_reparto: '21/06/2016',
            entidad: 'Bankia',
            isin: 'ES0109654030'
          }
          ];

          var _getDatosCliente = function () {
                return datosClienteCabezera;
          }

          //Funcion que devuelve objetos 'producto' de ejemplo
          var _getFamiliaProductos = function () {

             var familiaProductosArray = [
                  'AHORRO VISTA/ PLAZO',
                  'EJEMPLO1',
                  'EJEMPLO2',
                  'EJEMPLO3'
              ];

              return familiaProductosArray;
          }

          //Funcion que devuelve objetos 'tipo documentos' de ejemplo
          var _getTipoDocumentos = function () {
              var tipoDocumentoArray = [
                  'OTROS PF',
                  'OTROS PJ',
                  'DNI',
                  'CI',
                  'TR',
                  'PASAPORTE',
                  'CI PAIS OR',
                  'DOC.ID.EXT.',
                  'T.ID.DIPLO',
                  'MENOR'
              ];

              return tipoDocumentoArray;
          }

          //Funcion que devuelve objetos 'tipo entidades' de ejemplo
          var _getTipoEntidades = function () {
             var tipoEntidadArray = [
                  'BANKIA',
                  'EJEMPLO1',
                  'EJEMPLO2',
                  'EJEMPLO3',
                  'EJEMPLO4'
              ];

              return tipoEntidadArray;
          }


          return {
            getHistoricoRepartos: _getHistoricoRepartos,
            getFamiliaProductos: _getFamiliaProductos,
            getTipoDocumentos: _getTipoDocumentos,
            getTipoEntidades: _getTipoEntidades,
            getClientes: _getClientes,
            getDatosCliente: _getDatosCliente,
            getRepartoFondosDest: _getRepartoFondosDest,
            getCuadroDinamicoArray: _getCuadroDinamicoArray,
            setDatosCliente: _setDatosCliente
          };
  }


  })();