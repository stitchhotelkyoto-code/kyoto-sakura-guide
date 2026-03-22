document.addEventListener("DOMContentLoaded", () => {
  const savedLangRaw = localStorage.getItem("siteLanguage") || "jp";
  const savedLang = normalizeLang(savedLangRaw);

  localStorage.setItem("siteLanguage", savedLang);
  applyLanguage(savedLang);

  const hotelPage = document.body.dataset.hotelPage;
  const allPage = document.body.dataset.allPage;

  if (hotelPage) {
    renderHotelPage(hotelPage, savedLang);
  }

  if (allPage) {
    renderAllPage(allPage, savedLang);
  }

  setupLanguageSwitcher();
  setupCardSlider();
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

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    const value = window.UI_TEXT?.[safeLang]?.[key];
    if (value) el.textContent = value;
  });

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("is-active", normalizeLang(btn.dataset.lang) === safeLang);
  });
}

function renderHotelPage(hotelKey, lang = "jp") {
  const safeLang = normalizeLang(lang);
  const data = window.HOTEL_DATA?.[hotelKey];
  if (!data) return;

  const pageShell = document.querySelector(".page-shell");
  if (pageShell) {
    pageShell.classList.remove(
      "hotel-theme-soraniwa",
      "hotel-theme-hiyori",
      "hotel-theme-stitch"
    );
    if (data.themeClass) pageShell.classList.add(data.themeClass);
  }

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

  if (labelEl) labelEl.textContent = data.label?.[safeLang] || "";
  if (nameEl) nameEl.textContent = data.name?.[safeLang] || "";
  if (taglineEl) taglineEl.textContent = data.tagline?.[safeLang] || "";
  if (descEl) descEl.textContent = data.description?.[safeLang] || "";
  if (subLabelEl) subLabelEl.textContent = data.subLabel?.[safeLang] || "";

  if (data.tabs && tabsEl) {
    let activeKey = data.tabs[0].key;
    const prevActive = tabsEl.dataset.activeKey;
    if (prevActive && data.tabs.some((tab) => tab.key === prevActive)) {
      activeKey = prevActive;
    }

    tabsEl.innerHTML = data.tabs
      .map(
        (tab) => `
          <button class="hotel-tab ${tab.key === activeKey ? "is-active" : ""}" type="button" data-tab-key="${tab.key}">
            ${tab.label?.[safeLang] || tab.key}
          </button>
        `
      )
      .join("");

    tabsEl.dataset.activeKey = activeKey;
    renderHotelTab(data, activeKey, safeLang);

    tabsEl.onclick = (e) => {
      const btn = e.target.closest(".hotel-tab");
      if (!btn) return;

      const nextKey = btn.dataset.tabKey;
      tabsEl.dataset.activeKey = nextKey;

      tabsEl.querySelectorAll(".hotel-tab").forEach((tabBtn) => {
        tabBtn.classList.remove("is-active");
      });
      btn.classList.add("is-active");

      renderHotelTab(data, nextKey, safeLang);
    };
  } else {
    if (introTitleEl) introTitleEl.textContent = data.introTitle?.[safeLang] || "";
    if (introTextEl) introTextEl.textContent = data.introText?.[safeLang] || "";
    renderCards(cardsEl, data.cards || [], safeLang);
    renderCourseList(courseEl, data.courses || [], safeLang);
    renderFoodList(foodEl, data.foods || [], safeLang);
    renderEventList(eventsEl, data.events || [], safeLang);
  }

  resetCourseDetail(safeLang);
}

function renderHotelTab(data, tabKey, lang) {
  const safeLang = normalizeLang(lang);
  const tabData = data.tabs.find((tab) => tab.key === tabKey);
  if (!tabData) return;

  const introTitleEl = document.querySelector("[data-intro-title]");
  const introTextEl = document.querySelector("[data-intro-text]");
  const cardsEl = document.querySelector("[data-cards]");
  const courseEl = document.querySelector("[data-course]");
  const foodEl = document.querySelector("[data-food]");
  const eventsEl = document.querySelector("[data-events]");

  if (introTitleEl) introTitleEl.textContent = tabData.introTitle?.[safeLang] || "";
  if (introTextEl) introTextEl.textContent = tabData.introText?.[safeLang] || "";

  renderCards(cardsEl, tabData.cards || [], safeLang);
  renderCourseList(courseEl, tabData.courses || [], safeLang);
  renderFoodList(foodEl, tabData.foods || [], safeLang);
  renderEventList(eventsEl, tabData.events || [], safeLang);

  resetCourseDetail(safeLang);
}

function renderCards(container, cards, lang) {
  if (!container) return;

  container.innerHTML = `
    <div class="card-slider-track">
      ${cards
        .map(
          (card) => `
            <article class="guide-card">
              <div class="guide-card-image">
                <img src="${card.image || ""}" alt="${card.title?.[lang] || ""}">
              </div>
              <div class="guide-card-body">
                <h3>${card.title?.[lang] || ""}</h3>
                <p>${card.text?.[lang] || ""}</p>
              </div>
            </article>
          `
        )
        .join("")}
    </div>

    <div class="slider-controls">
      <button class="slider-btn prev" type="button" aria-label="Previous">←</button>
      <button class="slider-btn next" type="button" aria-label="Next">→</button>
    </div>
  `;
}

