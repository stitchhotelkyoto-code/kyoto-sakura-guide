console.log("Kyoto Sakura Guide v2 structure loaded.");

const sakuraSlidesEl = document.getElementById("sakuraSlides");
const sakuraCards = document.querySelectorAll(".sakura-slide-card");
const sakuraPrev = document.querySelector(".sakura-arrow-left");
const sakuraNext = document.querySelector(".sakura-arrow-right");
const sakuraDotsEl = document.getElementById("sakuraDots");

let sakuraIndex = 0;
let sakuraInterval;

function buildSakuraDots() {
  if (!sakuraDotsEl) return;

  sakuraDotsEl.innerHTML = "";

  sakuraCards.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = "sakura-dot";
    if (index === 0) dot.classList.add("active");

    dot.addEventListener("click", () => {
      sakuraIndex = index;
      updateSakuraSlider();
      restartSakuraAuto();
    });

    sakuraDotsEl.appendChild(dot);
  });
}

function updateSakuraDots() {
  const dots = document.querySelectorAll(".sakura-dot");
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === sakuraIndex);
  });
}

function updateSakuraSlider() {
  if (!sakuraSlidesEl) return;
  sakuraSlidesEl.style.transform = `translateX(-${sakuraIndex * 100}%)`;
  updateSakuraDots();
}

function nextSakuraSlide() {
  if (sakuraCards.length === 0) return;
  sakuraIndex = (sakuraIndex + 1) % sakuraCards.length;
  updateSakuraSlider();
}

function prevSakuraSlide() {
  if (sakuraCards.length === 0) return;
  sakuraIndex = (sakuraIndex - 1 + sakuraCards.length) % sakuraCards.length;
  updateSakuraSlider();
}

function startSakuraAuto() {
  stopSakuraAuto();
  sakuraInterval = setInterval(nextSakuraSlide, 3500);
}

function stopSakuraAuto() {
  clearInterval(sakuraInterval);
}

function restartSakuraAuto() {
  startSakuraAuto();
}

if (sakuraPrev) {
  sakuraPrev.addEventListener("click", () => {
    prevSakuraSlide();
    restartSakuraAuto();
  });
}

if (sakuraNext) {
  sakuraNext.addEventListener("click", () => {
    nextSakuraSlide();
    restartSakuraAuto();
  });
}

if (sakuraSlidesEl && sakuraCards.length > 0) {
  buildSakuraDots();
  updateSakuraSlider();
  startSakuraAuto();
}
