var prComponent = {
      bindings: {
        //count:'='
      },
      controllerAs: 'vm',
      controller: function ($window) {
        var vm = this;

        vm.alert = function() {
            $window.alert('Soy un Alert');
            console.log('Ha entrado');
        };
      },
      template: [
        '<div>',
        '<span>Esto es algo de HTML en el componente</span> ',
        '<b>Angular Rules!</b>',
        '<input type="button" name="button" value="" ng-click="vm.alert()">',
        '</div>'].join()
};


  angular
      .module('fondoinvers.dataSearch.ejemplo', [])
        .component('prcomponent', prComponent);
