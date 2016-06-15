"use strict";

app.controller('PostComicController', [
  '$http',
  '$scope',
  function($http, $scope) {

    $scope.comicStrip = {};

    $scope.postComic = function() {
      $http({
        url: 'http://localhost:5000/api/ComicStrip',
        method: 'POST',
        data: JSON.stringify($scope.comicStrip)
      })
      .success(newComic => console.log(`201 Created ${newComic}`))
    };
}]);
