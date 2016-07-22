{
  angular
    .module('pokedex.details')
    .factory('Details', Details);

  Details.$inject = ['$resource', 'DETAILS_URL'];
  function Details($resource, DETAILS_URL) {
    const service = {
      findById: findById,
      getByUrl: getByUrl,
    };

    return service;

    ///////////////

    function findById(id) {
      return $resource(`${DETAILS_URL}${id}`, null, {
        update: { method: 'PUT' },
      });
    }

    function getByUrl(url) {
      return $resource(url, null, {
        update: { method: 'PUT' },
      });
    }
  }
}
