{
  angular
    .module('pokedex.details')
    .config(detailsConfig);

  detailsConfig.$inject = ['$stateProvider'];
  function detailsConfig($stateProvider) {
    $stateProvider
      .state('list.details', {
        url: '/:id',
        template: '<div my-details></div>',
        controller: 'DetailsController',
        controllerAs: 'vm'
      });
  }
}
