"use strict";

app.controller('UserController', [
  '$http',
  '$scope',
  '$location',
  'UserFactory'
  function($http, $scope, $location, userFactory) {

    $scope.user = {
      Username: null,
      Email: null,
    };

    $scope.loginUser = function() {
      $http({
        url: 'http://localhost:5000/api/User',
        method: 'POST',
        data: JSON.stringify($scope.user)
      })
      .then(
        success => {
          console.log(success);
          // userFactory.setUser(success);
        },
        error => {
          console.log(error);
        }
      )

      $location.path('/');
    };
}]);
