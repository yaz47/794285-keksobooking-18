'use strict';

(function () {
  var PIN = {
    WIDTH: 50,
    HEIGHT: 70
  };

  var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

  var renderPinFromTemplate = function (data) {
    var pinElem = pinTemplate.cloneNode(true);

    pinElem.style.left = data.location.x - PIN.WIDTH / 2 + 'px';
    pinElem.style.top = data.location.y - PIN.HEIGHT + 'px';

    var pinImgElem = pinElem.querySelector('img');
    pinImgElem.src = data.author.avatar;
    pinImgElem.alt = data.offer.title;

    return pinElem;
  };

  var renderPins = function (data) {
    var result = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      var pin = renderPinFromTemplate(data[i]);
      pin.dataset.number = i;
      result.appendChild(pin);
    }
    return result;
  };

  window.renderPins = renderPins;
})();