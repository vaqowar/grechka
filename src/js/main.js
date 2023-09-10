document.addEventListener('DOMContentLoaded', function () {
  var apiURL = 'https://private-anon-f7dc74c6a3-grchhtml.apiary-mock.com';

  var carList = [];
  var carListTotal;

  var carSwiper;

  var carLikesArr = [];

  var body = document.querySelector('body');

  var wrapper = document.querySelector('.wrapper')

  var likeBtn = document.querySelector('.like__button');
  var likeCounterNum = document.querySelector('.like__counter-number');

  var modal = document.querySelector('.modal');
  var modalWindow = document.querySelector('.modal__window');
  var modalClose = document.querySelector('.modal__close');
  var modalTitle = document.querySelector('.modal__title');
  var modalSubtitle = document.querySelector('.modal__subtitle');
  var modalText = document.querySelector('.modal__text');

  function setStubEl(parent) {
    var stub = document.createElement('div');
    stub.classList.add('stub');
    parent.insertAdjacentElement('afterbegin', stub);

    var stubTitle = document.createElement('p');
    stubTitle.classList.add('stub__title');
    stubTitle.innerHTML = 'error';
    stub.appendChild(stubTitle);

    var stubImg = document.createElement('img');
    stubImg.classList.add('stub__img');
    stubImg.src = 'img/icons/machine_vector_01.svg';
    stubImg.alt = 'machine vector';
    stub.appendChild(stubImg);

    setTimeout(function() {stub.classList.add('active');}, 300)
  }

  function initSwiper(className, swiperParams) {
    return new Swiper('.' + className + '', swiperParams);
  }

  function requestAPI(type, url) {
    return new Promise(function (resolve, reject) {
      var request = new XMLHttpRequest();

      request.open(type, url);

      request.onreadystatechange = function () {
        if (this.readyState === 4) {

          if (this.status == 200) {
            resolve(request);
          } else {
            openModal();
            
            reject(request);

            console.error(request);
          }
        }
      };
      request.send();
    });
  }

  function getCarList(offset, limit) {
    return new Promise(function (resolve, reject) {
      requestAPI('GET', '' + apiURL + '/slides?offset=' + offset + '&limit='+limit+'')
        .then(function (response) {
          var result = JSON.parse(response.responseText);

          carListTotal = result.countAll;
          carList.push(...result.data);

          console.log('carListTotal: ', carListTotal);
          console.log('carList: ', carList);

          resolve(response);
        }).catch(function (error) {
          reject(error);
        });
    });
  }

  function openModal(title, subtitle, text) {
    modal.classList.add('active');
    body.style.overflow = 'hidden';

    if (!title && !subtitle && !text) {
      modalTitle.innerHTML = title || 'Ошибка';
      modalSubtitle.innerHTML = subtitle || 'Нет соединения с сервером!';
      modalText.innerHTML = text || 'Вероятно у вас не включен VPN и данные не подгружаются с сервера.';
    } else {
      modalTitle.innerHTML = title;
      modalSubtitle.innerHTML = subtitle;
      modalText.innerHTML = text;
    }

  }
  function closeModal() {
    modal.classList.remove('active');
    body.removeAttribute('style');
    
    setTimeout(function() {
      if (!modal.classList.contains('active')) {
        modalTitle.innerHTML = '';
        modalSubtitle.innerHTML = '';
        modalText.innerHTML = '';
      }
    }, 1000)
  }

  function addCarSlides(arr, num) {
    var swiperWrapperDiv = document.querySelector('.swiper-wrapper');

    arr.slice(num).forEach(function(element) {
      var swiperSlide = document.createElement('div');
      swiperSlide.classList.add('swiper-slide');
      swiperWrapperDiv.appendChild(swiperSlide);
  
      //img
      var swiperSlideImg = document.createElement('img');
      swiperSlideImg.classList.add('swiper-slide__img')
      swiperSlideImg.src = element.imgUrl;
      swiperSlideImg.alt = element.title;
      swiperSlide.appendChild(swiperSlideImg);

      swiperSlideImg.addEventListener('error', function() {
        setStubEl(swiperSlideImg.parentElement);
        this.remove(); 
      })
  
      //name
      var swiperSlideName = document.createElement('div');
      swiperSlideName.classList.add('swiper-slide__name');
      if (element.id === 0) {
        swiperSlideName.innerText = 'The Razorite';
        document.querySelector('.like__counter-number').innerText = element.likeCnt;
      } else if (element.id > 0 && element.id < 10) {
        swiperSlideName.innerText = '0' + element.id;
      } else {
        swiperSlideName.innerText = element.id;
      }
      swiperSlide.appendChild(swiperSlideName);
  
      //desc
      var swiperSlideDesc = document.createElement('div');
      swiperSlideDesc.classList.add('swiper-slide__desc');
      swiperSlideDesc.innerText = element.desc;
      swiperWrapperDiv.appendChild(swiperSlideDesc);
    })
  }

  function addCarSwiperEl() {
    //swiper
    var swiperDiv = document.createElement('div');
    swiperDiv.classList.add('swiper');
    wrapper.insertBefore(swiperDiv, document.querySelector('.logo'));

    //swiper-wrapper
    var swiperWrapperDiv = document.createElement('div');
    swiperWrapperDiv.classList.add('swiper-wrapper');
    swiperDiv.appendChild(swiperWrapperDiv);

    addCarSlides(carList, 0);

    //swiper buttons
    var swiperBtnImg = document.createElement('div');
    swiperBtnImg.classList.add('swiper-button-img');

    var swiperBtnImgHover = swiperBtnImg.cloneNode(true);
    swiperBtnImgHover.classList.add('swiper-button-img_hover');

    var swiperBtnPrev = document.createElement('div');
    swiperBtnPrev.classList.add('swiper-button-prev');
    swiperDiv.appendChild(swiperBtnPrev);
    swiperBtnPrev.appendChild(swiperBtnImg.cloneNode(true));
    swiperBtnPrev.appendChild(swiperBtnImgHover.cloneNode(true));

    var swiperBtnNext = document.createElement('div');
    swiperBtnNext.classList.add('swiper-button-next');
    swiperDiv.appendChild(swiperBtnNext);
    swiperBtnNext.appendChild(swiperBtnImg.cloneNode(true));
    swiperBtnNext.appendChild(swiperBtnImgHover.cloneNode(true));
  }

  function initCarSwiper() {
    carSwiper = initSwiper('swiper', {
      direction: 'horizontal',
      allowTouchMove: false, 
      speed: 1200,
      effect: 'creative',
      creativeEffect: {
        prev: { translate: ['-55%', 0, -1], },
        next: { translate: ['100%', 0, 0], },
      },
      keyboard: true,

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      on: {
        init: function (e) {
          if (localStorage.getItem('carLikes')) {
            carLikesArr = JSON.parse(localStorage.getItem('carLikes'));

            var firstCar = carLikesArr.find(function(item) { return item.id === e.activeIndex });

            if (firstCar) {
              likeCounterNum.innerText = firstCar.likeCnt;
              firstCar.hasLike && likeBtn.classList.add('active');
            }
          }
        },
        slideChange: function (e) {
          var currentCar = carLikesArr.find(function(item) {
            return item.id === e.activeIndex;
          });

          if (currentCar) {
            likeBtn.classList.add('active');
            likeCounterNum.innerText = currentCar.likeCnt;
          } else {
            likeBtn.classList.remove('active');
            likeCounterNum.innerText = carList[e.activeIndex].likeCnt;
          }

          if (e.isEnd && carList.length < carListTotal) {
            console.log('last slide');
            console.log('carList.length: ', carList.length);

            var limit = carList.length;

            getCarList(carList.length, 3)
              .then(function() {
                addCarSlides(carList, limit);
                carSwiper.update();
              }).catch(function() {
                openModal(
                  'Ошибка',
                  'Нет соединения с сервером!',
                  'Не удалось загрузить дополнительный слайд(ы), вероятно у вас не включен VPN.'
                )
              })
          }
        },
      },
    })
  }

  likeBtn.addEventListener('click', function () {
    if (!this.classList.contains('active')) {
      if (carSwiper) {
        var slideId = carSwiper.activeIndex

        requestAPI('POST', '' + apiURL + '/slides/' + slideId + '/like')
          .then(function (response) {
            var currentSlide = carList[slideId]; 

            currentSlide.hasLike = true;
            currentSlide.likeCnt++;
            likeCounterNum.innerText = currentSlide.likeCnt;

            likeBtn.classList.add('active');

            carLikesArr.push({ id: slideId, hasLike: true, likeCnt: currentSlide.likeCnt });
            var carLikesString = JSON.stringify(carLikesArr);
            localStorage.setItem('carLikes', carLikesString);

            console.log(response);

            openModal(
              JSON.parse(response.responseText).title,
              null,
              JSON.parse(response.responseText).desc
            );
          })
      } else {
        openModal();
      }
    }
  })

  modalClose.onclick = function() { closeModal(); };
  modal.addEventListener('click', (e) => {
    if (modal.classList.contains('active') && !modalWindow.contains(e.target)) { 
      closeModal(); 
    }
  });

  function loadPage() {
    getCarList(0, 3).
      then(function () {
        addCarSwiperEl();
        initCarSwiper();
      })
      .catch(function () {
        setStubEl(wrapper);
      })
      .finally(function () {
        setTimeout(function () {
          document.querySelector('.preloader')?.classList.remove('active');
        }, 300)
      })
  }

  loadPage();

});
