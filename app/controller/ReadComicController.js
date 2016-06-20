"use strict";

app.controller('ReadComicController', [
  '$http',
  '$scope',
  '$location',
  'ComicFactory',
  function($http, $scope, $location, comicFactory) {

    $scope.comic = {};

    $scope.requestedComic = {
      "Id": null,
      "getURL": 'http://localhost:5000/api/ComicStrip'
    };

    $scope.getComic = function() {
      if ($scope.requestedComic.Id != null) {
        $scope.requestedComic.getURL = `http://localhost:5000/api/ComicStrip?comicStripId=${$scope.requestedComic.Id}`
      }
      $http
      .get($scope.requestedComic.getURL)
      .then(
        success => {
          let gotComic = success.data[0];
          $scope.comic = gotComic;
          $scope.requestedComic.Id = gotComic.ComicStripId;
          $scope.comic.Image = window.atob(gotComic.Image);
          comicFactory.setComic($scope.comic);
        },
        error => {
          console.log(error);
        }
      );
    };

    $scope.getNextComic = function() {
      if ($scope.requestedComic.Id == null) {
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

    $scope.editComic = function() {
      $location.path('/editComic');
    };

    $scope.tagEmotion = function(event) {
      if (event.keyCode == 13) {
        console.log(event);
        console.log("tag emotion run");
        for (var index in $scope.comic.emotionTags) {
          // put will go here
          console.log($scope.comic.emotionTags[index].text);
        }
      }
    };

    $scope.formatTranscript = function(transcript) {
      // split on new line character and insert </p><p>
    }

    $scope.getComic();
  }
]);
