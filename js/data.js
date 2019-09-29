'use strict';

(function () {
  var LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lacus nulla, faucibus nec aliquam id, aliquet ut velit. Fusce porta non lorem nec vulputate. Donec nec imperdiet elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi tincidunt tempor ultrices. Mauris consequat felis ullamcorper, aliquet diam sed, accumsan neque. Curabitur tempor lorem id ante viverra venenatis. Vivamus magna purus, euismod at sem ut, pulvinar accumsan ipsum. Maecenas accumsan justo erat, sed fermentum ligula aliquet in. Nullam et congue dolor, nec volutpat diam. Nulla vel odio nec sapien pellentesque tincidunt ac vitae risus.';
  var PLACE = {
    AMOUNT: 8,
    TYPE: {
      palace: 'Дворец',
      flat: 'Квартира',
      house: 'Дом',
      bungalo: 'Бунгало'
    },
    ROOMS: {
      '1': '1 комната',
      '2': '2 комнаты',
      '3': '3 комнаты',
      '100': '100 комнат'
    },
    GUESTS: {
      '0': 'не для гостей',
      '1': 'для 1 гостя',
      '2': 'для 2 гостей',
      '3': 'для 3 гостей'
    },
    FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    PHOTOS: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
  };

  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomArrFromParent = function (parent) {
    return parent.filter(function () {
      return getRandomInt(0, 1);
    });
  };

  var getPlacesDataMock = function () {
    var result = [];
    for (var i = 1; i <= PLACE.AMOUNT; i++) {
      result.push({
        author: {
          'avatar': 'img/avatars/user0' + i + '.png'
        },
        offer: {
          title: LOREM.slice(0, getRandomInt(6, 40)),
          address: '600, 350',
          price: getRandomInt(5000, 100000),
          type: Object.keys(PLACE.TYPE)[getRandomInt(0, 3)],
          rooms: +Object.keys(PLACE.ROOMS)[getRandomInt(0, 3)],
          guests: +Object.keys(PLACE.GUESTS)[getRandomInt(0, 3)],
          checkin: '1' + getRandomInt(2, 4) + ':00',
          checkout: '1' + getRandomInt(2, 4) + ':00',
          features: getRandomArrFromParent(PLACE.FEATURES),
          description: LOREM.slice(0, getRandomInt(100, 200)),
          photos: getRandomArrFromParent(PLACE.PHOTOS)
        },
        location: {
          x: getRandomInt(10, 90),
          y: getRandomInt(130, 630)
        }
      });
    }
    return result;
  };

  window.data = {
    mock: getPlacesDataMock(),
    PLACE: PLACE
  };
})();
