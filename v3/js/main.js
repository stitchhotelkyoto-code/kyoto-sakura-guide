document.addEventListener("DOMContentLoaded", () => {
  const savedLangRaw = localStorage.getItem("siteLanguage") || "jp";
  const savedLang = normalizeLang(savedLangRaw);

  localStorage.setItem("siteLanguage", savedLang);
  applyLanguage(savedLang);

  const hotelPage = document.body.dataset.hotelPage;
  const allPage = document.body.dataset.allPage;

  window.__hotelState = {
    activeVariant: null,
    selectedCourseIndex: 0
  };

  if (hotelPage) renderHotelPage(hotelPage, savedLang);
  if (allPage) renderAllPage(allPage, savedLang);

  setupLanguageSwitcher();
});

function normalizeLang(lang) {
  if (lang === "ko") return "kr";
  if (lang === "ja") return "jp";
  if (lang === "jp" || lang === "kr" || lang === "en") return lang;
  return "jp";
}

function pickText(value, lang = "jp") {
  if (value == null) return "";
  if (typeof value === "string") return value;
  return value[lang] || value.kr || value.jp || value.en || "";
}

function resolveAssetPath(path) {
  if (!path) return "";
  if (/^https?:\/\//.test(path)) return path;

  const cleaned = path.replace(/^(\.\/|\.\.\/)+/, "");
  const prefix = document.body.dataset.hotelPage ? "../" : "./";
  return prefix + cleaned;
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

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    const value = window.UI_TEXT?.[safeLang]?.[key];
    if (value) el.textContent = value;
  });

  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const key = el.dataset.i18nHtml;
    const value = window.UI_TEXT?.[safeLang]?.[key];
    if (value) el.innerHTML = value.replace(/\n/g, "<br>");
  });

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
  const subLabelEl = document.querySelector("[data-hotel-sub-label]");
  const tabsEl = document.querySelector("[data-hotel-tabs]");
  const introTitleEl = document.querySelector("[data-intro-title]");
  const introTextEl = document.querySelector("[data-intro-text]");
  const cardsEl = document.querySelector("[data-cards]");
  const courseEl = document.querySelector("[data-course]");
  const foodEl = document.querySelector("[data-food]");
  const eventsEl = document.querySelector("[data-events]");

  if (labelEl) labelEl.textContent = pickText(data.label, safeLang);
  if (nameEl) nameEl.textContent = pickText(data.name, safeLang);
  if (taglineEl) taglineEl.textContent = pickText(data.tagline, safeLang);
  if (descEl) descEl.textContent = pickText(data.description, safeLang);
  if (subLabelEl) subLabelEl.textContent = pickText(data.subLabel, safeLang);

  if (data.variants && tabsEl) {
    const variantKeys = Object.keys(data.variants);
    if (!window.__hotelState.activeVariant || !data.variants[window.__hotelState.activeVariant]) {
      window.__hotelState.activeVariant = variantKeys[0];
    }

    tabsEl.innerHTML = variantKeys.map((key) => {
      const variant = data.variants[key];
      const active = key === window.__hotelState.activeVariant ? "is-active" : "";
      return `
        <button class="hotel-tab ${active}" type="button" data-variant-key="${key}">
          ${pickText(variant.tabLabel, safeLang)}
        </button>
      `;
    }).join("");

    tabsEl.onclick = (e) => {
      const btn = e.target.closest(".hotel-tab");
      if (!btn) return;

      window.__hotelState.activeVariant = btn.dataset.variantKey;
      window.__hotelState.selectedCourseIndex = 0;
      renderHotelPage(hotelKey, safeLang);
    };

    const activeVariant = data.variants[window.__hotelState.activeVariant];
    renderHotelVariant(activeVariant, safeLang, {
      introTitleEl,
      introTextEl,
      cardsEl,
      courseEl,
      foodEl,
      eventsEl
    });
    return;
  }

  renderHotelVariant(data, safeLang, {
    introTitleEl,
    introTextEl,
    cardsEl,
    courseEl,
    foodEl,
    eventsEl
  });
}

function renderHotelVariant(data, lang, refs) {
  const {
    introTitleEl,
    introTextEl,
    cardsEl,
    courseEl,
    foodEl,
    eventsEl
  } = refs;

  if (introTitleEl) introTitleEl.textContent = pickText(data.introTitle, lang);
  if (introTextEl) introTextEl.textContent = pickText(data.introText, lang);

  renderCards(cardsEl, data.cards || [], lang);
  renderCourseList(courseEl, data.courses || [], lang);
  renderFoodList(foodEl, data.foods || [], lang);
  renderEventList(eventsEl, data.events || [], lang);

  const safeIndex = Math.min(window.__hotelState.selectedCourseIndex || 0, (data.courses || []).length - 1);
  if ((data.courses || []).length > 0) {
    window.__hotelState.selectedCourseIndex = safeIndex;
    updateCourseDetail(data.courses[safeIndex], lang, true);
    highlightActiveCourseButton(safeIndex);
  }
}

