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

