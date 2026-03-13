console.log("Kyoto Sakura Guide v2 structure loaded.");

const sakuraTrack = document.querySelector(".sakura-track");
const sakuraSlides = document.querySelectorAll(".sakura-slide");
const prevBtn = document.querySelector(".sakura-nav.prev");
const nextBtn = document.querySelector(".sakura-nav.next");

let currentIndex = 0;
let autoSlide;

function getVisibleCount() {
  if (window.innerWidth <= 768) return 1;
  if (window.innerWidth <= 1100) return 2;
  return 3;
}

function updateSakuraSlider() {
  if (!sakuraTrack || sakuraSlides.length === 0) return;

  const slideStyle = window.getComputedStyle(sakuraSlides[0]);
  const slideWidth = sakuraSlides[0].getBoundingClientRect().width;
  const gap = parseFloat(window.getComputedStyle(sakuraTrack).gap) || 24;
  const moveX = (slideWidth + gap) * currentIndex;

  sakuraTrack.style.transform = `translateX(-${moveX}px)`;
}

function nextSlide() {
  const visibleCount = getVisibleCount();
  const maxIndex = sakuraSlides.length - visibleCount;

  if (currentIndex >= maxIndex) {
    currentIndex = 0;
  } else {
    currentIndex += 1;
  }

  updateSakuraSlider();
}

function prevSlide() {
  const visibleCount = getVisibleCount();
  const maxIndex = sakuraSlides.length - visibleCount;

  if (currentIndex <= 0) {
    currentIndex = maxIndex;
  } else {
    currentIndex -= 1;
  }

  updateSakuraSlider();
}

function startAutoSlide() {
  stopAutoSlide();
  autoSlide = setInterval(nextSlide, 3200);
}

function stopAutoSlide() {
  clearInterval(autoSlide);
}

if (nextBtn && prevBtn) {
  nextBtn.addEventListener("click", () => {
    nextSlide();
    startAutoSlide();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    startAutoSlide();
  });
}

window.addEventListener("resize", () => {
  const visibleCount = getVisibleCount();
  const maxIndex = Math.max(0, sakuraSlides.length - visibleCount);

  if (currentIndex > maxIndex) {
    currentIndex = maxIndex;
  }

  updateSakuraSlider();
});

updateSakuraSlider();
startAutoSlide();
