"use strict";

app.controller('ReadComicController', [
  '$http',
  '$scope',
  function($http, $scope) {

    $scope.comic = {};

    $scope.getComics = function() {
      $http
      .get('http://localhost:5000/api/ComicStrip')
      .success(gotComic => $scope.comic = gotComic);
    }
  }
]);
