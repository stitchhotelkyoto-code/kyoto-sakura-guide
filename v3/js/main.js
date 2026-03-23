document.addEventListener("DOMContentLoaded", () => {
  const savedLang = normalizeLang(localStorage.getItem("siteLanguage") || "jp");
  localStorage.setItem("siteLanguage", savedLang);

  applyLanguage(savedLang);

  const hotelPage = document.body.dataset.hotelPage;
  const allPage = document.body.dataset.allPage;

  if (hotelPage) renderHotelPage(hotelPage, savedLang);
  if (allPage) renderAllPage(allPage, savedLang);

  setupLanguageSwitcher();
  setupCardSlider();
  setupCourseFlipReset();
  setupAllPageInteractions();
});

function normalizeLang(lang) {
  if (lang === "ko") return "kr";
  if (lang === "ja") return "jp";
  if (lang === "jp" || lang === "kr" || lang === "en") return lang;
  return "jp";
}

function setupLanguageSwitcher() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-lang]");
    if (!btn) return;

    const lang = normalizeLang(btn.dataset.lang);
    localStorage.setItem("siteLanguage", lang);

    applyLanguage(lang);

    const hotelPage = document.body.dataset.hotelPage;
    const allPage = document.body.dataset.allPage;

    if (hotelPage) renderHotelPage(hotelPage, lang);
    if (allPage) renderAllPage(allPage, lang);
  });
}

function applyLanguage(lang) {
  const safeLang = normalizeLang(lang);
  document.documentElement.lang = safeLang;

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("is-active", normalizeLang(btn.dataset.lang) === safeLang);
  });
}

function renderHotelPage(hotelKey, lang = "jp") {
  const safeLang = normalizeLang(lang);
  const data = window.HOTEL_DATA?.[hotelKey];
  if (!data) return;

  const labelEl = document.querySelector("[data-hotel-label]");
  const nameEl = document.querySelector("[data-hotel-name]");
  const taglineEl = document.querySelector("[data-hotel-tagline]");
  const descEl = document.querySelector("[data-hotel-description]");
  const introTitleEl = document.querySelector("[data-intro-title]");
  const introTextEl = document.querySelector("[data-intro-text]");
  const cardsEl = document.querySelector("[data-cards]");
  const courseEl = document.querySelector("[data-course]");
  const foodEl = document.querySelector("[data-food]");
  const eventsEl = document.querySelector("[data-events]");

  if (labelEl) labelEl.textContent = data.label?.[safeLang] || "";
  if (nameEl) nameEl.textContent = data.name?.[safeLang] || "";
  if (taglineEl) taglineEl.textContent = data.tagline?.[safeLang] || "";
  if (descEl) descEl.textContent = data.description?.[safeLang] || "";
  if (introTitleEl) introTitleEl.textContent = data.introTitle?.[safeLang] || "";
  if (introTextEl) introTextEl.textContent = data.introText?.[safeLang] || "";

  renderCards(cardsEl, data.cards || [], safeLang);
  renderCourseList(courseEl, data.courses || [], safeLang);
  renderFoodList(foodEl, data.foods || []);
  renderEventList(eventsEl, data.events || []);

  resetCourseFlip();
}

function renderCards(container, cards, lang) {
  if (!container) return;

  container.innerHTML = `
    <div class="card-slider-track">
      ${cards.map(card => `
        <article class="hotel-card">
          <div class="hotel-card-image-wrap">
            <img src="${card.image || ""}" alt="${card.title?.[lang] || ""}" class="hotel-card-image">
          </div>
          <div class="hotel-card-body">
            <h3>${card.title?.[lang] || ""}</h3>
            <p>${card.text?.[lang] || ""}</p>
          </div>
        </article>
      `).join("")}
    </div>
    <div class="slider-controls">
      <button class="slider-btn prev" type="button">←</button>
      <button class="slider-btn next" type="button">→</button>
    </div>
  `;
}

function renderCourseList(container, items, lang) {
  if (!container) return;

  container.innerHTML = `
    <div class="info-panel-head">
      <span class="info-panel-no">01</span>
      <h3>Recommended Course</h3>
    </div>
    <div class="info-panel-list">
      ${items.map((item, index) => `
        <article class="info-course-item">
          <div class="info-item-no">${item.no}</div>
          <h4>${item.title?.[lang] || ""}</h4>
          <p>${item.sub?.[lang] || ""}</p>
          <button class="info-link-btn" type="button" data-course-index="${index}">View</button>
        </article>
      `).join("")}
    </div>
  `;

  container.querySelectorAll("[data-course-index]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const index = Number(btn.dataset.courseIndex);
      const course = items[index];
      if (!course) return;
      showCourseFlip(course, lang);
    });
  });
}

