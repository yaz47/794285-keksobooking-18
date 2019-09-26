'use strict';

var LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lacus nulla, faucibus nec aliquam id, aliquet ut velit. Fusce porta non lorem nec vulputate. Donec nec imperdiet elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi tincidunt tempor ultrices. Mauris consequat felis ullamcorper, aliquet diam sed, accumsan neque. Curabitur tempor lorem id ante viverra venenatis. Vivamus magna purus, euismod at sem ut, pulvinar accumsan ipsum. Maecenas accumsan justo erat, sed fermentum ligula aliquet in. Nullam et congue dolor, nec volutpat diam. Nulla vel odio nec sapien pellentesque tincidunt ac vitae risus.';
var PLACE_AMOUNT = 8;
var PLACE_TYPE = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};
var PLACE_ROOMS = {
  '1': '1 комната',
  '2': '2 комнаты',
  '3': '3 комнаты',
  '100': '100 комнат'
};
var PLACE_GUESTS = {
  '0': 'не для гостей',
  '1': 'для 1 гостя',
  '2': 'для 2 гостей',
  '3': 'для 3 гостей'
};
var PLACE_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PLACE_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var ROOMS_GUESTS_CONFIG = {
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
};
var TYPE_PRICE_CONFIG = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalo: 0
};
var PIN_Y_POINTER = 16;

var TITLE_MIN_LENGTH = 30;
var TITLE_MAX_LENGTH = 100;
var PRICE_MAX_VALUE = 1000000;

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var isPageActive = false;

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomArrFromParent = function (parent) {
  return parent.filter(function () {
    return getRandomInt(0, 1);
  });
};

// var activateElem = function (elem, className) {
//   elem.classList.remove(className);
// };

var getPlacesDataMock = function () {
  var result = [];
  for (var i = 1; i <= PLACE_AMOUNT; i++) {
    result.push({
      author: {
        'avatar': 'img/avatars/user0' + i + '.png'
      },
      offer: {
        title: LOREM.slice(0, getRandomInt(6, 40)),
        address: '600, 350',
        price: getRandomInt(5000, 100000),
        type: Object.keys(PLACE_TYPE)[getRandomInt(0, 3)],
        rooms: +Object.keys(PLACE_ROOMS)[getRandomInt(0, 3)],
        guests: +Object.keys(PLACE_GUESTS)[getRandomInt(0, 3)],
        checkin: '1' + getRandomInt(2, 4) + ':00',
        checkout: '1' + getRandomInt(2, 4) + ':00',
        features: getRandomArrFromParent(PLACE_FEATURES),
        description: LOREM.slice(0, getRandomInt(100, 200)),
        photos: getRandomArrFromParent(PLACE_PHOTOS)
      },
      location: {
        x: getRandomInt(10, 90),
        y: getRandomInt(130, 630)
      }
    });
  }
  return result;
};

var dataMock = getPlacesDataMock();

var mapElem = document.querySelector('.map');
var pinContainerElem = mapElem.querySelector('.map__pins');
var pinMainElem = pinContainerElem.querySelector('.map__pin--main');
var filterContainerElem = mapElem.querySelector('.map__filters-container');
var adFormElem = document.querySelector('.ad-form');
var inputTitleElem = adFormElem.querySelector('#title');
var inputPriceElem = adFormElem.querySelector('#price');
var selectTypeElem = adFormElem.querySelector('#type');
var inputAddressElem = adFormElem.querySelector('#address');
var selectRoomsElem = adFormElem.querySelector('#room_number');
var selectGuestsElem = adFormElem.querySelector('#capacity');
var filterFromElem = mapElem.querySelector('.map__filters');

var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

