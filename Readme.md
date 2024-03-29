# Личный проект «Кексобукинг» [![Build status][travis-image]][travis-url]

* Студент: [Ярослав Заярный](https://up.htmlacademy.ru/javascript/18/user/794285).
* Наставник: [Сергей Рубец](https://up.htmlacademy.ru/javascript/18/user/41580).

---

<a href="https://htmlacademy.ru/intensive/javascript"><img align="left" width="50" height="50" alt="HTML Academy" src="https://up.htmlacademy.ru/static/img/intensive/javascript/logo-for-github-2.png"></a>

Репозиторий создан для обучения на интенсивном онлайн‑курсе «[Профессиональный JavaScript](https://htmlacademy.ru/intensive/javascript)», уровень 1 от [HTML Academy](https://htmlacademy.ru).

---

## Техническое задание

**О проекте**

Кексобукинг — сервис размещения объявлений о сдаче в аренду недвижимости в центре Токио. Пользователям предоставляется возможность размещать объявления о своей недвижимости или просматривать уже размещённые объявления.

**Описание функциональности**

1. ### Состояния страницы

    Неактивное состояние. При первом открытии, страница находится в неактивном состоянии: блок с картой находится в неактивном состоянии, форма подачи заявления заблокирована.

    * Блок с картой .map содержит класс map--faded;

    * Форма заполнения информации об объявлении .ad-form содержит класс ad-form--disabled;

    * Все ``<input>`` и ``<select>`` формы .ad-form заблокированы с помощью атрибута disabled, добавленного на них или на их родительские блоки fieldset;

    * Форма с фильтрами .map__filters заблокирована так же, как и форма .ad-form;

    * Единственное доступное действие в неактивном состоянии — перемещение метки .map__pin--main, являющейся контролом указания адреса объявления. Первое взаимодействие с меткой (mousedown) переводит страницу в активное состояние.

    Активное состояние. В активном состоянии страница позволяет вносить изменения в форму и отправлять её на сервер, просматривать похожие объявления на карте, фильтровать их и уточнять подробную информацию о них, показывая для каждого из объявлений карточку.

2. ### Заполнение информации

    2.1. Заполнение информации и отправка данных:

    * заголовок;

    * адрес;

    * вид недвижимости;

    * количество комнат;

    * количество спальных мест;

    * время заезда и выезда из квартиры;

    * дополнительные параметры:

    * парковка;

    * Wi-Fi;

    * кондиционер;

    * кухня;

    * стиральная машина;

    * лифт.

    * фотографии;

    свободное текстовое описание.

    2.2. Заполнение всей информации производится на одной странице без промежуточных переходов. Порядок заполнения информации не важен.

    2.3. После заполнения всех данных, при нажатии на кнопку «Опубликовать», все данные из формы, включая изображения, с помощью AJAX-запроса отправляются на сервер https://js.dump.academy/keksobooking методом POST с типом multipart/form-data.

    2.4. Страница реагирует на неправильно введённые значения в форму. Если данные, введённые в форму, не соответствуют ограничениям, указанным в разделе, описывающем поля ввода, форму невозможно отправить на сервер. При попытке отправить форму с неправильными данными, отправки не происходит, а неверно заполненные поля подсвечиваются красной рамкой. Способ добавления рамки и её стиль произвольные.

    2.5. При успешной отправке формы страница, не перезагружаясь, переходит в изначальное неактивное состояние, а также:

    * все заполненные поля возвращются в изначальное состояние, в том числе фильтры;

    * метки похожих объявлений и карточка активного объявления удаляются;

    * метка адреса возвращается в исходное положение;

    * значение поля адреса корректируется соответственно положению метки;

    * на экран выводится сообщение об успешной отправке данных. Разметку сообщения, которая находится блоке #success внутри шаблона template, нужно разместить в main;

    * сообщение должно исчезать по нажатию на клавишу Esc и по клику на произвольную область экрана за пределами блока с сообщением.

    2.6. Если при отправке данных произошла ошибка запроса, показывается соответствующее сообщение. Разметку сообщения, которая находится в блоке #error в шаблоне template, нужно разместить в main. Сообщение должно исчезать после нажатия на кнопку .error__button, по нажатию на клавишу Esc и по клику на произвольную область экрана за пределами блока с сообщением.

    2.7. Нажатие на кнопку .ad-form__reset сбрасывает страницу в исходное неактивное состояние без перезагрузки, а также:

    * все заполненные поля возвращются в изначальное состояние, в том числе фильтры;

    * метки похожих объявлений и карточка активного объявления удаляются;

    * метка адреса возвращается в исходное положение;

    * значение поля адреса корректируется соответственно положению метки;

3. ### Ограничения, накладываемые на поля ввода

    3.1. Заголовок объявления:

    * Обязательное текстовое поле;

    * Минимальная длина — 30 символов;

    * Максимальная длина — 100 символов.

    3.2. Цена за ночь:

    * Обязательное поле;

    * Числовое поле;

    * Максимальное значение — 1 000 000.

    3.3. Поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь»:

    * «Бунгало» — минимальная цена за ночь 0;

    * «Квартира» — минимальная цена за ночь 1 000;

    * «Дом» — минимальная цена 5 000;

    * «Дворец» — минимальная цена 10 000.

    * Вместе с минимальным значением цены нужно изменять и плейсхолдер.

    Обратите внимание: ограничение минимальной цены заключается именно в изменении минимального значения, которое можно ввести в поле с ценой, изменять само значение поля не нужно, это приведёт к плохому UX. Даже если текущее значение не попадает под новые ограничения не стоит без ведома пользователя изменять значение поля.

    3.4. Адрес: ручное редактирование поля запрещено. Значение автоматически выставляется при перемещении метки .map__pin--main по карте. Подробности заполнения поля адреса, описаны вместе с поведением метки.

    3.5. Поля «Время заезда» и «Время выезда» синхронизированы: при изменении значения одного поля, во втором выделяется соответствующее ему. Например, если время заезда указано «после 14», то время выезда будет равно «до 14» и наоборот.

    3.6. Поле «Количество комнат» синхронизировано с полем «Количество мест» таким образом, что при выборе количества комнат вводятся ограничения на допустимые варианты выбора количества гостей:

    * 1 комната — «для 1 гостя»;

    * 2 комнаты — «для 2 гостей» или «для 1 гостя»;

    * 3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»;

    * 100 комнат — «не для гостей».

    Допускаются разные способы ограничения допустимых значений поля «Количество мест»: удаление из разметки соответствующих элементов option, добавление элементам option состояния disabled или другие способы ограничения, например, с помощью метода setCustomValidity.

4. ### Выбор адреса на карте:

    4.1. Приблизительный адрес квартиры указывается перемещением специальной метки по карте Токио. Содержимое поля адреса должно соответствовать координатам метки:

    * в неактивном режиме страницы метка круглая, поэтому в поле адреса подставляются координаты центра метки;

    * при переходе страницы в активное состояние в поле адреса подставляются координаты острого конца метки;

    * при перемещении (mousemove) метки в поле адреса подставляются координаты острого конца метки

    4.2. Формат значения поля адреса: {{x}}, {{y}}, где {{x}} и {{y}} это координаты, на которые метка указывает своим острым концом. Например, если метка .map__pin--main имеет CSS-координаты top: 200px; left: 300px, то в поле адрес должно быть записано значение 300 + расстояние до острого конца по горизонтали, 200 + расстояние до острого конца по вертикали. Координаты не должны быть дробными.

    4.3. Для удобства пользователей значение Y-координаты адреса должно быть ограничено интервалом от 130 до 630. Значение X-координаты адреса должно быть ограничено размерами блока, в котором перемещается метка.

    4.4. При ограничении перемещения метки по горизонтали её острый конец должен указывать на крайнюю точку блока. При выходе за границы блока часть метки скрывается. Скрытие реализовано стилями блока.

5. ### Сравнение с похожими объявлениями

    5.1. Полный список похожих объявлений загружается после перехода страницы в активное состояние с сервера https://js.dump.academy/keksobooking/data. Каждое из объявлений показывается на карте в виде специальной метки: блока, имеющего класс map__pin. Шаблонный элемент для метки .map__pin находится в шаблоне template. Разметка каждой из меток должна создаваться по аналогии с шаблонным элементом. Данные с сервера могут быть получены не в полном объеме. Если данных для заполнения не хватает, соответствующий блок в карточке скрывается. Например, если в объявлении не указано никаких удобств, нужно скрыть блок .popup__features. При отсутствии полей не должно возникать ошибок. Если в объекте с описанием объявления отсутствует поле offer, то метка объявления не должна отображаться на карте.

    5.2. При нажатии на метку похожего объявления, показывается карточка, содержащая подробную информацию об объявлении. Разметка карточки должна создаваться на основе шаблонного элемента .map__card, расположенного в элементе template. Данные в карточку вставляются по аналогии с данными, вставленными в шаблонную карточку в качестве примера.

    Сразу после перехода в активный режим, карточка не отображается, она показывается только после нажатия на одну из меток. При этом активной метке добавляется класс .map__pin--active. Нажатие на метку .map__pin--main не приводит к показу карточки.

    5.3. В каждый момент времени может быть открыта только одна карточка, то есть нажатие на метку другого похожего объявления должно закрывать текущую карточку, если она открыта и показывать карточку, соответствующую другому объявлению.

    5.4. Открытую карточку с подробной информацией можно закрыть или нажатием на иконку крестика в правом верхнем углу объявления или нажатием на клавишу Esc на клавиатуре.

    5.5. Объекты, расположенные неподалёку, можно фильтровать. Фильтрация производится по тем же параметрам, которые указываются для объявления:

    * тип жилья;

    * цена за ночь;

    * число комнат;

    * число гостей;

    * дополнительные удобства.

    Фильтрация производится при изменении значений соответствующих полей формы .map__filters.

    5.6. Как до изменения фильтров, так и при изменении фильтра, на карте должны показываться все подходящие варианты, но не более пяти меток, независимо от выбранного фильтра.

    5.7. Форма, с помощью которой производится фильтрация похожих объявлений на момент открытия страницы заблокирована и становится доступной только после окончания загрузки всех похожих объявлений.

    5.8. Отрисовка соответствующих, выставленных фильтрам элементов, должна происходить не чаще чем раз в полсекунды (устранение дребезга).

    5.9. При изменении фильтров, карточка, показывающая подробную информацию о похожем объявлении должна быть скрыта.

6. ### Доступность и активные элементы:

    6.1. Взаимодействие со всеми активными элементами на странице должно быть доступно не только с помощью курсора и кликов на них, но и с помощью клавиатуры: все активные элементы должны фокусироваться и реагировать на нажатие клавиши Enter так же, как и на клик.

7. ### Необязательная функциональность

    7.1. В форме подачи объявления показывается аватарка пользователя и фотографии объявления при изменении значений соответствующих полей.

[travis-image]: https://travis-ci.com/htmlacademy-javascript/794285-keksobooking-18.svg?branch=master
[travis-url]: https://travis-ci.com/htmlacademy-javascript/794285-keksobooking-18
