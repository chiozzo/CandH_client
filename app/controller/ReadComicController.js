"use strict";

app.controller('ReadComicController', [
  '$http',
  '$scope',
  function($http, $scope) {

    $scope.comic = {};

    $scope.getComics = function() {
      $http
      .get('http://localhost:5000/api/ComicStrip?comicStripId=1')
      .success(gotComic => {
          $scope.comic = gotComic[0];
          $scope.comic.Image = window.atob(gotComic[0].Image);
      });
    };

    $scope.getComics();
  }
]);
