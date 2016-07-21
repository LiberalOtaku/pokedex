{
  angular
    .module('pokedex.list')
    .controller('ListController', ListController);

  ListController.$inject = ['$http', 'List'];
  function ListController($http, List) {
    const vm = this;
    vm.list = [];
    vm.refresh = refresh;

    vm.refresh();

    /////////////////////

    function refresh() {
      vm.loading = true;
      List.get().$promise.then(list => {
        var newList = [];
        var length = list.results.length;
        for (var i = 0; i < length; i++) {
          $http.get(list.results[i].url)
            .then(res => {
              var entry = {};
              entry.sprite_url = res.data.sprites.front_default;
              entry.id = res.data.id;
              entry.name = res.data.name;
              newList.push(entry);
            });
        }
        vm.list = newList;
      })
      .finally(() => vm.loading = false);
    }
  }
}
