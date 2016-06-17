app.controller('EditComicController', [
  '$http',
  '$scope',
  'ComicFactory',
  function($http, $scope, comicFactory) {
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
      reader.readAsDataURL(file);
    };

}]);
