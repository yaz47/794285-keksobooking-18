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
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var AVATAR_DEFAULT = 'img/muffin-grey.svg';

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

  var validateForm = function () {
    validateTitleInput();
    validateAddressInput();
    validateTypeInput();
    validatePriceInput();
    validateTimeInput();
    selectRoomsElem.setCustomValidity(window.adForm.validateGuestsAndRooms());
    selectGuestsElem.setCustomValidity(window.adForm.validateGuestsAndRooms());
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

  selectTypeElem.addEventListener('change', onTypeInput);
  selectTimeInElem.addEventListener('change', onTimeInInput);
  selectTimeOutElem.addEventListener('change', onTimeOutInput);
  selectRoomsElem.addEventListener('change', onRoomsOrGuestsInput);
  selectGuestsElem.addEventListener('change', onRoomsOrGuestsInput);

  var isFileSupported = function (file) {
    return FILE_TYPES.some(function (ext) {
      return file.name.toLowerCase().endsWith(ext);
    });
  };

  var createFileInputHandler = function (cb) {
    return function (evt) {
      var file = evt.target.files[0];

      if (isFileSupported(file)) {
        var reader = new FileReader();

        reader.addEventListener('load', function (loadEvt) {
          cb(loadEvt);
        });

        reader.readAsDataURL(file);
      }
    };
  };

  var avatarInput = adFormElem.querySelector('#avatar');
  var avatarImg = adFormElem.querySelector('.ad-form-header__preview img');
  var changeAvatarImg = function (loadEvt) {
    avatarImg.src = loadEvt.target.result;
  };
  var deactivateAvatar = function () {
    avatarImg.src = AVATAR_DEFAULT;
  };
  var onAvatarUpload = createFileInputHandler(changeAvatarImg);

  avatarInput.addEventListener('change', onAvatarUpload);

  var photoInput = adFormElem.querySelector('#images');
  var photoContainer = adFormElem.querySelector('.ad-form__photo-container');
  var deactivatePhotos = function () {
    for (var i = 0; i < photoContainer.children.length; i++) {
      if (photoContainer.children[i].classList.contains('ad-form__photo')) {
        photoContainer.removeChild(photoContainer.children[i]);
      }
    }
    photoContainer.insertAdjacentHTML('beforeend', '<div class="ad-form__photo  ad-form__photo--empty"></div>');
  };
  var addPhoto = function (loadEvt) {
    var photoMock = photoContainer.querySelector('.ad-form__photo--empty');
    if (photoMock) {
      photoContainer.removeChild(photoMock);
    }
    var imgHTML = '<div class="ad-form__photo"><img src="' + loadEvt.target.result + '" alt="Фото жилья" width="70" height="70"></img></div>';
    photoContainer.insertAdjacentHTML('beforeend', imgHTML);
  };
  var onPhotoUpload = createFileInputHandler(addPhoto);

  photoInput.addEventListener('change', onPhotoUpload);

  var activateForm = function () {
    adFormElem.classList.remove('ad-form--disabled');
    adFormElem.querySelectorAll('fieldset, input, select').forEach(function (elem) {
      elem.disabled = false;
    });
    validateForm();
  };

  var deactivateForm = function () {
    deactivateAvatar();
    deactivatePhotos();
    adFormElem.reset();
    validateForm();
    adFormElem.classList.add('ad-form--disabled');
    adFormElem.querySelectorAll('fieldset, input, select').forEach(function (elem) {
      elem.disabled = true;
    });
  };

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
    validateGuestsAndRooms: validateGuestsAndRooms,
    activateForm: activateForm,
    deactivateForm: deactivateForm
  };
})();
