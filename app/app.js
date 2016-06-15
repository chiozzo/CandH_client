"use strict";

let app = angular.module('CandH', [
  'ngRoute'
]);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'partials/postComicStrip.html',
      controller: 'PostComicController'
    })
    .otherwise('/');
}]);
