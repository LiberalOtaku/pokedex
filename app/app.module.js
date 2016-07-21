{
  angular
    .module('pokedex', [
      // Angular modules
      'ui.router',

      // Third-party modules
      'angularSpinner',
      'ngResource',

      // Custom modules
      'pokedex.layout',
      'pokedex.list',
      'pokedex.details',
    ])
    .config(configFunction)
    .run(run);

  configFunction.$inject = ['$urlRouterProvider'];
  function configFunction($urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
  }

  run.$inject = ['$rootScope', '$state'];
  function run($rootScope, $state) {
    $rootScope.$on('$stateChangeSuccess', () => $rootScope.$state = $state);

    // $rootScope.$on('$stateChangeError', () => $state.go('sign-in'));
  }
}
