'use strict';

(function () {
  var PIN = {
    WIDTH: 50,
    HEIGHT: 70
  };
  var PINS_MAX = 5;

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
    var length = data.length < PINS_MAX ? data.length : PINS_MAX;
    for (var i = 0; i < length; i++) {
      if (data[i].offer) {
        var pin = renderPinFromTemplate(data[i]);
        var info;
        try {
          info = JSON.stringify(data[i]);
        } catch (err) {
          info = '' + err.message;
        }
        pin.dataset.info = info;
        result.appendChild(pin);
      }
    }
    return result;
  };

  window.renderPins = renderPins;
})();
