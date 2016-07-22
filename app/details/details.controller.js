{
  'use strict';

  angular
    .module('pokedex.details')
    .controller('DetailsController', DetailsController);

  DetailsController.$inject = ['$state', 'Details'];
  function DetailsController($state, Details) {
    const vm = this;

    vm.pokemon = {};
    vm.getDetails = getDetails;

    vm.getDetails();

    /////////////////////

    function getDetails() {
      if ($state.params.id) {
        vm.loading = true;
        Details.findById($state.params.id).get().$promise
          .then(res => vm.pokemon = res)
          .finally(() => vm.loading = false);
      }
      else {
        vm.pokemon.id = undefined;
      }
    }

  }
}
