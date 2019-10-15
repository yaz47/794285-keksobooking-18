'use strict';

(function () {
  var START_COORDS = {
    X: 570,
    Y: 375
  };
  var PRICE = {
    LOW: {
      MIN: 0,
      MAX: 9999
    },
    MIDDLE: {
      MIN: 10000,
      MAX: 49999
    },
    HIGH: {
      MIN: 50000
    }
  };

  var mapElem = document.querySelector('.map');
  var filterContainerElem = mapElem.querySelector('.map__filters-container');
  var pinContainerElem = mapElem.querySelector('.map__pins');
  var pinMainElem = pinContainerElem.querySelector('.map__pin--main');
  var filterFormElem = mapElem.querySelector('.map__filters');
  var filterTypeSelect = filterFormElem.querySelector('#housing-type');
  var filterPriceSelect = filterFormElem.querySelector('#housing-price');
  var filterRoomsSelect = filterFormElem.querySelector('#housing-rooms');
  var filterGuestsSelect = filterFormElem.querySelector('#housing-guests');
  var filterWifiInput = filterFormElem.querySelector('#filter-wifi');
  var filterDishwasherInput = filterFormElem.querySelector('#filter-dishwasher');
  var filterParkingInput = filterFormElem.querySelector('#filter-parking');
  var filterWasherInput = filterFormElem.querySelector('#filter-washer');
  var filterElevatorInput = filterFormElem.querySelector('#filter-elevator');
  var filterConditionerInput = filterFormElem.querySelector('#filter-conditioner');

  var activePin = null;

  var activatePin = function (elem) {
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
    elem.classList.add('map__pin--active');
    activePin = elem;
  };

  var deactivatePin = function () {
    if (activePin) {
      activePin.classList.remove('map__pin--active');
      activePin = null;
    }
  };

  var removeCard = function () {
    var card = mapElem.querySelector('.map__card.popup');
    if (card) {
      mapElem.removeChild(card);
    }
  };

  var destroyCard = function () {
    removeCard();
    deactivatePin();
  };

  var destroyPins = function () {
    pinContainerElem.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (elem) {
      pinContainerElem.removeChild(elem);
    });
  };

  var resetMainPin = function () {
    pinMainElem.style.left = START_COORDS.X + 'px';
    pinMainElem.style.top = START_COORDS.Y + 'px';
  };

  var createCard = function (pin) {
    destroyCard();
    var info;
    try {
      info = JSON.parse(pin.dataset.info);
    } catch (err) {
      info = {error: err.msg};
    }
    mapElem.insertBefore(window.renderCardFromTemplate(info), filterContainerElem);
  };

  var initCard = function (pin) {
    createCard(pin);
    activatePin(pin);
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

  var filterByType = function (data) {
    if (filterTypeSelect.value === 'any') {
      return data;
    }

    return data.filter(function (elem) {
      return elem.offer.type === filterTypeSelect.value;
    });
  };

  var filterByPrice = function (data) {
    switch (filterPriceSelect.value) {
      case 'any':
        return data;
      case 'low':
        return data.filter(function (elem) {
          return elem.offer.price > +PRICE.LOW.MIN && elem.offer.price <= +PRICE.LOW.MAX;
        });
      case 'middle':
        return data.filter(function (elem) {
          return elem.offer.price > +PRICE.MIDDLE.MIN && elem.offer.price <= +PRICE.MIDDLE.MAX;
        });
      case 'high':
        return data.filter(function (elem) {
          return elem.offer.price > +PRICE.MIDDLE.MIN;
        });
    }
    return data;
  };

  var filterByRooms = function (data) {
    if (filterRoomsSelect.value === 'any') {
      return data;
    }

    return data.filter(function (elem) {
      return elem.offer.rooms === +filterRoomsSelect.value;
    });
  };

  var filterByGuests = function (data) {
    if (filterGuestsSelect.value === 'any') {
      return data;
    }

    return data.filter(function (elem) {
      return elem.offer.guests === +filterGuestsSelect.value;
    });
  };

  var filterByFeatures = function (data, checkbox) {
    if (!checkbox.checked) {
      return data;
    }

    return data.filter(function (elem) {
      return elem.offer.features.indexOf(checkbox.value) !== -1;
    });
  };

  var filterPinData = function (data) {
    var result = data;
    result = filterByType(result);
    result = filterByPrice(result);
    result = filterByRooms(result);
    result = filterByGuests(result);
    result = filterByFeatures(result, filterWifiInput);
    result = filterByFeatures(result, filterDishwasherInput);
    result = filterByFeatures(result, filterParkingInput);
    result = filterByFeatures(result, filterWasherInput);
    result = filterByFeatures(result, filterElevatorInput);
    result = filterByFeatures(result, filterConditionerInput);
    return result;
  };

  var refreshPins = window.utils.debounce(function () {
    destroyPins();
    destroyCard();
    pinContainerElem.appendChild(window.renderPins(filterPinData(window.app.pinData)));
  });

  filterContainerElem.addEventListener('change', function (evt) {
    if (evt.target.matches('select, input')) {
      refreshPins();
    }
  });

  var activateMap = function () {
    mapElem.classList.remove('map--faded');
    filterFormElem.querySelectorAll('fieldset, input, select').forEach(function (elem) {
      elem.disabled = false;
    });
  };

  var deactivateMap = function () {
    mapElem.classList.add('map--faded');
    destroyCard();
    destroyPins();
    resetMainPin();
    filterFormElem.reset();
    filterFormElem.querySelectorAll('fieldset, input, select').forEach(function (elem) {
      elem.disabled = true;
    });
  };

  window.map = {
    mapElem: mapElem,
    pinMainElem: pinMainElem,
    filterFormElem: filterFormElem,
    pinContainerElem: pinContainerElem,
    activateMap: activateMap,
    deactivateMap: deactivateMap
  };
})();
