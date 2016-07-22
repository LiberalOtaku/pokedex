{
  angular
    .module('pokedex.list')
    .controller('ListController', ListController);

  ListController.$inject = ['List', 'FORMS_URL'];
  function ListController(List, FORMS_URL) {
    const vm = this;
    vm.list = [];
    vm.refresh = refresh;
    vm.currentUrl = FORMS_URL;

    vm.refresh();

    /////////////////////

    function refresh() {
      vm.loading = true;
      List.getListByUrl(vm.currentUrl).get().$promise
        .then(list => {
          var newList = [];
          var length = list.results.length;
          for (var i = 0; i < length; i++) {
            List.getListByUrl(list.results[i].url).get().$promise
              .then(res => {
                var entry = {};
                entry.sprite_url = res.sprites.front_default;
                entry.id = res.id;
                entry.name = res.name;
                newList.push(entry);
              });
          }
          vm.list = newList;
        })
        .finally(() => vm.loading = false);
    }
  }
}
