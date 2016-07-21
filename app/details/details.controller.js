{
  'use strict';

  angular
    .module('pokedex.details')
    .controller('DetailsController', DetailsController);

  DetailsController.$inject = ['$http', '$state', 'DETAILS_URL'];
  function DetailsController($http, $state, DETAILS_URL) {
    const vm = this;

    vm.id = null;
    vm.getDetails = getDetails;

    vm.getDetails();

    /////////////////////

    function getDetails() {
      vm.loading = true;
      $http.get(`${DETAILS_URL}${$state.params.id}`)
        .then(res => {
          vm.stats = res.data.stats;
        })
        .finally(() => vm.loading = false);
    }

  }
}
