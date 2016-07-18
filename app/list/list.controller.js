{
  angular
    .module('pokedex.list')
    .controller('ListController', ListController);

  ListController.$inject = ['List'];
  function ListController(List) {
    const vm = this;
    vm.list = [];
    vm.refresh = refresh;

    vm.refresh();

    /////////////////////

    function refresh() {
      List.get().$promise.then(list => vm.list = list.results);
    }
  }
}