function renderCourseList(container, items, lang) {
  if (!container) return;

  container.innerHTML = items
    .map(
      (item, index) => `
        <li class="info-list-row">
          <span class="list-number">${item.no}</span>
          <div class="list-content">
            <button class="course-title-btn" type="button" data-course-index="${index}">
              ${item.title?.[lang] || ""}
            </button>
            <span class="list-sub">${item.sub?.[lang] || ""}</span>
          </div>
          <button class="course-view-btn" type="button" data-course-index="${index}">View</button>
        </li>
      `
    )
    .join("");

  container.querySelectorAll("[data-course-index]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = Number(btn.dataset.courseIndex);
      const course = items[index];
      if (!course) return;
      showCourseDetail(course, lang);
    });
  });
}

function renderFoodList(container, items, lang) {
  if (!container) return;

  container.innerHTML = items
    .map(
      (item) => `
        <li class="info-list-row">
          <span class="list-number">${item.no}</span>
          <div class="list-content">
            <span class="list-title">${item.name}</span>
            <span class="list-sub">${item.type}</span>
          </div>
          <a class="list-action-btn" href="${item.direction}" target="_blank" rel="noopener noreferrer">Directions</a>
        </li>
      `
    )
    .join("");
}

function renderEventList(container, items) {
  if (!container) return;

  container.innerHTML = items
    .map(
      (item) => `
        <li class="info-list-row">
          <span class="list-number">${item.no}</span>
          <div class="list-content">
            <a class="list-title link-title" href="${item.link}" target="_blank" rel="noopener noreferrer">${item.name}</a>
            <span class="list-sub">${item.sub}</span>
          </div>
        </li>
      `
    )
    .join("");
}

function resetCourseDetail(lang) {
  const safeLang = normalizeLang(lang);
  const detail = document.getElementById("hotelCourseDetail");
  if (!detail) return;

  detail.classList.remove("is-flipped");

  const frontLabel = detail.querySelector("[data-detail-front-label]");
  const frontTitle = detail.querySelector("[data-detail-front-title]");
  const frontDesc = detail.querySelector("[data-detail-front-desc]");
  const backLabel = detail.querySelector("[data-detail-back-label]");
  const backTitle = detail.querySelector("[data-detail-back-title]");
  const backRoute = detail.querySelector("[data-detail-back-route]");
  const backDesc = detail.querySelector("[data-detail-back-desc]");
  const backBtn = detail.querySelector("[data-detail-direction]");

  if (frontLabel) frontLabel.textContent = window.UI_TEXT?.[safeLang]?.detail_placeholder_label || "COURSE DETAIL";
  if (frontTitle) frontTitle.textContent = "";
  if (frontDesc) frontDesc.textContent = "";
  if (backLabel) backLabel.textContent = "";
  if (backTitle) backTitle.textContent = "";
  if (backRoute) backRoute.textContent = "";
  if (backDesc) backDesc.textContent = "";
  if (backBtn) {
    backBtn.textContent = window.UI_TEXT?.[safeLang]?.direction_btn || "Directions";
    backBtn.href = "#";
  }
}

function showCourseDetail(course, lang) {
  const safeLang = normalizeLang(lang);
  const detail = document.getElementById("hotelCourseDetail");
  if (!detail) return;

  const frontLabel = detail.querySelector("[data-detail-front-label]");
  const frontTitle = detail.querySelector("[data-detail-front-title]");
  const frontDesc = detail.querySelector("[data-detail-front-desc]");
  const backLabel = detail.querySelector("[data-detail-back-label]");
  const backTitle = detail.querySelector("[data-detail-back-title]");
  const backRoute = detail.querySelector("[data-detail-back-route]");
  const backDesc = detail.querySelector("[data-detail-back-desc]");
  const backBtn = detail.querySelector("[data-detail-direction]");

  if (frontLabel) frontLabel.textContent = "COURSE DETAIL";
  if (frontTitle) frontTitle.textContent = course.title?.[safeLang] || "";
  if (frontDesc) frontDesc.textContent = "";

  if (backLabel) backLabel.textContent = "HOW TO GO";
  if (backTitle) backTitle.textContent = course.title?.[safeLang] || "";
  if (backRoute) backRoute.textContent = course.route?.[safeLang] || "";
  if (backDesc) backDesc.textContent = course.detail?.[safeLang] || "";
  if (backBtn) {
    backBtn.textContent = window.UI_TEXT?.[safeLang]?.direction_btn || "Directions";
    backBtn.href = course.direction || "#";
  }

  detail.classList.add("is-flipped");
  detail.scrollIntoView({ behavior: "smooth", block: "nearest" });
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

  titleEl.textContent = source.title?.[safeLang] || "";
  descEl.textContent = source.description?.[safeLang] || "";

  contentEl.innerHTML = source.items
    .map(
      (item) => `
        <article class="feature-card">
          <div class="feature-image"></div>
          <div class="feature-body">
            <span class="feature-tag">${item.tag?.[safeLang] || ""}</span>
            <h3>${item.title?.[safeLang] || ""}</h3>
            <p>${item.text?.[safeLang] || ""}</p>
          </div>
        </article>
      `
    )
    .join("");
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
    if (prevBtn) track.scrollBy({ left: -moveAmount, behavior: "smooth" });
    if (nextBtn) track.scrollBy({ left: moveAmount, behavior: "smooth" });
  });
}
