'use strict';

(function () {
  window.utils = {};

  window.utils.KEYCODES = {
    ESC: 27,
    ENTER: 13
  };

  window.utils.URL = {
    SAVE: 'https://js.dump.academy/keksobooking',
    LOAD: 'https://js.dump.academy/keksobooking/data'
  };

  window.utils.mainElem = document.querySelector('main');

  window.utils.destroyMsg = function (msgElem) {
    window.utils.mainElem.removeChild(msgElem);
  };

  window.utils.onError = function (errorMsg) {
    window.renderErrorMsg(errorMsg);
  };
})();
