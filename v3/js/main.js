document.addEventListener("DOMContentLoaded", () => {
  const lang = normalizeLang(localStorage.getItem("siteLanguage") || "jp");
  localStorage.setItem("siteLanguage", lang);
  applyLanguageUI(lang);

  const hotelPage = document.body.dataset.hotelPage;
  const allPage = document.body.dataset.allPage;

  if (hotelPage) renderHotelPage(hotelPage, lang);
  if (allPage) renderAllPage(allPage, lang);

  bindLanguageSwitcher();
});

function normalizeLang(lang) {
  if (lang === "ko") return "kr";
  if (lang === "ja") return "jp";
  if (["jp", "kr", "en"].includes(lang)) return lang;
  return "jp";
}

function applyLanguageUI(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("is-active", normalizeLang(btn.dataset.lang) === lang);
  });
}

function bindLanguageSwitcher() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".lang-btn");
    if (!btn) return;
    const nextLang = normalizeLang(btn.dataset.lang);
    localStorage.setItem("siteLanguage", nextLang);
    applyLanguageUI(nextLang);

    const hotelPage = document.body.dataset.hotelPage;
    const allPage = document.body.dataset.allPage;

    if (hotelPage) renderHotelPage(hotelPage, nextLang);
    if (allPage) renderAllPage(allPage, nextLang);
  });
}

function renderHotelPage(key, lang) {
  const data = window.HOTEL_DATA?.[key];
  if (!data) return;

  setText("[data-hotel-label]", data.label?.[lang] || "");
  setText("[data-hotel-name]", data.name?.[lang] || "");
  setText("[data-hotel-tagline]", data.tagline?.[lang] || "");
  setText("[data-hotel-description]", data.description?.[lang] || "");
  setText("[data-intro-title]", data.introTitle?.[lang] || "");
  setText("[data-intro-text]", data.introText?.[lang] || "");

  renderHeroButtons(data.heroButtons || []);
  renderPhotoCards(data.cards || [], lang);
  renderCourseCards(data.courses || [], lang);
  renderMiniFood(data.foods || []);
  renderMiniEvents(data.events || []);
  bindCourseFlip();
}

function renderHeroButtons(buttons) {
  const el = document.querySelector("[data-hero-buttons]");
  if (!el) return;

  if (!buttons.length) {
    el.innerHTML = "";
    el.style.display = "none";
    return;
  }

  el.style.display = "flex";
  el.innerHTML = buttons
    .map(
      (btn) => `
        <a class="hotel-pill ${btn.active ? "is-active" : ""}" href="${btn.href}">
          ${btn.label}
        </a>
      `
    )
    .join("");
}

function renderPhotoCards(cards, lang) {
  const el = document.querySelector("[data-photo-grid]");
  if (!el) return;

  el.innerHTML = cards
    .map(
      (card) => `
        <article class="hotel-photo-card">
          <div class="hotel-photo-thumb">
            <img src="${card.image}" alt="${escapeHtml(card.title?.[lang] || "")}">
          </div>
          <div class="hotel-photo-body">
            <h3 class="hotel-photo-title">${card.title?.[lang] || ""}</h3>
            <p class="hotel-photo-text">${card.text?.[lang] || ""}</p>
          </div>
        </article>
      `
    )
    .join("");
}

