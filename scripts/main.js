const menuItems = document.querySelectorAll(".menu-item");
const border = document.getElementById("menu-border");
const nav = document.querySelector("nav");

let hideTimeout;

// ===== TỐI ƯU BORDER =====

// chuẩn bị quickTo (siêu mượt)
const moveX = gsap.quickTo(border, "x", { duration: 0.35, ease: "power2.out" });
const moveY = gsap.quickTo(border, "y", { duration: 0.35, ease: "power2.out" });
const scaleW = gsap.quickTo(border, "scaleX", { duration: 0.35, ease: "power2.out" });
const scaleH = gsap.quickTo(border, "scaleY", { duration: 0.35, ease: "power2.out" });

gsap.set(border, {
  transformOrigin: "top left",
  scaleX: 0,
  scaleY: 0,
  willChange: "transform"
});

menuItems.forEach(item => {
  item.addEventListener("mouseenter", () => {

    const rect = item.getBoundingClientRect();
    const parentRect = item.parentElement.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    gsap.set(border, {
      width: width,
      height: height
    });

    gsap.to(border, { opacity: 1, duration: 0.15 });

    moveX(rect.left - parentRect.left);
    moveY(rect.top - parentRect.top);
    scaleW(1);
    scaleH(1);

  });
});

// Ẩn border khi rời nav
nav.addEventListener("mouseleave", () => {
  gsap.to(border, {
    opacity: 0,
    duration: 0.25
  });
});


// ===== DROPDOWN SIÊU MƯỢT =====

const dropdownItem = document.querySelector(".has-dropdown");
const dropdown = dropdownItem.querySelector(".dropdown");

// chuẩn bị timeline (đỡ giật)
const dropdownTL = gsap.timeline({ paused: true });

dropdownTL.to(dropdown, {
  opacity: 1,
  y: 0,
  duration: 0.3,
  pointerEvents: "auto",
  ease: "power2.out"
});

dropdownItem.addEventListener("mouseenter", () => {
  clearTimeout(hideTimeout);
  dropdownTL.play();
});

dropdownItem.addEventListener("mouseleave", () => {
  hideTimeout = setTimeout(() => {
    dropdownTL.reverse();
  }, 120);
});


const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const mobileLinks = document.querySelectorAll(".mobile-link");
const spans = menuToggle.querySelectorAll("span");

let isMenuOpen = false;

// Timeline cho Mobile Menu
const mobileTL = gsap.timeline({ paused: true });

mobileTL.to(mobileMenu, {
  x: 0,
  duration: 0.6,
  ease: "expo.inOut"
})
  .to(mobileLinks, {
    opacity: 1,
    y: -20,
    duration: 0.4,
    stagger: 0.1, // Các mục hiện ra lần lượt
    ease: "power2.out"
  }, "-=0.3");

menuToggle.addEventListener("click", () => {
  if (!isMenuOpen) {
    mobileTL.play();
    // Hiệu ứng biến Hamburger thành dấu X
    gsap.to(spans[0], { rotate: 45, y: 8, duration: 0.3 });
    gsap.to(spans[1], { opacity: 0, x: -10, duration: 0.3 });
    gsap.to(spans[2], { rotate: -45, y: -8, duration: 0.3 });
  } else {
    mobileTL.reverse();
    // Quay lại Hamburger
    gsap.to(spans[0], { rotate: 0, y: 0, duration: 0.3 });
    gsap.to(spans[1], { opacity: 1, x: 0, duration: 0.3 });
    gsap.to(spans[2], { rotate: 0, y: 0, duration: 0.3 });
  }
  isMenuOpen = !isMenuOpen;
});

new Swiper(".heroSwiper", {
  loop: true,
  speed: 1000,
  effect: "fade",
  fadeEffect: { crossFade: true },

  navigation: {
    nextEl: ".hero-next",
    prevEl: ".hero-prev",
  },

  pagination: {
    el: ".hero-pagination",
    type: "fraction",
    formatFractionCurrent: function (number) {
      return number.toString().padStart(2, '0');
    },
    formatFractionTotal: function (number) {
      return number.toString().padStart(2, '0');
    }
  },

  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  }
});


const mainTitle = document.getElementById('active-title');
const mainBg = document.getElementById('dynamic-bg');

new Swiper(".nutritionSwiper", {
  slidesPerView: 4.5,
  spaceBetween: 30,
  centeredSlides: true, // Quan trọng: Để slide active nằm giữa hoặc vị trí dễ kiểm soát
  loop: true,

  pagination: {
    el: ".swiper-pagination-custom",
    type: 'bullets',
    clickable: true,
  },

  navigation: {
    nextEl: ".swiper-button-next-custom",
    prevEl: ".swiper-button-prev-custom",
  },

  on: {
    slideChange: function () {
      // Lấy slide đang active
      const activeSlide = this.slides[this.activeIndex];

      // Lấy dữ liệu từ data attributes
      const newTitle = activeSlide.getAttribute('data-title');
      const newBg = activeSlide.getAttribute('data-bg');

      // Hiệu ứng đổi Text (mờ dần rồi hiện ra)
      mainTitle.style.opacity = '0';
      mainTitle.style.transform = 'translateY(10px)';

      setTimeout(() => {
        if (newTitle) mainTitle.innerText = newTitle;
        mainTitle.style.opacity = '1';
        mainTitle.style.transform = 'translateY(0)';
      }, 300);

      // Đổi Background
      if (newBg) {
        mainBg.src = newBg;
      }
    }
  },

  breakpoints: {
    0: { slidesPerView: 1.2, centeredSlides: true },
    640: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
    1280: {
      slidesPerView: 4.5, centeredSlides: true,
  slidesOffsetBefore: 300,
      spaceBetween: 60
    } // Tùy chỉnh theo UI
  }
});

new Swiper(".tinderSwiper", {
  effect: "cards", // Kích hoạt hiệu ứng xếp chồng card
  grabCursor: true, // Hiển thị con trỏ bàn tay khi di chuyển
  perSlideOffset: 8, // Khoảng cách giữa các card xếp chồng
  perSlideRotate: 2, // Độ xoay của các card phía dưới
  rotate: true, // Cho phép xoay card khi vuốt
  slideShadows: true, // Hiển thị bóng cho các card phía dưới
  loop: true, // Lặp lại slide
});


new Swiper("#partner-slider", {
  // Cấu hình hàng (Grid)
  grid: {
    rows: 2,
    fill: 'row',
  },
  slidesPerView: 2, // Mobile: 2 cột
  spaceBetween: 16, // Khoảng cách giữa các ô

  // Tự động chạy
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },

  // Phân trang
  pagination: {
    el: "#partner-pagination",
    clickable: true,
    dynamicBullets: true, // Hiệu ứng dấu chấm thu nhỏ dần (rất hiện đại)
  },

  // Điểm dừng Responsive
  breakpoints: {
    640: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 24,
    },
  },

  // Cải thiện hiệu năng
  observer: true,
  observeParents: true,
});
