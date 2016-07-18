{
  angular
    .module('pokedex.list')
    .config(listConfig);

  listConfig.$inject = ['$stateProvider'];
  function listConfig($stateProvider) {
    $stateProvider
      .state('list', {
        url: '/',
        templateUrl: 'list/list.html',
        controller: 'ListController',
        controllerAs: 'vm',
      });
  }
}
