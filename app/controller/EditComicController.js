app.controller('EditComicController', [
  '$http',
  '$scope',
  'ComicFactory',
  function($http, $scope, comicFactory) {
    $scope.comicToEdit = comicFactory.getComic();

    
}]);
