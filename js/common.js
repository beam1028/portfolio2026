// 메뉴 상단 고정
$(window).on('scroll', function () {
  if ($(this).scrollTop() >= 130) {
    $('#header .menu_area').addClass('is_fixed');
  } else {
    $('#header .menu_area').removeClass('is_fixed');
  }
});

// 메뉴 클릭 시 스크롤 이동
$('a[href^="#"]').on('click', function (event) {
  const $target = $($(this).attr('href'));

  event.preventDefault();

  $('html, body').stop().animate({
    scrollTop: $target.offset().top - $('#header .menu_area').outerHeight()
  }, 800, 'easeInOutCubic');
});

// 포트폴리오 영상 초기화
function resetPortfolioVideos() {
  $('.project_media video').each(function () {
    this.pause();
    this.currentTime = 0;
  });
}

// 포트폴리오 영상 hover 재생
$('.md_swiper').on('mouseenter mouseleave', '.project_media', function (event) {
  const video = $(this).find('video').get(0);
  const isActive = $(this).closest('.swiper-slide-active').length;

  if (event.type === 'mouseenter' && isActive) {
    video.play().catch(() => { });
    return;
  }

  video.pause();
  video.currentTime = 0;
});

// 포트폴리오 Swiper
const portfolioSwiper = new Swiper('.md_swiper', {
  loop: true,
  pagination: {
    el: '.md-pagination',
    clickable: true,
  },
  on: {
    slideChangeTransitionStart: resetPortfolioVideos,
  },
});
