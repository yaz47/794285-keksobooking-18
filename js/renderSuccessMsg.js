'use strict';

(function () {
  var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

  var renderSuccessMsg = function () {
    var successElem = successTemplate.cloneNode(true);

    successElem.tabIndex = 0;

    var onEscPress = function (evt) {
      if (evt.keyCode === window.utils.KEYCODE.ESC) {
        window.utils.destroyMsg(successElem);
      }
      document.removeEventListener('keydown', onEscPress);
    };
    document.addEventListener('keydown', onEscPress);

    successElem.addEventListener('click', function () {
      window.utils.destroyMsg(successElem);
      document.removeEventListener('keydown', onEscPress);
    });

    window.utils.mainElem.appendChild(successElem);
    successElem.focus();
  };

  window.renderSuccessMsg = renderSuccessMsg;
})();