function renderFoodList(container, items) {
  if (!container) return;

  container.innerHTML = `
    <div class="info-panel-head">
      <span class="info-panel-no">02</span>
      <h3>Food Picks</h3>
    </div>
    <div class="info-panel-list">
      ${items.map(item => `
        <article class="info-food-item">
          <div class="info-item-no">${item.no}</div>
          <h4>${item.name}</h4>
          <p>${item.type}</p>
          <a class="info-link-btn" href="${item.direction || "#"}" target="_blank" rel="noopener noreferrer">Directions</a>
        </article>
      `).join("")}
    </div>
  `;
}

function renderEventList(container, items) {
  if (!container) return;

  container.innerHTML = `
    <div class="info-panel-head">
      <span class="info-panel-no">03</span>
      <h3>Nearby Events</h3>
    </div>
    <div class="info-panel-list">
      ${items.map(item => `
        <article class="info-event-item">
          <div class="info-item-no">${item.no}</div>
          <h4>${item.name}</h4>
          <p>${item.sub}</p>
          <a class="info-link-btn" href="${item.link || "#"}" target="_blank" rel="noopener noreferrer">Official</a>
        </article>
      `).join("")}
    </div>
  `;
}

function showCourseFlip(course, lang) {
  const box = document.getElementById("hotelCourseFlipBox");
  if (!box) return;

  const titleEl = box.querySelector("[data-course-back-title]");
  const routeEl = box.querySelector("[data-course-back-route]");
  const descEl = box.querySelector("[data-course-back-desc]");
  const directionEl = box.querySelector("[data-course-back-direction]");

  if (titleEl) titleEl.textContent = course.title?.[lang] || "";
  if (routeEl) routeEl.textContent = course.route?.[lang] || "";
  if (descEl) descEl.textContent = course.detail?.[lang] || "";

  if (directionEl) {
    directionEl.href = course.direction || "#";
    directionEl.textContent = "Directions";
  }

  box.classList.add("is-flipped");
}

function resetCourseFlip() {
  const box = document.getElementById("hotelCourseFlipBox");
  if (!box) return;
  box.classList.remove("is-flipped");
}

function setupCourseFlipReset() {
  document.addEventListener("click", (e) => {
    const box = document.getElementById("hotelCourseFlipBox");
    if (!box) return;

    const closeBtn = e.target.closest("[data-course-flip-close]");
    if (closeBtn) {
      box.classList.remove("is-flipped");
      return;
    }
  });
}

function setupCardSlider() {
  document.addEventListener("click", (e) => {
    const prevBtn = e.target.closest(".slider-btn.prev");
    const nextBtn = e.target.closest(".slider-btn.next");
    if (!prevBtn && !nextBtn) return;

    const controls = e.target.closest(".slider-controls");
    const track = controls?.previousElementSibling;
    if (!track || !track.classList.contains("card-slider-track")) return;

    const moveAmount = 320;
    track.scrollBy({
      left: prevBtn ? -moveAmount : moveAmount,
      behavior: "smooth"
    });
  });
}

function renderAllPage(type, lang = "jp") {
  const safeLang = normalizeLang(lang);

  const titleEl = document.querySelector("[data-all-title]");
  const descEl = document.querySelector("[data-all-desc]");
  const contentEl = document.querySelector("[data-all-content]");

  if (!titleEl || !descEl || !contentEl) return;

  let source = null;
  if (type === "events") source = window.HOTEL_DATA.allEvents;
  if (type === "food") source = window.HOTEL_DATA.allFood;
  if (type === "sakura") source = window.HOTEL_DATA.allSakura;
  if (!source) return;

  titleEl.textContent = source.title?.[safeLang] || "";
  descEl.textContent = source.description?.[safeLang] || "";

  if (type === "events") {
    contentEl.innerHTML = `
      <section class="all-events-grid">
        ${source.items.map(item => `
          <article class="event-guide-card">
            <div class="event-guide-head">
              <span class="event-guide-no">${item.no}</span>
              <span class="event-guide-place">${item.location?.[safeLang] || ""}</span>
            </div>
            <h3>${item.title?.[safeLang] || ""}</h3>
            <p class="event-guide-date">${item.date?.[safeLang] || ""}</p>
            <p class="event-guide-text">${item.text?.[safeLang] || ""}</p>
            <div class="event-guide-links">
              <a href="${item.site || "#"}" target="_blank" rel="noopener noreferrer">Official Website</a>
              <a href="${item.direction || "#"}" target="_blank" rel="noopener noreferrer">Directions</a>
            </div>
          </article>
        `).join("")}
      </section>
    `;
    return;
  }

  if (type === "food") {
    const firstArea = source.items?.[0];

    contentEl.innerHTML = `
      <section class="food-area-shell">
        <div class="food-area-grid">
          ${source.items.map((item, index) => `
            <article class="food-area-card ${index === 0 ? "is-active" : ""}" data-food-area-trigger="${item.key}">
              <div class="food-area-card-no">${item.no}</div>
              <div class="food-area-card-copy">
                <span>${item.eyebrow?.[safeLang] || ""}</span>
                <h3>${item.title?.[safeLang] || ""}</h3>
                <p>${item.summary?.[safeLang] || ""}</p>
              </div>
            </article>
          `).join("")}
        </div>

        <div class="food-area-detail is-open" data-food-area-panel>
          ${renderFoodAreaDetail(firstArea, safeLang)}
        </div>
      </section>
    `;
    return;
  }

  if (type === "sakura") {
    contentEl.innerHTML = `
      <section class="sakura-guide-shell">
        <div class="sakura-slider-frame">
          <div class="sakura-slider-track" data-sakura-track>
            ${source.items.map(item => `
              <article class="sakura-guide-card">
                <div class="sakura-guide-tag">${item.tag?.[safeLang] || ""}</div>
                <h3>${item.title?.[safeLang] || ""}</h3>
                <p class="sakura-guide-text">${item.text?.[safeLang] || ""}</p>
                <p class="sakura-guide-best">${item.bestTime?.[safeLang] || ""}</p>
                <div class="sakura-guide-links">
                  <a href="${item.direction || "#"}" target="_blank" rel="noopener noreferrer">Directions</a>
                </div>
              </article>
            `).join("")}
          </div>
          <div class="sakura-slider-controls">
            <button class="sakura-slider-btn prev" type="button" data-sakura-prev>←</button>
            <button class="sakura-slider-btn next" type="button" data-sakura-next>→</button>
          </div>
        </div>
      </section>
    `;
  }
}

