function initializeStickyMenu() {
  const menu = document.querySelector('#header .menu_area');

  if (!menu) return;

  const placeholder = document.createElement('div');
  placeholder.className = 'menu_placeholder';
  menu.before(placeholder);

  let stickyStart = menu.getBoundingClientRect().top + window.scrollY;

  function updateStickyMenu() {
    const isSticky = window.scrollY >= stickyStart;

    menu.classList.toggle('is_sticky', isSticky);
    placeholder.style.height = isSticky ? `${menu.offsetHeight}px` : '0px';
  }

  window.addEventListener('scroll', updateStickyMenu, { passive: true });
  window.addEventListener('resize', () => {
    menu.classList.remove('is_sticky');
    placeholder.style.height = '0px';
    stickyStart = menu.getBoundingClientRect().top + window.scrollY;
    updateStickyMenu();
  });

  updateStickyMenu();
}

function pausePortfolioVideos(swiper) {
  swiper.el.querySelectorAll('video').forEach((video) => {
    video.pause();
  });
}

function playActivePortfolioVideo(swiper) {
  pausePortfolioVideos(swiper);

  const activeVideo = swiper.el.querySelector('.swiper-slide-active video');
  if (activeVideo) {
    activeVideo.currentTime = 0;
    activeVideo.play().catch(() => {
      // 자동 재생이 차단된 경우 사용자가 controls로 직접 재생할 수 있습니다.
    });
  }
}

initializeStickyMenu();

const portfolioSwiper = new Swiper('.md_swiper', {
  loop: true,
  pagination: {
    el: '.md-pagination',
    clickable: true,
  },
  on: {
    init: playActivePortfolioVideo,
    slideChangeTransitionStart: pausePortfolioVideos,
    slideChangeTransitionEnd: playActivePortfolioVideo,
  },
});
