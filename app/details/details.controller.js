{
  'use strict';

  angular
    .module('pokedex.details')
    .controller('DetailsController', DetailsController);

  DetailsController.$inject = ['$http', '$state', 'DETAILS_URL'];
  function DetailsController($http, $state, DETAILS_URL) {
    const vm = this;

    vm.pokemon = {};
    vm.getDetails = getDetails;

    vm.getDetails();

    /////////////////////

    function getDetails() {
      if ($state.params.id) {
        vm.loading = true;
        $http.get(`${DETAILS_URL}${$state.params.id}`)
          .then(res => {
            vm.pokemon = res.data;
          })
          .finally(() => vm.loading = false);
      }
      else {
        vm.pokemon.id = undefined;
      }
    }

  }
}