function renderFoodAreaDetail(area, lang) {
  if (!area) return "";

  return `
    <div class="food-area-detail-inner">
      <div class="food-area-detail-head">
        <div>
          <span class="food-area-detail-eyebrow">${area.eyebrow?.[lang] || ""}</span>
          <h3>${area.title?.[lang] || ""}</h3>
          <p>${area.summary?.[lang] || ""}</p>
        </div>
        <button type="button" class="food-area-close" data-food-area-close>×</button>
      </div>

      <div class="food-area-spot-list">
        ${area.spots.map(spot => `
          <article class="food-spot-item">
            <div class="food-spot-top">
              <div>
                <h4>${spot.name?.[lang] || ""}</h4>
                <p class="food-spot-type">${spot.type?.[lang] || ""}</p>
              </div>
              <a href="${spot.direction || "#"}" target="_blank" rel="noopener noreferrer">Directions</a>
            </div>
            <p class="food-spot-desc">${spot.desc?.[lang] || ""}</p>
            <p class="food-spot-meta">
              <strong>Hours</strong> ${spot.hours?.[lang] || ""}<br>
              <strong>Menu</strong> ${spot.menu?.[lang] || ""}
            </p>
          </article>
        `).join("")}
      </div>
    </div>
  `;
}

function setupAllPageInteractions() {
  document.addEventListener("click", (e) => {
    const foodTrigger = e.target.closest("[data-food-area-trigger]");
    if (foodTrigger) {
      const key = foodTrigger.dataset.foodAreaTrigger;
      const lang = normalizeLang(localStorage.getItem("siteLanguage") || "jp");
      const source = window.HOTEL_DATA?.allFood;
      const area = source?.items?.find((item) => item.key === key);
      const panel = document.querySelector("[data-food-area-panel]");
      if (!area || !panel) return;

      document.querySelectorAll("[data-food-area-trigger]").forEach((card) => {
        card.classList.toggle("is-active", card.dataset.foodAreaTrigger === key);
      });

      panel.innerHTML = renderFoodAreaDetail(area, lang);
      panel.classList.add("is-open");
      return;
    }

    const closeBtn = e.target.closest("[data-food-area-close]");
    if (closeBtn) {
      const panel = document.querySelector("[data-food-area-panel]");
      if (panel) panel.classList.remove("is-open");
      document.querySelectorAll("[data-food-area-trigger]").forEach((card) => {
        card.classList.remove("is-active");
      });
      return;
    }

    const sakuraPrev = e.target.closest("[data-sakura-prev]");
    const sakuraNext = e.target.closest("[data-sakura-next]");
    if (sakuraPrev || sakuraNext) {
      const frame = e.target.closest(".sakura-slider-frame");
      const track = frame?.querySelector("[data-sakura-track]");
      if (!track) return;

      const moveAmount = Math.min(track.clientWidth * 0.9, 420);
      track.scrollBy({
        left: sakuraPrev ? -moveAmount : moveAmount,
        behavior: "smooth"
      });
    }
  });
}
