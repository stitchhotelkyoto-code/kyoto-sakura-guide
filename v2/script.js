<script>
document.addEventListener("DOMContentLoaded", () => {
  console.log("Kyoto Sakura Guide clean script loaded.");

  /* =========================
     FOOD TOGGLE
  ========================= */
 const foodToggleButtons = document.querySelectorAll(".food-toggle-btn");
const foodPanels = document.querySelectorAll(".food-slide-panel");

  function closeAllFoodPanels() {
    foodPanels.forEach((panel) => panel.classList.remove("open"));
    foodToggleButtons.forEach((btn) => {
      btn.classList.remove("is-open");
      btn.textContent = "+";
    });
  }

  foodToggleButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();

      const targetId = button.dataset.target;
      const targetPanel = document.getElementById(targetId);
      if (!targetPanel) return;

      const isOpen = targetPanel.classList.contains("open");

      closeAllFoodPanels();

      if (!isOpen) {
        targetPanel.classList.add("open");
        button.classList.add("is-open");
        button.textContent = "−";
      }
    });
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".food-area-item")) {
      closeAllFoodPanels();
    }
  });

  /* =========================
     SAKURA SLIDER
  ========================= */
  const sakuraSlidesEl = document.getElementById("sakuraSlides");
  const sakuraCards = document.querySelectorAll(".sakura-slide-card");
  const sakuraPrev = document.querySelector(".sakura-arrow-left");
  const sakuraNext = document.querySelector(".sakura-arrow-right");
  const sakuraDotsEl = document.getElementById("sakuraDots");

  let sakuraIndex = 0;
  let sakuraAuto = null;

  function buildSakuraDots() {
    if (!sakuraDotsEl || !sakuraCards.length) return;

    sakuraDotsEl.innerHTML = "";

    sakuraCards.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
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

  function updateSakuraSlider() {
    if (!sakuraSlidesEl || !sakuraCards.length) return;

    sakuraSlidesEl.style.transform = `translateX(-${sakuraIndex * 100}%)`;

    if (sakuraDotsEl) {
      const dots = sakuraDotsEl.querySelectorAll(".sakura-dot");
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === sakuraIndex);
      });
    }
  }

  function nextSakuraSlide() {
    if (!sakuraCards.length) return;
    sakuraIndex = (sakuraIndex + 1) % sakuraCards.length;
    updateSakuraSlider();
  }

  function prevSakuraSlide() {
    if (!sakuraCards.length) return;
    sakuraIndex = (sakuraIndex - 1 + sakuraCards.length) % sakuraCards.length;
    updateSakuraSlider();
  }

  function startSakuraAuto() {
    if (!sakuraCards.length) return;
    clearInterval(sakuraAuto);
    sakuraAuto = setInterval(() => {
      nextSakuraSlide();
    }, 5000);
  }

  function restartSakuraAuto() {
    clearInterval(sakuraAuto);
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

  /* =========================
     EVENTS SLIDER
  ========================= */
  const eventsSlider = document.getElementById("eventsSlider");
  const prevBtn = document.querySelector(".events-nav.prev");
  const nextBtn = document.querySelector(".events-nav.next");
  const eventCards = document.querySelectorAll(".event-card");
  const eventsCurrent = document.getElementById("eventsCurrent");
  const eventsTotal = document.getElementById("eventsTotal");

  if (eventsTotal) {
    eventsTotal.textContent = eventCards.length;
  }

  function getEventGap() {
    return window.innerWidth <= 768 ? 14 : 20;
  }

  function getScrollAmount() {
    const card = eventCards[0];
    if (!card) return 300;
    return card.offsetWidth + getEventGap();
  }

  function updateEventCounter() {
    if (!eventsSlider || !eventCards.length) return;

    const cardWidth = getScrollAmount();
    const index = Math.round(eventsSlider.scrollLeft / cardWidth) + 1;
    const safeIndex = Math.max(1, Math.min(index, eventCards.length));

    if (eventsCurrent) {
      eventsCurrent.textContent = safeIndex;
    }
  }

  if (prevBtn && eventsSlider) {
    prevBtn.addEventListener("click", () => {
      eventsSlider.scrollBy({
        left: -getScrollAmount(),
        behavior: "smooth"
      });
    });
  }

  if (nextBtn && eventsSlider) {
    nextBtn.addEventListener("click", () => {
      eventsSlider.scrollBy({
        left: getScrollAmount(),
        behavior: "smooth"
      });
    });
  }

  if (eventsSlider) {
    eventsSlider.addEventListener("scroll", updateEventCounter);
    window.addEventListener("load", updateEventCounter);
    window.addEventListener("resize", updateEventCounter);
    updateEventCounter();
  }

  /* =========================
     AI GUIDE
  ========================= */
  const aiGuideStatus = document.getElementById("aiGuideStatus");
  const spotsList = document.getElementById("spotsList");
  const foodList = document.getElementById("foodList");
  const locateBtn = document.getElementById("locateBtn");

  const defaultLocation = {
    lat: 35.0037,
    lng: 135.7680,
    name: "Central Kyoto"
  };

  const nearbySpots = [
    { name: "Kiyomizudera", area: "Higashiyama", lat: 34.9949, lng: 135.7850 },
    { name: "Yasaka Shrine", area: "Gion", lat: 35.0037, lng: 135.7788 },
    { name: "Gion Shirakawa", area: "Gion", lat: 35.0063, lng: 135.7768 },
    { name: "Nijo Castle", area: "Nakagyo", lat: 35.0142, lng: 135.7481 },
    { name: "Heian Shrine", area: "Okazaki", lat: 35.0159, lng: 135.7823 },
    { name: "Arashiyama Bamboo Grove", area: "Arashiyama", lat: 35.0170, lng: 135.6713 }
  ];

  const nearbyFood = [
    { name: "モーリヤ祇園", area: "Teppanyaki / Gion", lat: 35.0039, lng: 135.7769 },
    { name: "祇園刀", area: "Yakitori / Gion", lat: 35.0035, lng: 135.7778 },
    { name: "寿司よし乃", area: "Sushi / Kyoto", lat: 35.0094, lng: 135.7635 },
    { name: "うしのほね", area: "Izakaya / Kyoto", lat: 35.0082, lng: 135.7701 },
    { name: "CHAO CHAO", area: "Chinese / Kyoto", lat: 35.0055, lng: 135.7648 },
    { name: "Veg Out", area: "Vegan / Kyoto", lat: 34.9986, lng: 135.7720 }
  ];

  function toRad(value) {
    return (value * Math.PI) / 180;
  }

  function getDistanceKm(lat1, lng1, lat2, lng2) {
    const earthRadius = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadius * c;
  }

  function getSortedPlaces(userLocation, places) {
    return [...places]
      .map((place) => {
        const distance = getDistanceKm(
          userLocation.lat,
          userLocation.lng,
          place.lat,
          place.lng
        );

        return {
          ...place,
          distance
        };
      })
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 3);
  }

  function createGoogleMapsSearchUrl(name) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + " Kyoto")}`;
  }

  function createGoogleMapsDirectionUrl(lat, lng) {
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=walking`;
  }

  function renderCards(targetEl, items) {
    if (!targetEl) return;

    targetEl.innerHTML = items
      .map((item) => {
        return `
          <article class="ai-guide__card">
            <div class="ai-guide__card-top">
              <h4 class="ai-guide__card-title">${item.name}</h4>
              <span class="ai-guide__badge">${item.distance.toFixed(1)} km</span>
            </div>
            <p class="ai-guide__meta">${item.area}</p>
            <div class="ai-guide__buttons">
              <a href="${createGoogleMapsDirectionUrl(item.lat, item.lng)}" target="_blank" rel="noopener noreferrer" class="ai-guide__link ai-guide__link--primary">Walk on Maps</a>
              <a href="${createGoogleMapsSearchUrl(item.name)}" target="_blank" rel="noopener noreferrer" class="ai-guide__link ai-guide__link--secondary">View Place</a>
            </div>
          </article>
        `;
      })
      .join("");
  }

  function updateAiGuide(locationData, labelText) {
    const sortedSpots = getSortedPlaces(locationData, nearbySpots);
    const sortedFood = getSortedPlaces(locationData, nearbyFood);

    renderCards(spotsList, sortedSpots);
    renderCards(foodList, sortedFood);

    if (aiGuideStatus) {
      aiGuideStatus.textContent = labelText;
    }
  }

  if (spotsList && foodList) {
    updateAiGuide(
      defaultLocation,
      "Default recommendations are shown based on central Kyoto."
    );
  }

  if (locateBtn) {
    locateBtn.addEventListener("click", () => {
      if (!navigator.geolocation) {
        if (aiGuideStatus) {
          aiGuideStatus.textContent =
            "Geolocation is not supported on this browser.";
        }
        return;
      }

      if (aiGuideStatus) {
        aiGuideStatus.textContent = "Finding your location...";
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          updateAiGuide(
            userLocation,
            "Nearby recommendations are now based on your current location."
          );
        },
        () => {
          updateAiGuide(
            defaultLocation,
            "Location access was denied. Default Kyoto recommendations are shown."
          );
        }
      );
    });
  }

  /* =========================
     LANGUAGE SWITCH
  ========================= */
  const translations = {
    ko: {
      brand: "Kyoto Sakura Guide",
      nav_sakura: "Sakura",
      nav_courses: "Courses",
      nav_food: "Food",
      nav_events: "Events",
      nav_ai: "AI Guide",
      nav_hotels: "Hotels",

      quick_sakura: "Sakura Spots",
      quick_courses: "Travel Courses",
      quick_food: "Food Guide",
      quick_events: "Events",
      quick_ai: "AI Guide",
      quick_hotels: "Hotels",

      ai_title: "Smart Guide Near You",
      hotels_title: "Our Hotels",
      hotels_desc: "Explore four Kyoto stays with direct access to each official website and Instagram page.",
      home_btn: "Home"
    },

    en: {
      brand: "Kyoto Sakura Guide",
      nav_sakura: "Sakura",
      nav_courses: "Courses",
      nav_food: "Food",
      nav_events: "Events",
      nav_ai: "AI Guide",
      nav_hotels: "Hotels",

      quick_sakura: "Sakura Spots",
      quick_courses: "Travel Courses",
      quick_food: "Food Guide",
      quick_events: "Events",
      quick_ai: "AI Guide",
      quick_hotels: "Hotels",

      ai_title: "Smart Guide Near You",
      hotels_title: "Our Hotels",
      hotels_desc: "Explore four Kyoto stays with direct access to each official website and Instagram page.",
      home_btn: "Home"
    },

    ja: {
      brand: "京都さくらガイド",
      nav_sakura: "桜",
      nav_courses: "コース",
      nav_food: "グルメ",
      nav_events: "イベント",
      nav_ai: "AIガイド",
      nav_hotels: "ホテル",

      quick_sakura: "桜スポット",
      quick_courses: "おすすめコース",
      quick_food: "グルメガイド",
      quick_events: "イベント",
      quick_ai: "AIガイド",
      quick_hotels: "ホテル",

      ai_title: "近くのスマートガイド",
      hotels_title: "ホテル紹介",
      hotels_desc: "公式サイトとInstagramへ直接アクセスできる京都の4つの滞在先をご紹介します。",
      home_btn: "ホーム"
    }
  };

  const langButtons = document.querySelectorAll(".lang-btn");
  const translatableEls = document.querySelectorAll("[data-i18n]");

  function setLanguage(lang) {
    const dict = translations[lang];
    if (!dict) return;

    translatableEls.forEach((el) => {
      const key = el.dataset.i18n;
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    langButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });

    document.documentElement.lang = lang;
    localStorage.setItem("siteLanguage", lang);
  }

  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      setLanguage(btn.dataset.lang);
    });
  });

  const savedLanguage = localStorage.getItem("siteLanguage") || "ko";
  setLanguage(savedLanguage);

  /* =========================
     SMOOTH SCROLL
  ========================= */
  const scrollLinks = document.querySelectorAll('a[href^="#"]');

  scrollLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });
});
</script>
