{
  angular
    .module('pokedex.list')
    .factory('List', List);

  List.$inject = ['$resource', 'DATABASE_URL'];
  function List($resource, DATABASE_URL) {
    return $resource(DATABASE_URL, null, {
      update: { method: 'PUT' },
    });
  }
}
