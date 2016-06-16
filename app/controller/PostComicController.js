"use strict";

app.controller('PostComicController', [
  '$http',
  '$scope',
  function($http, $scope) {

    $scope.comicStrip = {};

    $scope.loadFile = function() {
      let file = event.target.files[0];
      let fileName = file.name.split('.')[0];
      // next line in prep for using part of file name for comic name
      // let comicStripName = fileName.split('_')[1];
      let reader = new FileReader();
      reader.onload = function() {
        let result = reader.result;
        document.getElementById('imagePreview').src = result;
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
          // do I want the comic strip name to be the filename?
          "Name": $scope.comicStrip.name,
          "OriginalPrintDate": $scope.comicStrip.originalPrintDate,
          "Transcript": $scope.comicStrip.transcript,
          "Image": $scope.comicStrip.imageEncoded
        })
      })
      .success(newComic => console.log(`201 Created`, newComic))
    };
}]);
