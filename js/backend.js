'use strict';

(function () {
  var STATUS_OK = 200;

  var initXHR = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    return xhr;
  };

  var load = function (url, onLoad, onError) {
    var xhr = initXHR(onLoad, onError);
    xhr.open('GET', url);
    xhr.send();
  };

  var save = function (url, data, onLoad, onError) {
    var xhr = initXHR(onLoad, onError);
    xhr.open('POST', url);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
