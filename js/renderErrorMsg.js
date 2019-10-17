'use strict';

(function () {
  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  var renderErrorMsg = function (data) {
    var errorElem = errorTemplate.cloneNode(true);

    errorElem.querySelector('.error__message').textContent = data;

    var onEscPress = function (evt) {
      if (evt.keyCode === window.utils.KEYCODE.ESC) {
        window.utils.destroyMsg(errorElem);
      }
      document.removeEventListener('keydown', onEscPress);
    };
    document.addEventListener('keydown', onEscPress);

    errorElem.addEventListener('click', function () {
      window.utils.destroyMsg(errorElem);
      document.removeEventListener('keydown', onEscPress);
    });

    window.utils.mainElem.appendChild(errorElem);
  };

  window.renderErrorMsg = renderErrorMsg;
})();
