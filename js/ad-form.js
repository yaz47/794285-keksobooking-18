'use strict';

(function () {
  var CONFIG = {
    TYPE_PRICE: {
      palace: 10000,
      flat: 1000,
      house: 5000,
      bungalo: 0
    },
    ROOMS_GUESTS: {
      '1': {
        val: ['1'],
        errMsg: '1 комната только для 1 гостя'
      },
      '2': {
        val: ['1', '2'],
        errMsg: '2 комнаты только для 1 или 2 гостей'
      },
      '3': {
        val: ['1', '2', '3'],
        errMsg: '3 комнаты только для 1, 2 или 3 гостей'
      },
      '100': {
        val: ['0'],
        errMsg: '100 комнат не для гостей'
      }
    }
  };
  var TITLE = {
    LENGTH: {
      MIN: 30,
      MAX: 100
    }
  };
  var PRICE_MAX_VALUE = 1000000;

  var adFormElem = document.querySelector('.ad-form');
  var inputTitleElem = adFormElem.querySelector('#title');
  var inputAddressElem = adFormElem.querySelector('#address');
  var selectTypeElem = adFormElem.querySelector('#type');
  var inputPriceElem = adFormElem.querySelector('#price');
  var selectTimeInElem = adFormElem.querySelector('#timein');
  var selectTimeOutElem = adFormElem.querySelector('#timeout');
  var selectRoomsElem = adFormElem.querySelector('#room_number');
  var selectGuestsElem = adFormElem.querySelector('#capacity');

  var validateTitleInput = function () {
    inputTitleElem.required = true;
    inputTitleElem.type = 'text';
    inputTitleElem.minLength = TITLE.LENGTH.MIN;
    inputTitleElem.maxLength = TITLE.LENGTH.MAX;
  };

  var validateAddressInput = function () {
    inputAddressElem.readOnly = true;
  };

  var validateTypeInput = function () {
    inputPriceElem.min = CONFIG.TYPE_PRICE[selectTypeElem.value];
    inputPriceElem.placeholder = CONFIG.TYPE_PRICE[selectTypeElem.value];
  };

  var validatePriceInput = function () {
    inputPriceElem.required = true;
    inputPriceElem.type = 'number';
    inputPriceElem.max = PRICE_MAX_VALUE;
  };

  var validateTimeInput = function () {
    selectTimeInElem.value = selectTimeOutElem.value;
  };

  var validateGuestsAndRooms = function () {
    var rooms = selectRoomsElem.value;
    var guests = selectGuestsElem.value;

    if (CONFIG.ROOMS_GUESTS[rooms].val.indexOf(guests) === -1) {
      return CONFIG.ROOMS_GUESTS[rooms].errMsg;
    }

    return '';
  };

  var onTypeInput = function () {
    validateTypeInput();
  };

  var onTimeInInput = function () {
    selectTimeOutElem.value = selectTimeInElem.value;
  };

  var onTimeOutInput = function () {
    selectTimeInElem.value = selectTimeOutElem.value;
  };

  var onRoomsOrGuestsInput = function () {
    selectRoomsElem.setCustomValidity(validateGuestsAndRooms());
    selectGuestsElem.setCustomValidity(validateGuestsAndRooms());
  };

  selectTypeElem.addEventListener('input', onTypeInput);
  selectTimeInElem.addEventListener('input', onTimeInInput);
  selectTimeOutElem.addEventListener('input', onTimeOutInput);
  selectRoomsElem.addEventListener('input', onRoomsOrGuestsInput);
  selectGuestsElem.addEventListener('input', onRoomsOrGuestsInput);

  window.adForm = {
    adFormElem: adFormElem,
    inputAddressElem: inputAddressElem,
    selectRoomsElem: selectRoomsElem,
    selectGuestsElem: selectGuestsElem,
    validateTitleInput: validateTitleInput,
    validateAddressInput: validateAddressInput,
    validateTypeInput: validateTypeInput,
    validatePriceInput: validatePriceInput,
    validateTimeInput: validateTimeInput,
    validateGuestsAndRooms: validateGuestsAndRooms
  };
})();
