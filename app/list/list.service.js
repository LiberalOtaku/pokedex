{
  angular
    .module('pokedex.list')
    .factory('List', List);

  List.$inject = ['$resource', 'FORMS_URL'];
  function List($resource, FORMS_URL) {
    return $resource(FORMS_URL, null, {
      update: { method: 'PUT' },
    });
  }
}
