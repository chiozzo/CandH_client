"use strict";

app.controller('ReadComicController', [
  '$http',
  '$scope',
  '$location',
  'ComicFactory',
  'UserFactory',
  function($http, $scope, $location, comicFactory, userFactory) {

    $scope.searchString = null;

    $scope.user = {};

    $scope.comic = {};

    $scope.getComic = function() {
      if (comicFactory.getRequestedComic().Id != null) {
        comicFactory.setGETURL(`http://localhost:5000/api/ComicStrip?comicStripId=${comicFactory.getRequestedComic().Id}`);
      }

      if ($scope.searchString != null) {
        comicFactory.setGETURL(`http://localhost:5000/api/ComicStrip?emotionSearchString=${$scope.searchString}`);
      }

      $http
      .get(comicFactory.getRequestedComic().getURL)
      .then(
        success => {
          let gotComic = success.data[0];
          // console.log(gotComic);
          comicFactory.setRequestedComicID(gotComic.ComicStripId);
          console.log(comicFactory.getRequestedComic().Id);
          $scope.comic = gotComic;
          $scope.comic.Image = window.atob(gotComic.Image);
          let emotions = $scope.comic.Emotions;
          let emotionTags = [];
          for (var emotionIndex in emotions) {
            emotionTags[emotionIndex] = emotions[emotionIndex].Emotion;
          }
          $scope.comic.emotionTags = emotionTags;
          comicFactory.setComic($scope.comic);
        },
        error => {
          console.log(error);
        }
      );
    };

    $scope.getNextComic = function() {
      if (comicFactory.getRequestedComic().Id == null) {
        comicFactory.setRequestedComicID(1);
      }
      comicFactory.setRequestedComicID(comicFactory.getRequestedComic().Id + 1);
      console.log(comicFactory.getRequestedComic().Id);
      $scope.getComic();
    };

    $scope.getPreviousComic = function() {
      if (comicFactory.getRequestedComic().Id <= 2) {
        comicFactory.setRequestedComicID(2);
      }
      comicFactory.setRequestedComicID(comicFactory.getRequestedComic().Id - 1);
      $scope.getComic();
    };

    $scope.searchComic = function() {
      if (event.keyCode == 13) {
        $scope.getComic();
        $scope.searchString = null;
      }
    };

    $scope.editComic = function() {
      $location.path('/editComic');
    };

    $scope.tagEmotion = function(event) {
      if (event.keyCode == 13) {
        let comicID = $scope.comic.ComicStripId;
        console.log($scope.comic.emotionTags);
        let latestTagIndex = $scope.comic.emotionTags.length - 1;
        console.log(latestTagIndex);
        let emotion = $scope.comic.emotionTags[latestTagIndex].text;
        $http({
          url: `http://localhost:5000/api/Emotion`,
          method: 'POST',
          data: JSON.stringify({
                  'ComicStripId': $scope.comic.ComicStripId,
                  'ComicUserId': 1, // hard coding me as the only user. need to check for logged in user in the future.
                  'Emotion': emotion
                })
        }).then(
          success => console.log(success),
          error => console.log(error)
        );
      }
    };

    $scope.postComment = function() {
      $http({
        url: 'http://localhost:5000/api/Comment',
        method: 'POST',
        data: JSON.stringify({
          'ComicStripId': $scope.comic.ComicStripId,
          'ComicUserId': userFactory.getUser().ComicUserId,
          'Comment': $scope.comic.newComment
        })
      })
      .then(
        success => {
          console.log(success);
          success.data.Reader = {};
          success.data.Reader.Username = userFactory.getUser().Username;
          $scope.comic.Comments.push(success.data)
          $scope.comic.newComment = null;
        },
        error => {
          console.log(error);
        }
      );

    };

    $scope.formatTranscript = function(transcript) {
      // split on new line character and insert </p><p>
    };

    $scope.getLoggedInUser = function() {
      $scope.user.firstName = userFactory.getUser().Username.split(' ')[0];
    };

    $scope.getComic();
    $scope.getLoggedInUser();
  }
]);
