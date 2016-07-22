{
  angular
    .module('pokedex.layout')
    .directive('myHeader', myHeader);

  function myHeader() {
    return {
      restrict: 'AE',
      templateUrl: 'layout/directives/header.html',
      scope: {},
    };
  }
}
