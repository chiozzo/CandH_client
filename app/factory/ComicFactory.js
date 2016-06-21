"use strict";

app.factory('ComicFactory', [
  function() {

    let requestedComic = {
      "Id": null,
      "getURL": 'http://localhost:5000/api/ComicStrip'
    };

    let currentComic = null;
    return {
      getComic() {
        return currentComic;
      },
      setComic(comic) {
        currentComic = comic;
      },
      getRequestedComic() {
        return requestedComic;
      },
      setRequestedComicID(id) {
        requestedComic.Id = id;
      },
      setGETURL(getURL) {
        requestedComic.getURL = getURL;
      }
    }
}]);
