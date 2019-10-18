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
  var arrayOfFeatures = Array.from(filterFormElem.querySelectorAll('input[type="checkbox"]'));

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
    Array.from(pinContainerElem.querySelectorAll('.map__pin:not(.map__pin--main)')).forEach(function (elem) {
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
    if (pin && evt.keyCode === window.utils.KEYCODE.ENTER) {
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
    if (evt.keyCode === window.utils.KEYCODE.ESC) {
      destroyCard();
    }
  });

  var filterByType = function (place) {
    return filterTypeSelect.value === 'any' ? true : place.offer.type === filterTypeSelect.value;
  };

  var filterByPrice = function (place) {
    switch (filterPriceSelect.value) {
      case 'any':
        return true;
      case 'low':
        return place.offer.price >= +PRICE.LOW.MIN && place.offer.price <= +PRICE.LOW.MAX;
      case 'middle':
        return place.offer.price >= +PRICE.MIDDLE.MIN && place.offer.price <= +PRICE.MIDDLE.MAX;
      case 'high':
        return place.offer.price >= +PRICE.HIGH.MIN;
    }
    return true;
  };

  var filterByRooms = function (place) {
    return filterRoomsSelect.value === 'any' ? true : place.offer.rooms === +filterRoomsSelect.value;
  };

  var filterByGuests = function (place) {
    return filterGuestsSelect.value === 'any' ? true : place.offer.guests === +filterGuestsSelect.value;
  };

  var filterByFeatures = function (place) {
    return !arrayOfFeatures.some(function (checkbox) {
      return checkbox.checked && place.offer.features.indexOf(checkbox.value) === -1;
    });
  };

  var filterPinData = function (data) {
    return data.filter(function (place) {
      return filterByType(place) && filterByPrice(place) && filterByRooms(place) && filterByGuests(place) && filterByFeatures(place);
    });
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

  var filterFormControls = Array.from(filterFormElem.querySelectorAll('fieldset, input, select'));

  var activateFilterForm = function () {
    filterFormControls.forEach(function (elem) {
      elem.disabled = false;
    });
  };

  var deactivateFilterForm = function () {
    filterFormControls.forEach(function (elem) {
      elem.disabled = true;
    });
  };

  var activateMap = function () {
    mapElem.classList.remove('map--faded');
  };

  var deactivateMap = function () {
    mapElem.classList.add('map--faded');
    destroyCard();
    destroyPins();
    resetMainPin();
    filterFormElem.reset();
    deactivateFilterForm();
  };

  window.map = {
    mapElem: mapElem,
    pinMainElem: pinMainElem,
    filterFormElem: filterFormElem,
    pinContainerElem: pinContainerElem,
    activateMap: activateMap,
    deactivateMap: deactivateMap,
    activateFilterForm: activateFilterForm
  };
})();
