"use strict";

app.factory('ComicFactory', [
  function() {
    let currentComic = null;
    return {
      getComic() {
        return currentComic;
      },
      setComic(comic) {
        currentComic = comic;
      }
    }
}]);
