'use strict';

(function () {
  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  var renderErrorMsg = function (data) {
    var errorElem = errorTemplate.cloneNode(true);

    errorElem.querySelector('.error__message').textContent = data;
    errorElem.querySelector('.error__button').addEventListener('click', function () {
      document.body.removeChild(errorElem);
    });
    document.body.appendChild(errorElem);
  };

  window.renderErrorMsg = renderErrorMsg;
})();