function renderCourseCards(items, lang) {
  const el = document.querySelector("[data-course-panel]");
  if (!el) return;

  el.innerHTML = `
    <div class="panel-head">
      <span class="panel-no">01</span>
      <h3 class="panel-title">Recommended Course</h3>
    </div>
    <div class="course-list">
      ${items
        .map(
          (item, index) => `
            <article class="course-card" data-course-card="${index}">
              <div class="course-inner">
                <div class="course-face course-face-front">
                  <p class="item-no">${item.no}</p>
                  <h4 class="item-title">${item.title?.[lang] || ""}</h4>
                  <p class="item-text">${item.sub?.[lang] || ""}</p>
                  <div class="pill-actions">
                    <button class="mini-pill" type="button" data-course-open="${index}">View</button>
                  </div>
                </div>
                <div class="course-face course-face-back">
                  <p class="item-no">${item.no}</p>
                  <h4 class="item-title">${item.title?.[lang] || ""}</h4>
                  <p class="item-route">${item.route?.[lang] || ""}</p>
                  <p class="item-text">${item.detail?.[lang] || ""}</p>
                  <div class="pill-actions">
                    <a class="soft-pill" href="${item.direction}" target="_blank" rel="noopener noreferrer">Directions</a>
                    <button class="line-pill" type="button" data-course-close="${index}">Back</button>
                  </div>
                </div>
              </div>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function bindCourseFlip() {
  document.querySelectorAll("[data-course-open]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.currentTarget.dataset.courseOpen;
      const card = document.querySelector(`[data-course-card="${index}"]`);
      if (card) card.classList.add("is-open");
    });
  });

  document.querySelectorAll("[data-course-close]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.currentTarget.dataset.courseClose;
      const card = document.querySelector(`[data-course-card="${index}"]`);
      if (card) card.classList.remove("is-open");
    });
  });
}

