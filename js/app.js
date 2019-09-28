'use strict';

(function () {
  var PIN_Y_POINTER = 16;

  var isPageActive = false;

  var deactivatePage = function () {
    window.map.mapElem.classList.add('map--faded');
    window.adForm.adFormElem.classList.add('ad-form--disabled');
    window.adForm.adFormElem.querySelectorAll('fieldset, input, select').forEach(function (elem) {
      elem.disabled = true;
    });
    window.map.filterFormElem.querySelectorAll('fieldset, input, select').forEach(function (elem) {
      elem.disabled = true;
    });
    isPageActive = false;
  };

  var activatePage = function () {
    window.map.mapElem.classList.remove('map--faded');
    window.adForm.adFormElem.classList.remove('ad-form--disabled');
    window.adForm.adFormElem.querySelectorAll('fieldset, input, select').forEach(function (elem) {
      elem.disabled = false;
    });
    window.map.filterFormElem.querySelectorAll('fieldset, input, select').forEach(function (elem) {
      elem.disabled = false;
    });
    window.adForm.validateTitleInput();
    window.adForm.validateAddressInput();
    window.adForm.validateTypeInput();
    window.adForm.validatePriceInput();
    window.adForm.validateTimeInput();
    window.adForm.selectRoomsElem.setCustomValidity(window.adForm.validateGuestsAndRooms());
    window.adForm.selectGuestsElem.setCustomValidity(window.adForm.validateGuestsAndRooms());
    window.map.pinContainerElem.appendChild(window.renderPins(window.data.mock));
    isPageActive = true;
  };

  var getAddressCoords = function () {
    var xPointer = window.map.pinMainElem.offsetWidth / 2;
    var yPointer = isPageActive ? window.map.pinMainElem.offsetHeight + PIN_Y_POINTER
      : window.map.pinMainElem.offsetHeight / 2;
    var xCoord = Math.round(window.map.pinMainElem.offsetLeft + xPointer);
    var yCoord = Math.round(window.map.pinMainElem.offsetTop + yPointer);
    window.adForm.inputAddressElem.value = xCoord + ', ' + yCoord;
  };

  window.map.pinMainElem.addEventListener('mousedown', function () {
    activatePage();
    getAddressCoords();
  });

  window.map.pinMainElem.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.KEYCODES.ENTER) {
      activatePage();
      getAddressCoords();
    }
  });

  var initPage = function () {
    deactivatePage();
    getAddressCoords();
  };

  initPage();
})();
