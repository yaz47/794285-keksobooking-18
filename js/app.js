'use strict';

(function () {
  var PIN_Y_POINTER = 16;
  var PIN_Y_MIN = 130;
  var PIN_Y_MAX = 630;

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

  var updateAddressCoords = function () {
    var xPointer = window.map.pinMainElem.offsetWidth / 2;
    var yPointer = isPageActive ? window.map.pinMainElem.offsetHeight + PIN_Y_POINTER
      : window.map.pinMainElem.offsetHeight / 2;
    var xCoord = Math.round(window.map.pinMainElem.offsetLeft + xPointer);
    var yCoord = Math.round(window.map.pinMainElem.offsetTop + yPointer);
    window.adForm.inputAddressElem.value = xCoord + ', ' + yCoord;
  };

  var getXCoord = function (x) {
    var start = window.map.pinContainerElem.offsetLeft;
    var end = window.map.pinContainerElem.offsetLeft + window.map.pinContainerElem.offsetWidth - window.map.pinMainElem.offsetWidth;

    if (x < start) {
      return start;
    }

    if (x > end) {
      return end;
    }
    return x;
  };

  var getYCoord = function (y) {
    var start = window.map.pinContainerElem.offsetTop + PIN_Y_MIN - window.map.pinMainElem.offsetHeight - PIN_Y_POINTER;
    var end = window.map.pinContainerElem.offsetTop + PIN_Y_MAX - window.map.pinMainElem.offsetHeight - PIN_Y_POINTER;

    if (y < start) {
      return start;
    }

    if (y > end) {
      return end;
    }
    return y;
  };

  window.map.pinMainElem.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    if (!isPageActive) {
      activatePage();
      updateAddressCoords();
    }

    var startCoords = {
      x: window.map.pinMainElem.offsetLeft,
      y: window.map.pinMainElem.offsetTop
    };

    var startMouseCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startMouseCoords.x - moveEvt.clientX,
        y: startMouseCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: startCoords.x - shift.x,
        y: startCoords.y - shift.y
      };

      startMouseCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      window.map.pinMainElem.style.left = getXCoord(startCoords.x) + 'px';
      window.map.pinMainElem.style.top = getYCoord(startCoords.y) + 'px';

      updateAddressCoords();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      updateAddressCoords();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.map.pinMainElem.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.KEYCODES.ENTER && !isPageActive) {
      activatePage();
      updateAddressCoords();
    }
  });

  var initPage = function () {
    deactivatePage();
    updateAddressCoords();
  };

  initPage();
})();
