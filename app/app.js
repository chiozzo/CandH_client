"use strict";

let app = angular.module('CandH', [
  'ngRoute'
]);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'partials/PostComicController.html',
      controller: 'PostComicController'
    })
    .otherwise('/');
}]);