var renderPinFromTemplate = function (data) {
  var pinElem = pinTemplate.cloneNode(true);

  pinElem.style.left = data.location.x + '%';
  pinElem.style.top = data.location.y + 'px';

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

var getFeaturesMarkUp = function (features) {
  var html = '';
  features.forEach(function (val) {
    html += '<li class="popup__feature popup__feature--' + val + '"></li>';
  });
  return html;
};

var getPhotosMarkUp = function (photos) {
  var html = '';
  photos.forEach(function (val) {
    html += '<img src="' + val + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
  });
  return html;
};

var renderCardFromTemplate = function (data) {
  var cardElem = cardTemplate.cloneNode(true);

  cardElem.querySelector('.popup__title').textContent = data.offer.title;
  cardElem.querySelector('.popup__text--address').textContent = data.offer.address;
  cardElem.querySelector('.popup__text--price').innerHTML = data.offer.price + '&#x20bd;<span>/ночь</span>';
  cardElem.querySelector('.popup__type').textContent = PLACE_TYPE[data.offer.type];
  cardElem.querySelector('.popup__text--capacity')
    .textContent = PLACE_ROOMS[data.offer.rooms] + ' ' + PLACE_GUESTS[data.offer.guests];
  cardElem.querySelector('.popup__text--time')
    .textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
  cardElem.querySelector('.popup__features').innerHTML = getFeaturesMarkUp(data.offer.features);
  cardElem.querySelector('.popup__description').textContent = data.offer.description;
  cardElem.querySelector('.popup__photos').innerHTML = getPhotosMarkUp(data.offer.photos);
  cardElem.querySelector('.popup__avatar').src = data.author.avatar;

  return cardElem;
};

var destroyCard = function () {
  var card = mapElem.querySelector('.map__card.popup');
  if (card) {
    mapElem.removeChild(card);
  }
};

var initCard = function (pin) {
  destroyCard();
  mapElem.insertBefore(renderCardFromTemplate(dataMock[pin.dataset.number]), filterContainerElem);
};

var deactivatePage = function () {
  mapElem.classList.add('map--faded');
  adFormElem.classList.add('ad-form--disabled');
  adFormElem.querySelectorAll('fieldset, input, select').forEach(function (elem) {
    elem.disabled = true;
  });
  filterFromElem.querySelectorAll('fieldset, input, select').forEach(function (elem) {
    elem.disabled = true;
  });
  isPageActive = false;
};

var activatePage = function () {
  mapElem.classList.remove('map--faded');
  adFormElem.classList.remove('ad-form--disabled');
  adFormElem.querySelectorAll('fieldset, input, select').forEach(function (elem) {
    elem.disabled = false;
  });
  filterFromElem.querySelectorAll('fieldset, input, select').forEach(function (elem) {
    elem.disabled = false;
  });
  validateTitleInput();
  validatePriceInput();
  validateTypeInput();
  selectRoomsElem.setCustomValidity(validateGuestsAndRooms());
  pinContainerElem.appendChild(renderPins(dataMock));
  isPageActive = true;
};

var getAddressCoords = function () {
  var xPointer = pinMainElem.offsetWidth / 2;
  var yPointer = isPageActive ? pinMainElem.offsetHeight + PIN_Y_POINTER
    : pinMainElem.offsetHeight / 2;
  var xCoord = Math.round(pinMainElem.offsetLeft + xPointer);
  var yCoord = Math.round(pinMainElem.offsetTop + yPointer);
  inputAddressElem.value = xCoord + ', ' + yCoord;
};

pinMainElem.addEventListener('mousedown', function () {
  activatePage();
  getAddressCoords();
});

pinMainElem.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activatePage();
    getAddressCoords();
  }
});

var initPage = function () {
  deactivatePage();
  getAddressCoords();
};

initPage();

var validateGuestsAndRooms = function () {
  var rooms = selectRoomsElem.value;
  var guests = selectGuestsElem.value;

  if (ROOMS_GUESTS_CONFIG[rooms].val.indexOf(guests) === -1) {
    return ROOMS_GUESTS_CONFIG[rooms].errMsg;
  }

  return '';
};

var validateTitleInput = function () {
  inputTitleElem.required = true;
  inputTitleElem.type = 'text';
  inputTitleElem.minLength = TITLE_MIN_LENGTH;
  inputTitleElem.maxLength = TITLE_MAX_LENGTH;
};

var validatePriceInput = function () {
  inputPriceElem.required = true;
  inputPriceElem.type = 'number';
  inputPriceElem.max = PRICE_MAX_VALUE;
};

var validateTypeInput = function () {
  inputPriceElem.min = TYPE_PRICE_CONFIG[selectTypeElem.value];
  inputPriceElem.placeholder = TYPE_PRICE_CONFIG[selectTypeElem.value];
};

var onTypeInput = function () {
  validateTypeInput();
};

var onRoomsOrGuestsInput = function () {
  selectRoomsElem.setCustomValidity(validateGuestsAndRooms());
  selectGuestsElem.setCustomValidity(validateGuestsAndRooms());
};

selectTypeElem.addEventListener('input', onTypeInput);
selectRoomsElem.addEventListener('input', onRoomsOrGuestsInput);
selectGuestsElem.addEventListener('input', onRoomsOrGuestsInput);

pinContainerElem.addEventListener('click', function (evt) {
  var pin = evt.target.closest('.map__pin:not(.map__pin--main)');
  if (pin) {
    initCard(pin);
  }
});

pinContainerElem.addEventListener('keydown', function (evt) {
  var pin = evt.target.closest('.map__pin:not(.map__pin--main)');
  if (pin && evt.keyCode === ENTER_KEYCODE) {
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
  if (evt.keyCode === ESC_KEYCODE) {
    destroyCard();
  }
});
