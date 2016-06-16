app.directive('onFileChange', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      let onChangeHandler = scope.$eval(attrs.onFileChange);
      element.bind('change', onChangeHandler);
    }
  };
});
