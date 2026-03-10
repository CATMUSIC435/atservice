new Swiper(".utilitySwiper", {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
    },
});

// Khởi tạo Carousel Mặt bằng (Nút điều hướng)
new Swiper(".floorSwiper", {
    slidesPerView: 1,
    loop: true,
    navigation: {
        nextEl: ".floor-button-next",
        prevEl: ".floor-button-prev",
    },
});