{
  angular
    .module('pokedex.list')
    .controller('ListController', ListController);

  ListController.$inject = ['List', 'FORMS_URL'];
  function ListController(List, FORMS_URL) {
    const vm = this;
    vm.list = [];
    vm.currentUrl = FORMS_URL;
    vm.previousURL = null;
    vm.nextURL = null;
    vm.refresh = refresh;
    vm.previous = previous;
    vm.next = next;

    vm.refresh(vm.currentUrl);

    /////////////////////

    function refresh(url) {
      vm.loading = true;
      List.getListByUrl(url).get().$promise
        .then(list => {
          vm.previousURL = list.previous;
          vm.nextURL = list.next;

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

    function previous() {
      if (vm.previousURL) {
        vm.currentUrl = vm.previousURL;
        vm.refresh(vm.currentUrl);
      }
    }

    function next() {
      if (vm.nextURL) {
        vm.currentUrl = vm.nextURL;
        vm.refresh(vm.currentUrl);
      }
    }
  }
}
