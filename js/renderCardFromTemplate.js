'use strict';

(function () {
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

  var filterUndefProp = function (value) {
    return value === undefined ? '' : value;
  };

  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var renderCardFromTemplate = function (data) {
    var cardElem = cardTemplate.cloneNode(true);

    cardElem.querySelector('.popup__title').textContent = filterUndefProp(data.offer.title);
    cardElem.querySelector('.popup__text--address').textContent = filterUndefProp(data.offer.address);
    cardElem.querySelector('.popup__text--price').innerHTML = filterUndefProp(data.offer.price) + '&#x20bd;<span>/ночь</span>';
    cardElem.querySelector('.popup__type').textContent = filterUndefProp(window.utils.PLACE_CONFIG.Type[data.offer.type]);
    cardElem.querySelector('.popup__text--capacity')
      .textContent = filterUndefProp(window.utils.PLACE_CONFIG.Rooms[data.offer.rooms]) + ' ' + filterUndefProp(window.utils.PLACE_CONFIG.Guests[data.offer.guests]);
    cardElem.querySelector('.popup__text--time')
      .textContent = 'Заезд после ' + filterUndefProp(data.offer.checkin) + ', выезд до ' + filterUndefProp(data.offer.checkout);
    cardElem.querySelector('.popup__features').innerHTML = getFeaturesMarkUp(data.offer.features);
    cardElem.querySelector('.popup__description').textContent = filterUndefProp(data.offer.description);
    cardElem.querySelector('.popup__photos').innerHTML = getPhotosMarkUp(data.offer.photos);
    cardElem.querySelector('.popup__avatar').src = filterUndefProp(data.author.avatar);

    return cardElem;
  };

  window.renderCardFromTemplate = renderCardFromTemplate;
})();
