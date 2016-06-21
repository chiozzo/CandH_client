"use strict";

app.controller('PostComicController', [
  '$http',
  '$scope',
  '$location',
  function($http, $scope, $location) {

    $scope.comicStrip = {};

    $scope.loadFile = function() {
      let file = event.target.files[0];
      let fileName = file.name.split('.')[0];
      let reader = new FileReader();
      reader.onload = function() {
        let result = reader.result;
        document.getElementById('imagePreview').src = result;
        // Not sure why this previous line is required. The next line should achieve the same result thanks to two-way data binding.
        $scope.comicStrip.imageResult = result;
        $scope.comicStrip.imageEncoded = window.btoa(result);
      }
      reader.readAsDataURL(file);
    };

    $scope.postComic = function() {
      $http({
        url: 'http://localhost:5000/api/ComicStrip',
        method: 'POST',
        data: JSON.stringify({
          "Transcript": $scope.comicStrip.transcript,
          "OriginalPrintDate": $scope.comicStrip.originalPrintDate,
          "Image": $scope.comicStrip.imageEncoded
        })
      })
      .then(
        newComic => {
          console.log(`201 Created`, newComic);
          comicFactory.setRequestedComicID(newComic.ComicStripId);
          $location.path('/');
        },
        error => {
          console.log(error);
        }
      )
    };
}]);
