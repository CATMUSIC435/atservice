
  window.addEventListener('load', () => {
    const group = document.getElementById("path-group");
    const originalPath = document.querySelector(".wave-path");
    const pathData = originalPath.getAttribute("d");

    // 1. Tạo thêm nhiều đường path (25 đường cho cảm giác dày)
    for (let i = 1; i < 25; i++) {
      const newPath = originalPath.cloneNode(true);
      newPath.setAttribute("transform", `translate(0, ${i * 30})`); // Khoảng cách đều nhau
      newPath.style.opacity = 1 - (i * 0.035); // Làm mờ dần các đường ở xa
      group.appendChild(newPath);
    }

    // 2. Lấy tất cả các path bao gồm cả path gốc
    const allPaths = document.querySelectorAll(".wave-path");

    // 3. Hiệu ứng Morphing: Co giãn bản thân đường cong
    // Chúng ta sẽ "bóp" đường cong nhẹ nhàng theo chiều dọc (scaleY)
    gsap.to(allPaths, {
      scaleY: 0.6, // Co lại còn 60% chiều cao
      duration: 3, // Di chuyển chậm
      ease: "sine.inOut",
      stagger: {
        each: 0.15, // Thời gian trễ giữa các đường
        repeat: -1, // Lặp lại vô tận
        yoyo: true // Đi ngược lại sau khi kết thúc
      }
    });

    // 4. Hiệu ứng trôi nhẹ sang ngang (x)
    gsap.fromTo(allPaths, { x: -30 }, {
      x: 30,
      duration: 5,
      ease: "power1.inOut",
      stagger: {
        each: 0.1,
        repeat: -1,
        yoyo: true
      }
    });

    // 5. Hiệu ứng nhấp nhô tổng thể của toàn bộ nhóm (Rotation nhẹ)
    gsap.to("#topo-svg", {
      rotation: 2,
      scale: 1.05,
      duration: 10,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    });
  });