'use strict';

(function () {
  var mapElem = document.querySelector('.map');
  var filterContainerElem = mapElem.querySelector('.map__filters-container');
  var pinContainerElem = mapElem.querySelector('.map__pins');
  var pinMainElem = pinContainerElem.querySelector('.map__pin--main');
  var filterFormElem = mapElem.querySelector('.map__filters');

  var destroyCard = function () {
    var card = mapElem.querySelector('.map__card.popup');
    if (card) {
      mapElem.removeChild(card);
    }
  };

  var initCard = function (pin) {
    destroyCard();
    mapElem.insertBefore(window.renderCardFromTemplate(window.data.mock[pin.dataset.number]), filterContainerElem);
  };

  pinContainerElem.addEventListener('click', function (evt) {
    var pin = evt.target.closest('.map__pin:not(.map__pin--main)');
    if (pin) {
      initCard(pin);
    }
  });

  pinContainerElem.addEventListener('keydown', function (evt) {
    var pin = evt.target.closest('.map__pin:not(.map__pin--main)');
    if (pin && evt.keyCode === window.utils.KEYCODES.ENTER) {
      initCard(pin);
    }
  });

  mapElem.addEventListener('click', function (evt) {
    var cardClose = evt.target.closest('.popup__close');
    if (cardClose) {
      destroyCard();
    }
  });

  mapElem.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.KEYCODES.ESC) {
      destroyCard();
    }
  });

  window.map = {
    mapElem: mapElem,
    pinMainElem: pinMainElem,
    filterFormElem: filterFormElem,
    pinContainerElem: pinContainerElem
  };
})();
