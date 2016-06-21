"use strict";

app.factory('UserFactory', [
  function() {

    let currentUser = {};

    return {
      getUser() {
        return currentUser;
      },
      setUser(user) {
        currentUser = user;
      }
    }
}]);
