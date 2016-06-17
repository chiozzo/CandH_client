"use strict";

app.controller('ReadComicController', [
  '$http',
  '$scope',
  function($http, $scope) {

    $scope.comic = {};

    $scope.requestedComic = {
      "Id": 0,
      "getURL": 'http://localhost:5000/api/ComicStrip'
    };

    $scope.getComic = function() {
      if ($scope.requestedComic.Id != 0) {
        $scope.requestedComic.getURL = `http://localhost:5000/api/ComicStrip?comicStripId=${$scope.requestedComic.Id}`
      }
      console.log($scope.requestedComic.getURL);
      $http
      .get($scope.requestedComic.getURL)
      .then(
        success => {
          let gotComic = success.data[0];
          $scope.comic = gotComic;
          $scope.requestedComic.Id = gotComic.ComicStripId;
          $scope.comic.Image = window.atob(gotComic.Image);
        },
        error => {
          console.log(error);
        }
      );
    };

    $scope.getNextComic = function() {
      if ($scope.requestedComic.Id == 0) {
        $scope.requestedComic.Id = 1;
      }
      $scope.requestedComic.Id++;
      $scope.getComic();
    };

    $scope.getPreviousComic = function() {
      if ($scope.requestedComic.Id <= 2) {
        $scope.requestedComic.Id = 2;
      }
      $scope.requestedComic.Id--;
      $scope.getComic();
    };

    $scope.getComic();
  }
]);
