//100vh
function use100vh() {
  useEffect(() => {
    const handleResize = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
}


//호버시 탭
$('.hov_area .hov_item').on('mouseover', function () {
  const $hov = $(this);
  const idx = $hov.index();

  // 같은 cont 영역만 제어
  const $cont = $hov.closest('.cont');

  // 탭 hover 처리
  $hov
    .addClass('hover')
    .siblings().removeClass('hover');

  // 해당 cont 안의 내용만 변경
  $cont.find('.hov_cont')
    .eq(idx).addClass('show')
    .siblings().removeClass('show');
});


//포트몰리오 모달
$('.md_swiper').on('click', '.more', function () {
  const idx = $(this)
    .closest('.md_swiper_slide')
    .data('index');

  const $portfolio = $(this).closest('#portfolio');

  $portfolio.find('.pf_modal_cont').hide();
  $portfolio.find('.pf_modal_cont')
    .eq(idx)
    .fadeIn(300);

  swiper2.allowTouchMove = false;
});

// 모달 닫기
$('.pf_modal .close').on('click', function (e) {
  e.stopPropagation(); // 이벤트 버블링 방지

  $(this).closest('.pf_modal_cont').fadeOut('300');
});

//main swiper
var bullet = ['<i class="fa-solid fa-house"></i>', 'About', 'Skills', 'Portfolio', 'Contact'];
const header = document.querySelector('#header'); // header 요소 선택

const swiper = new Swiper('.main_swiper', {
  direction: 'horizontal',
  mousewheel: true,
  speed: 500,
  on: {
    init() {
      // wrapper slide_on
      const activeSlide = this.el.querySelector('.swiper-slide-active .wrapper');
      if (activeSlide) activeSlide.classList.add('slide_on');

      // 첫 슬라이드 체크
      toggleHeaderClass(this);
    },
    slideChangeTransitionStart() {
      // 모든 wrapper에서 slide_on 제거
      this.el.querySelectorAll('.wrapper').forEach(wrapper => {
        wrapper.classList.remove('slide_on');
      });
    },
    slideChangeTransitionEnd() {
      // active 슬라이드 안 wrapper에 slide_on 추가
      const activeWrapper = this.el.querySelector('.swiper-slide-active .wrapper');
      if (activeWrapper) activeWrapper.classList.add('slide_on');

      // 첫 슬라이드 체크
      toggleHeaderClass(this);
    },
  },
  pagination: {
    el: '#header .hd_wrapper ul.menu',
    clickable: true,
    renderBullet: function (index, className) {
      return '<li class="' + className + '"><span>' + (bullet[index]) + '</span></li>';
    }
  },
});

// activeIndex === 0이면 #header에 클래스 slide_0 추가, 아니면 제거
function toggleHeaderClass(swiper) {
  if (swiper.activeIndex === 0) {
    header.classList.add('slide_0');
  } else {
    header.classList.remove('slide_0');
  }
};

//포트폴리오 swiper
const swiper2 = new Swiper('.md_swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  slidesPerView: 1,
  spaceBetween: 15,
  nested: true,
  observer: true,
  observeParents: true,
  navigation: {
    prevEl: ".md-prev",
    nextEl: ".md-next",
  },
  pagination: {
    el: ".md-pagination",
    clickable: true,
  },
  breakpoints: {
    1025: { //1024px 타블렛 가로, 노트북
      slidesPerView: 2,
    },
    1920: { //
      slidesPerView: 3,
    },
  },
});