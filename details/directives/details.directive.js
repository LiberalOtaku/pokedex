{
  angular
    .module('pokedex.details')
    .directive('myDetails', myDetails);

  function myDetails() {
    return {
      restrict: 'EA',
      templateUrl: 'details/directives/details.html'
    };
  }
}