function renderCards(container, cards, lang) {
  if (!container) return;

  container.innerHTML = cards.map((card) => `
    <article class="hotel-image-card">
      <img class="hotel-image-card-photo" src="${resolveAssetPath(card.image)}" alt="${pickText(card.title, lang)}">
      <div class="hotel-image-card-body">
        <h3>${pickText(card.title, lang)}</h3>
        <p>${pickText(card.text, lang)}</p>
      </div>
    </article>
  `).join("");
}

function renderCourseList(container, items, lang) {
  if (!container) return;

  container.innerHTML = items.map((item, index) => `
    <li class="info-item">
      <div class="info-item-number">${item.no || String(index + 1).padStart(2, "0")}</div>
      <div class="info-item-main">
        <button type="button" class="info-title-btn course-trigger" data-course-index="${index}">
          ${pickText(item.title, lang)}
        </button>
      </div>
    </li>
  `).join("");

  container.querySelectorAll(".course-trigger").forEach((btn) => {
    btn.addEventListener("click", () => {
      const hotelPage = document.body.dataset.hotelPage;
      const baseData = window.HOTEL_DATA?.[hotelPage];
      if (!baseData) return;

      let currentData = baseData;
      if (baseData.variants) {
        currentData = baseData.variants[window.__hotelState.activeVariant];
      }

      const idx = Number(btn.dataset.courseIndex);
      const course = currentData.courses?.[idx];
      if (!course) return;

      window.__hotelState.selectedCourseIndex = idx;
      highlightActiveCourseButton(idx);
      updateCourseDetail(course, lang, false);
    });
  });
}

function highlightActiveCourseButton(activeIndex) {
  document.querySelectorAll(".course-trigger").forEach((btn, index) => {
    btn.classList.toggle("is-active", index === activeIndex);
  });
}

function renderFoodList(container, items, lang) {
  if (!container) return;

  container.innerHTML = items.map((item, index) => `
    <li class="info-item with-action">
      <div class="info-item-number">${item.no || String(index + 1).padStart(2, "0")}</div>
      <div class="info-item-main">
        <div class="info-title-text">${pickText(item.name, lang)}</div>
        <div class="info-sub-text">${pickText(item.type, lang)}</div>
      </div>
      <div class="info-item-action">
        <a class="info-mini-btn" href="${item.direction}" target="_blank" rel="noopener noreferrer">Directions</a>
      </div>
    </li>
  `).join("");
}

function renderEventList(container, items, lang) {
  if (!container) return;

  container.innerHTML = items.map((item, index) => `
    <li class="info-item">
      <div class="info-item-number">${item.no || String(index + 1).padStart(2, "0")}</div>
      <div class="info-item-main">
        <a class="info-title-link" href="${item.link}" target="_blank" rel="noopener noreferrer">
          ${pickText(item.name, lang)}
        </a>
        <div class="info-sub-text">${pickText(item.sub, lang)}</div>
      </div>
    </li>
  `).join("");
}

function updateCourseDetail(course, lang, instant = false) {
  const detail = document.getElementById("hotelCourseDetail");
  const frontTitle = document.getElementById("hotelCourseFrontTitle");
  const backTitle = document.getElementById("hotelCourseBackTitle");
  const backRoute = document.getElementById("hotelCourseBackRoute");
  const backDesc = document.getElementById("hotelCourseBackDesc");
  const backBtn = document.getElementById("hotelCourseDirectionBtn");

  if (!detail || !frontTitle || !backTitle || !backRoute || !backDesc || !backBtn) return;

  const title = pickText(course.title, lang);
  const route = pickText(course.route, lang);
  const detailText = pickText(course.detail, lang);

  frontTitle.textContent = title;
  backTitle.textContent = title;
  backRoute.textContent = route;
  backDesc.textContent = detailText;
  backBtn.href = course.direction || "#";

  if (instant) {
    detail.classList.add("is-flipped");
    return;
  }

  detail.classList.remove("is-flipped");
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      detail.classList.add("is-flipped");
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
  if (type === "sakura") source = window.HOTEL_DATA.allSakura;
  if (type === "food") source = window.HOTEL_DATA.allFood;
  if (type === "events") source = window.HOTEL_DATA.allEvents;
  if (type === "ai") source = window.HOTEL_DATA.allAi;
  if (type === "crowd") source = window.HOTEL_DATA.allCrowd;

  if (!source) return;

  titleEl.textContent = pickText(source.title, safeLang);
  descEl.textContent = pickText(source.description, safeLang);

  contentEl.innerHTML = (source.items || []).map((item) => `
    <article class="feature-card ${type === "food" ? "large" : ""}">
      <img class="feature-image-img" src="${resolveAssetPath(item.image || "images/placeholder-guide.jpg")}" alt="${pickText(item.title, safeLang)}">
      <div class="feature-body">
        <span class="feature-tag">${pickText(item.tag, safeLang)}</span>
        <h3>${pickText(item.title, safeLang)}</h3>
        <p>${pickText(item.text, safeLang)}</p>
        ${
          item.list
            ? `<ul class="feature-list">${item.list.map((listItem) => `<li>${pickText(listItem, safeLang)}</li>`).join("")}</ul>`
            : ""
        }
        ${
          item.link
            ? `<a class="feature-link-btn" href="${item.link}" target="_blank" rel="noopener noreferrer">Official Site</a>`
            : ""
        }
      </div>
    </article>
  `).join("");
}
