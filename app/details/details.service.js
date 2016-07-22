{
  angular
    .module('pokedex.details')
    .factory('Details', Details);

  Details.$inject = ['$resource', 'DETAILS_URL'];
  function Details($resource, DETAILS_URL) {
    const service = {
      findById: findById,
    };

    return service;

    ///////////////

    function findById(id) {
      return $resource(`${DETAILS_URL}${id}`, null, {
        update: { method: 'PUT' },
      });
    }
  }
}