function renderMiniFood(items) {
  const el = document.querySelector("[data-food-panel]");
  if (!el) return;

  el.innerHTML = `
    <div class="panel-head">
      <span class="panel-no">02</span>
      <h3 class="panel-title">Food Picks</h3>
    </div>
    <div class="mini-list">
      ${items
        .map(
          (item) => `
            <article class="mini-item">
              <p class="item-no">${item.no}</p>
              <h4 class="mini-item-title">${item.name}</h4>
              <p class="mini-item-sub">${item.type}</p>
              <div class="pill-actions">
                <a class="mini-pill" href="${item.direction}" target="_blank" rel="noopener noreferrer">Directions</a>
              </div>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function renderMiniEvents(items) {
  const el = document.querySelector("[data-events-panel]");
  if (!el) return;

  el.innerHTML = `
    <div class="panel-head">
      <span class="panel-no">03</span>
      <h3 class="panel-title">Nearby Events</h3>
    </div>
    <div class="mini-list">
      ${items
        .map(
          (item) => `
            <article class="mini-item">
              <p class="item-no">${item.no}</p>
              <h4 class="mini-item-title">${item.name}</h4>
              <p class="mini-item-sub">${item.sub}</p>
              <div class="pill-actions">
                <a class="mini-pill" href="${item.link}" target="_blank" rel="noopener noreferrer">Official</a>
              </div>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function renderAllPage(type, lang) {
  if (type === "sakura") return renderSakuraPage(lang);
  if (type === "food") return renderFoodPage(lang);
  if (type === "events") return renderEventsPage(lang);
}

function renderSakuraPage(lang) {
  const data = window.HOTEL_DATA?.allSakura;
  if (!data) return;
  setText("[data-all-title]", data.title?.[lang] || "");
  setText("[data-all-desc]", data.description?.[lang] || "");

  const el = document.querySelector("[data-all-content]");
  if (!el) return;

  el.innerHTML = `
    <section class="sakura-grid">
      ${data.items
        .map(
          (item) => `
            <article class="sakura-card">
              <div class="sakura-card-media">
                <img src="${item.image}" alt="${escapeHtml(item.title?.[lang] || "")}">
              </div>
              <div class="sakura-card-body">
                <span class="sakura-tag">${item.tag?.[lang] || ""}</span>
                <h3 class="sakura-card-title">${item.title?.[lang] || ""}</h3>
                <p class="sakura-card-text">${item.text?.[lang] || ""}</p>
                <div class="pill-actions">
                  <a class="mini-pill" href="${item.direction}" target="_blank" rel="noopener noreferrer">Directions</a>
                </div>
              </div>
            </article>
          `
        )
        .join("")}
    </section>
  `;
}

function renderFoodPage(lang) {
  const data = window.HOTEL_DATA?.allFood;
  if (!data) return;
  setText("[data-all-title]", data.title?.[lang] || "");
  setText("[data-all-desc]", data.description?.[lang] || "");

  const el = document.querySelector("[data-all-content]");
  if (!el) return;

  el.innerHTML = `
    <section class="food-shell">
      <div class="food-grid" data-food-grid>
        ${data.items
          .map(
            (item) => `
              <article class="food-area-card" data-food-area="${item.key}">
                <p class="item-no">${item.no}</p>
                <p class="eyebrow">${item.eyebrow?.[lang] || ""}</p>
                <h3 class="item-title">${item.title?.[lang] || ""}</h3>
                <p class="item-text">${item.summary?.[lang] || ""}</p>
              </article>
            `
          )
          .join("")}
      </div>
      <div class="food-overlay" data-food-overlay></div>
    </section>
  `;

  bindFoodOverlay(data, lang);
}

function bindFoodOverlay(data, lang) {
  const overlay = document.querySelector("[data-food-overlay]");
  const grid = document.querySelector("[data-food-grid]");
  if (!overlay || !grid) return;

  document.querySelectorAll("[data-food-area]").forEach((card) => {
    card.addEventListener("click", (e) => {
      e.stopPropagation();
      const key = card.dataset.foodArea;
      const area = data.items.find((x) => x.key === key);
      if (!area) return;

      overlay.innerHTML = `
        <div class="food-overlay-card">
          <div class="food-overlay-top">
            <div>
              <p class="eyebrow">${area.eyebrow?.[lang] || ""}</p>
              <h3 class="food-overlay-title">${area.title?.[lang] || ""}</h3>
              <p class="food-overlay-desc">${area.summary?.[lang] || ""}</p>
            </div>
            <button class="overlay-close" type="button" data-food-close>×</button>
          </div>

          <div class="food-spot-grid">
            ${area.spots
              .map(
                (spot) => `
                  <article class="food-spot-card">
                    <div class="food-spot-top">
                      <div>
                        <h4>${spot.name?.[lang] || ""}</h4>
                        <p class="food-spot-type">${spot.type?.[lang] || ""}</p>
                      </div>
                      <a class="mini-pill" href="${spot.direction}" target="_blank" rel="noopener noreferrer">Directions</a>
                    </div>
                    <p class="food-spot-desc">${spot.desc?.[lang] || ""}</p>
                    <p class="food-spot-meta"><strong>Hours</strong> ${spot.hours?.[lang] || ""}</p>
                    <p class="food-spot-meta"><strong>Menu</strong> ${spot.menu?.[lang] || ""}</p>
                  </article>
                `
              )
              .join("")}
          </div>
        </div>
      `;
      overlay.classList.add("is-open");
    });
  });

  document.addEventListener("click", (e) => {
    const closeBtn = e.target.closest("[data-food-close]");
    if (closeBtn) {
      overlay.classList.remove("is-open");
      overlay.innerHTML = "";
      return;
    }

    const clickedCard = e.target.closest("[data-food-area]");
    const clickedOverlay = e.target.closest(".food-overlay-card");
    if (!clickedCard && !clickedOverlay) {
      overlay.classList.remove("is-open");
      overlay.innerHTML = "";
    }
  });
}

function renderEventsPage(lang) {
  const data = window.HOTEL_DATA?.allEvents;
  if (!data) return;
  setText("[data-all-title]", data.title?.[lang] || "");
  setText("[data-all-desc]", data.description?.[lang] || "");

  const el = document.querySelector("[data-all-content]");
  if (!el) return;

  el.innerHTML = `
    <section class="event-grid">
      ${data.items
        .map(
          (item) => `
            <article class="event-card">
              <div class="event-card-media">
                <img src="${item.image}" alt="${escapeHtml(item.title?.[lang] || "")}">
              </div>
              <div class="event-card-body">
                <div class="event-topline">
                  <p class="item-no">${item.no}</p>
                  <span class="event-place">${item.location?.[lang] || ""}</span>
                </div>
                <h3 class="item-title">${item.title?.[lang] || ""}</h3>
                <p class="item-text">${item.date?.[lang] || ""}</p>
                <p class="item-text">${item.text?.[lang] || ""}</p>
                <div class="pill-actions">
                  <a class="mini-pill" href="${item.site}" target="_blank" rel="noopener noreferrer">Official Website</a>
                  <a class="soft-pill" href="${item.direction}" target="_blank" rel="noopener noreferrer">Directions</a>
                </div>
              </div>
            </article>
          `
        )
        .join("")}
    </section>
  `;
}

function setText(selector, value) {
  const el = document.querySelector(selector);
  if (el) el.textContent = value;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
