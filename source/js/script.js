document.body.onkeydown = function(event) {
  if (event.keyCode === 9) {  // TAB
    document.body.classList.add('tab-user');
    document.addEventListener('click', clickDocumentDetect);
  }
};

function clickDocumentDetect() {
  document.body.classList.remove('tab-user');
  document.removeEventListener('click', clickDocumentDetect);
}

var nav_toggle = document.querySelector('.main-nav__toggle');
var main_nav = document.querySelector('.main-nav');

main_nav.classList.remove('main-nav--nojs');

nav_toggle.addEventListener('click', function() {
  if (main_nav.classList.contains('main-nav--open')) {
    main_nav.classList.remove('main-nav--open');
    main_nav.classList.add('main-nav--close');
  }
  else {
    main_nav.classList.remove('main-nav--close');
    main_nav.classList.add('main-nav--open');
  }
});


/*******Карта в подвале*********/

var desktop_width = 1150;

if(document.getElementById('YMapsID')) {
  ymaps.ready(init);
  var myMap, myPlacemar;

  function init() {

    var width_scr = document.documentElement.clientWidth || document.body.clientWidth;

    if (width_scr >= desktop_width) {
        myMap = new ymaps.Map("YMapsID", {
        center: [59.938800, 30.323148],
        zoom: 16,
        controls: [] //убираем все кнопки управления
        });
      } else {
        myMap = new ymaps.Map("YMapsID", {
        center: [59.938800, 30.323148],
        zoom: 17,
        controls: [] //убираем все кнопки управления
        });
      }

    myMap.behaviors.disable('scrollZoom'); //отключение зума скролом колесика
    //myMap.behaviors.disable('drag');

    myMap.controls.add('zoomControl', {
      float: 'none'
    });
    myMap.controls.add('fullscreenControl', {
      float: 'right'
    });

    myMap.controls.add('typeSelector'); // Переключатель слоев карты – второй слева.
    myMap.controls.get('typeSelector').options.set('size', 'small');//принудительно выбран маленькой мконки

    myPlacemark = new ymaps.Placemark([59.938697, 30.323120], {
      hintContent: 'Mishka',
      balloonContent: 'Санкт-Петербург, ул. Большая Конюшенная, д. 19/8'
    }, {
      iconLayout: 'default#image', //изображение без доп текста
      iconImageHref: 'img/icon-map-pin.svg',
      iconImageSize: [67, 100],
      iconImageOffset: [-44, -100] //смещение картинки
    });

    myMap.geoObjects.add(myPlacemark);
  }
}



/*******Открытии и закрытие попапов*******/

var popup = document.querySelector('.modal');
var popupToogle = popup.querySelector('.modal__toogle');
var formOrder = document.querySelector('.modal__form-order');
var promoOrderBtn = document.querySelector('.promo-product__btn');
var catalogOrderBtn = document.querySelector('.product__buy-btn');

function showPopup() {
  popup.classList.remove('modal--close');
  popup.classList.add('modal--open');
  popupToogle.focus();

  var btnClose= popup.querySelector('.modal__close-btn');
  btnClose.addEventListener('click', closePopup);

  document.addEventListener('keydown', onDocumentEscPress);

  formOrder.addEventListener('submit', onFormOrderSubmit);
}

function closePopup() {
  popup.classList.remove('modal--open');
  popup.classList.add('modal--close');

  document.removeEventListener('keydown', onDocumentEscPress);
  formOrder.removeEventListener('submit', onFormOrderSubmit);
  var btnClose= popup.querySelector('.modal__close-btn');
  btnClose.removeEventListener('click', closePopup);
}

function onDocumentEscPress(evt) {
  if (evt.keyCode === 27) {
    closePopup();
  }
}

function onFormOrderSubmit(evt) {
  closePopup();
  evt.preventDefault();
}

if (promoOrderBtn) {
  promoOrderBtn.addEventListener('click', function(evt) {
    showPopup();
    evt.preventDefault();
  });
}

if (catalogOrderBtn) {
  document.addEventListener('click', function(evt) {
    if (evt.target.closest('.product__buy-btn')) {
      showPopup();
      evt.preventDefault();
    }
  });
}

//*****Переключение слайдера*****//

var sliderWrapper = document.querySelector('.reviews__slider');
var sliderList = document.querySelector('.slider__list');
var revPrev = document.querySelector('.slider__btn--prev');
var revNext = document.querySelector('.slider__btn--next');
var slideToogles = document.querySelector('.slider__toggles');

if (sliderList) {
  var slideCount = 0;
  var maxSlideCount = sliderList.children.length;

  revNext.addEventListener('click', setNextSlide);
  revPrev.addEventListener('click', setPrevSlide);

  slideToogles.addEventListener('click', slideCountControl);

  function slideCountControl() {
    switch(slideCount) {
      case maxSlideCount - 1:
        revNext.disabled = true;
        break;
      case 0:
        revPrev.disabled = true;
        break;
      default:
        revNext.disabled = false;
        revPrev.disabled = false;
    }
  }

  function setNextSlide() {
    console.log('++');
    if (slideCount < maxSlideCount - 1) {
      slideCount++;
      sliderList.style.transform = 'translateX(-' + slideCount * sliderWrapper.offsetWidth + 'px)';
    }

    /*
    if (slideCount === maxSlideCount - 1) {
    revNext.disabled = true;
    } else {
    revNext.disabled = false;
    }*/
  }

  function setPrevSlide() {
    console.log('--');
    if (slideCount > 0) {
      slideCount--;
      sliderList.style.transform = 'translateX(-' + slideCount * sliderWrapper.offsetWidth + 'px)';
    }

    /*
    if (slideCount === 0) {
    revPrev.disabled = true;
    } else {
    revPrev.disabled = false;
    }*/
  }

  $('.slider__list').swipe( {
    swipeLeft: function() {
      setNextSlide();
      slideCountControl();
    },
    swipeRight: function() {
      setPrevSlide();
      slideCountControl();
    },
    threshold: 0
  });
}
