app.controller('EditComicController', [
  '$http',
  '$scope',
  '$location',
  'ComicFactory',
  function($http, $scope, $location, comicFactory) {
    $scope.comicToEdit = comicFactory.getComic();
    $scope.comicToEdit.OriginalPrintDate = new Date($scope.comicToEdit.OriginalPrintDate);

    $scope.loadFile = function() {
      let file = event.target.files[0];
      let fileName = file.name.split('.')[0];
      let reader = new FileReader();
      reader.onload = function() {
        let result = reader.result;
        document.getElementById('imagePreview').src = result;
        // Not sure why this previous line is required. The next line should achieve the same result thanks to two-way data binding.
        $scope.comicToEdit.imageResult = result;
        $scope.comicToEdit.imageEncoded = window.btoa(result);
      }
      console.log(file);
      reader.readAsDataURL(file);
    };

    $scope.putComic = function() {
      let putURL = `http://localhost:5000/api/ComicStrip/${$scope.comicToEdit.ComicStripId}`;
      $http({
        url: putURL,
        method: 'PUT',
        data: JSON.stringify({
          "ComicStripId": $scope.comicToEdit.ComicStripId,
          "Transcript": $scope.comicToEdit.Transcript,
          "OriginalPrintDate": $scope.comicToEdit.OriginalPrintDate,
          "Image": $scope.comicToEdit.imageEncoded
        })
      })
      .then(
        editedComic => {
          console.log('Modified', editedComic);
          $location.path('/');
        },
        error => console.log(error)
      );
    };

}]);
