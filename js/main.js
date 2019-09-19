'use strict';

var LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lacus nulla, faucibus nec aliquam id, aliquet ut velit. Fusce porta non lorem nec vulputate. Donec nec imperdiet elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi tincidunt tempor ultrices. Mauris consequat felis ullamcorper, aliquet diam sed, accumsan neque. Curabitur tempor lorem id ante viverra venenatis. Vivamus magna purus, euismod at sem ut, pulvinar accumsan ipsum. Maecenas accumsan justo erat, sed fermentum ligula aliquet in. Nullam et congue dolor, nec volutpat diam. Nulla vel odio nec sapien pellentesque tincidunt ac vitae risus.';
var PLACE_AMOUNT = 8;
var PLACE_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var PLACE_ROOMS = [1, 2, 3, 100];
var PLACE_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PLACE_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomArrFromParent = function (parent) {
  return parent.filter(function () {
    return getRandomInt(0, 1);
  });
};

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
        type: PLACE_TYPE[getRandomInt(0, 3)],
        rooms: PLACE_ROOMS[getRandomInt(0, 3)],
        guests: getRandomInt(0, 3),
        checkin: '1' + getRandomInt(2, 4) + ':00',
        checkout: '1' + getRandomInt(2, 4) + ':00',
        features: getRandomArrFromParent(PLACE_FEATURES),
        description: LOREM.slice(0, 150),
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

var mapElem = document.querySelector('.map');
mapElem.classList.remove('map--faded');

var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

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
    result.appendChild(renderPinFromTemplate(data[i]));
  }
  return result;
};

var pinContainerElem = mapElem.querySelector('.map__pins');
pinContainerElem.appendChild(renderPins(getPlacesDataMock()));
