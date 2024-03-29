'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500; // ms

  var KEYCODE = {
    ESC: 27,
    ENTER: 13
  };

  var PLACE_CONFIG = {
    Type: {
      palace: 'Дворец',
      flat: 'Квартира',
      house: 'Дом',
      bungalo: 'Бунгало'
    },
    Rooms: {
      '1': '1 комната',
      '2': '2 комнаты',
      '3': '3 комнаты',
      '100': '100 комнат'
    },
    Guests: {
      '0': 'не для гостей',
      '1': 'для 1 гостя',
      '2': 'для 2 гостей',
      '3': 'для 3 гостей'
    }
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
    DEBOUNCE_INTERVAL: DEBOUNCE_INTERVAL,
    KEYCODE: KEYCODE,
    PLACE_CONFIG: PLACE_CONFIG,
    URL: URL,
    mainElem: mainElem,
    destroyMsg: destroyMsg,
    onError: onError,
    debounce: debounce
  };
})();
