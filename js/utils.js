'use strict';

(function () {
  var KEYCODES = {
    ESC: 27,
    ENTER: 13
  };

  var URL = {
    SAVE: 'https://js.dump.academy/keksobooking',
    LOAD: 'https://js.dump.academy/keksobooking/data'
  };

  var mainElem = document.querySelector('main');

  var destroyMsg = function (msgElem) {
    window.utils.mainElem.removeChild(msgElem);
  };

  var onError = function (errorMsg) {
    window.renderErrorMsg(errorMsg);
  };

  var DEBOUNCE_INTERVAL = 500; // ms

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, window.utils.DEBOUNCE_INTERVAL);
    };
  };

  window.utils = {
    KEYCODES: KEYCODES,
    URL: URL,
    mainElem: mainElem,
    destroyMsg: destroyMsg,
    onError: onError,
    DEBOUNCE_INTERVAL: DEBOUNCE_INTERVAL,
    debounce: debounce
  };
})();
