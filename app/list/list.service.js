{
  angular
    .module('pokedex.list')
    .factory('List', List);

  List.$inject = ['$resource'];
  function List($resource) {
    const service = {
      getListByUrl: getListByUrl,
    };

    return service;

    ///////////////

    function getListByUrl(url) {
      return $resource(url, null, {
        update: { method: 'PUT' },
      });
    }
  }
}
