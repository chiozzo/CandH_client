"use strict";

let app = angular.module('CandH', [
  'ngRoute'
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
    .otherwise('/');
}]);
