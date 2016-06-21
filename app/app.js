"use strict";

let app = angular.module('CandH', [
  'ngRoute',
  'ngTagsInput'
]);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'partials/readComicStrip.html',
      controller: 'ReadComicController'
    })
    .when('/newComic', {
      templateUrl: 'partials/postComicStrip.html',
      controller: 'PostComicController'
    })
    .when('/editComic', {
      templateUrl: 'partials/editComicStrip.html',
      controller: 'EditComicController'
    })
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'UserController'
    })
    .otherwise('/');
}]);

app.run([
  '$location',
  'UserFactory',
  function($location, userFactory) {
    $location.path('/login');
}]);
