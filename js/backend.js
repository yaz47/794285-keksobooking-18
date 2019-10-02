'use strict';

(function () {
  var URL = {
    SAVE: 'https://js.dump.academy/keksobooking',
    LOAD: 'https://js.dump.academy/keksobooking/data'
  };

  var initXHR = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = initXHR(onLoad, onError);
    xhr.open('GET', URL.LOAD);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = initXHR(onLoad, onError);
    xhr.open('POST', URL.SAVE);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
