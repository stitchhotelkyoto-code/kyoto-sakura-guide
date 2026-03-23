document.addEventListener("DOMContentLoaded", () => {
  const savedLangRaw = localStorage.getItem("siteLanguage") || "jp";
  const savedLang = normalizeLang(savedLangRaw);

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
  injectAllPageStyles();
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
    btn.classList.toggle(
      "is-active",
      normalizeLang(btn.dataset.lang) === safeLang
    );
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

    if (
      tabsEl.dataset.activeKey &&
      data.tabs.some((tab) => tab.key === tabsEl.dataset.activeKey)
    ) {
      activeKey = tabsEl.dataset.activeKey;
    }

    tabsEl.innerHTML = data.tabs
      .map(
        (tab) => `
          <button class="hotel-tab ${
            tab.key === activeKey ? "is-active" : ""
          }" data-tab-key="${tab.key}">
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

  resetCourseFlip();
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

  resetCourseFlip();
}

function renderCards(container, cards, lang) {
  if (!container) return;

  container.innerHTML = `
    <div class="card-slider-track">
      ${cards
        .map(
          (card) => `
            <article class="hotel-card">
              <div class="hotel-card-image-wrap">
                <img src="${card.image || ""}" alt="${card.title?.[lang] || ""}" class="hotel-card-image">
              </div>
              <div class="hotel-card-body">
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
        <article class="hotel-course-item" data-course-index="${index}">
          <div class="hotel-course-no">${item.no}</div>
          <div class="hotel-course-copy">
            <h3>${item.title?.[lang] || ""}</h3>
            <p>${item.sub?.[lang] || ""}</p>
          </div>
          <button class="hotel-course-view" type="button" data-course-index="${index}">View</button>
        </article>
      `
    )
    .join("");

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

  container.innerHTML = items
    .map(
      (item) => `
        <article class="hotel-food-item">
          <div class="hotel-food-no">${item.no}</div>
          <div class="hotel-food-copy">
            <h3>${item.name}</h3>
            <p>${item.type}</p>
          </div>
          <a href="${item.direction || "#"}" target="_blank" rel="noopener noreferrer">Directions</a>
        </article>
      `
    )
    .join("");
}

function renderEventList(container, items) {
  if (!container) return;

  container.innerHTML = items
    .map(
      (item) => `
        <article class="hotel-event-item">
          <div class="hotel-event-no">${item.no}</div>
          <div class="hotel-event-copy">
            <a href="${item.link || "#"}" target="_blank" rel="noopener noreferrer">${item.name}</a>
            <p>${item.sub}</p>
          </div>
        </article>
      `
    )
    .join("");
}

function resetCourseFlip() {
  const box = document.getElementById("hotelCourseFlipBox");
  if (!box) return;

  box.classList.remove("is-flipped");

  const titleEl = box.querySelector("[data-course-back-title]");
  const routeEl = box.querySelector("[data-course-back-route]");
  const descEl = box.querySelector("[data-course-back-desc]");
  const directionEl = box.querySelector("[data-course-back-direction]");

  if (titleEl) titleEl.textContent = "";
  if (routeEl) routeEl.textContent = "";
  if (descEl) descEl.textContent = "";

  if (directionEl) {
    directionEl.textContent = "Directions";
    directionEl.href = "#";
  }
}

function showCourseFlip(course, lang) {
  const safeLang = normalizeLang(lang);
  const box = document.getElementById("hotelCourseFlipBox");
  if (!box) return;

  const titleEl = box.querySelector("[data-course-back-title]");
  const routeEl = box.querySelector("[data-course-back-route]");
  const descEl = box.querySelector("[data-course-back-desc]");
  const directionEl = box.querySelector("[data-course-back-direction]");

  if (titleEl) titleEl.textContent = course.title?.[safeLang] || "";
  if (routeEl) routeEl.textContent = course.route?.[safeLang] || "";
  if (descEl) descEl.textContent = course.detail?.[safeLang] || "";

  if (directionEl) {
    directionEl.textContent = "Directions";
    directionEl.href = course.direction || "#";
  }

  box.classList.remove("is-flipped");
  requestAnimationFrame(() => {
    box.classList.add("is-flipped");
  });
}

function setupCourseFlipReset() {
  document.addEventListener("click", (e) => {
    const box = document.getElementById("hotelCourseFlipBox");
    if (!box || !box.classList.contains("is-flipped")) return;

    const clickedInsideBack = e.target.closest(".hotel-course-face-back");
    const clickedDirection = e.target.closest("[data-course-back-direction]");
    const clickedCourseTrigger = e.target.closest("[data-course-index]");

    if (clickedDirection || clickedCourseTrigger) return;

    if (clickedInsideBack) {
      box.classList.remove("is-flipped");
    }
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

  titleEl.textContent = source.title?.[safeLang] || "";
  descEl.textContent = source.description?.[safeLang] || "";

  if (type === "events") {
    contentEl.innerHTML = renderAllEventsPage(source, safeLang);
    return;
  }

  if (type === "food") {
    contentEl.innerHTML = renderAllFoodPage(source, safeLang);
    return;
  }

  if (type === "sakura") {
    contentEl.innerHTML = renderAllSakuraPage(source, safeLang);
    return;
  }

  contentEl.innerHTML = source.items
    .map(
      (item) => `
        <article class="all-card">
          <span class="all-card-tag">${item.tag?.[safeLang] || ""}</span>
          <h3>${item.title?.[safeLang] || ""}</h3>
          <p>${item.text?.[safeLang] || ""}</p>
        </article>
      `
    )
    .join("");
}

function renderAllEventsPage(source, lang) {
  return `
    <section class="all-events-grid">
      ${source.items
        .map(
          (item) => `
            <article class="event-guide-card">
              <div class="event-guide-head">
                <span class="event-guide-no">${item.no}</span>
                <span class="event-guide-place">${item.location?.[lang] || ""}</span>
              </div>
              <h3>${item.title?.[lang] || ""}</h3>
              <p class="event-guide-date">${item.date?.[lang] || ""}</p>
              <p class="event-guide-text">${item.text?.[lang] || ""}</p>
              <div class="event-guide-links">
                <a href="${item.site || "#"}" target="_blank" rel="noopener noreferrer">Official Website</a>
                <a href="${item.direction || "#"}" target="_blank" rel="noopener noreferrer">Directions</a>
              </div>
            </article>
          `
        )
        .join("")}
    </section>
  `;
}

function renderAllFoodPage(source, lang) {
  const firstArea = source.items?.[0];

  return `
    <section class="food-area-shell" data-food-shell>
      <div class="food-area-grid">
        ${source.items
          .map(
            (item, index) => `
              <article
                class="food-area-card ${index === 0 ? "is-active" : ""}"
                data-food-area-trigger="${item.key}"
              >
                <div class="food-area-card-no">${item.no}</div>
                <div class="food-area-card-copy">
                  <span>${item.eyebrow?.[lang] || ""}</span>
                  <h3>${item.title?.[lang] || ""}</h3>
                  <p>${item.summary?.[lang] || ""}</p>
                </div>
              </article>
            `
          )
          .join("")}
      </div>

      <div class="food-area-detail ${firstArea ? "is-open" : ""}" data-food-area-panel>
        ${
          firstArea
            ? renderFoodAreaDetail(firstArea, lang)
            : ""
        }
      </div>
    </section>
  `;
}

function renderFoodAreaDetail(area, lang) {
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
        ${area.spots
          .map(
            (spot) => `
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
            `
          )
          .join("")}
      </div>
    </div>
  `;
}

function renderAllSakuraPage(source, lang) {
  return `
    <section class="sakura-guide-shell">
      <div class="sakura-slider-frame">
        <div class="sakura-slider-track" data-sakura-track>
          ${source.items
            .map(
              (item) => `
                <article class="sakura-guide-card">
                  <div class="sakura-guide-tag">${item.tag?.[lang] || ""}</div>
                  <h3>${item.title?.[lang] || ""}</h3>
                  <p class="sakura-guide-text">${item.text?.[lang] || ""}</p>
                  <p class="sakura-guide-best">${item.bestTime?.[lang] || ""}</p>
                  <div class="sakura-guide-links">
                    <a href="${item.direction || "#"}" target="_blank" rel="noopener noreferrer">Directions</a>
                  </div>
                </article>
              `
            )
            .join("")}
        </div>

        <div class="sakura-slider-controls">
          <button class="sakura-slider-btn prev" type="button" data-sakura-prev>←</button>
          <button class="sakura-slider-btn next" type="button" data-sakura-next>→</button>
        </div>
      </div>
    </section>
  `;
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

      const moveAmount = Math.min(track.clientWidth * 0.92, 420);
      track.scrollBy({
        left: sakuraPrev ? -moveAmount : moveAmount,
        behavior: "smooth"
      });
    }
  });
}

function injectAllPageStyles() {
  if (document.getElementById("all-page-inline-style")) return;

  const style = document.createElement("style");
  style.id = "all-page-inline-style";
  style.textContent = `
    .all-events-grid{
      display:grid;
      grid-template-columns:repeat(auto-fit,minmax(240px,1fr));
      gap:20px;
    }

    .event-guide-card{
      border:1px solid rgba(0,0,0,.08);
      border-radius:24px;
      padding:22px;
      background:#fff;
      box-shadow:0 16px 36px rgba(0,0,0,.06);
      display:flex;
      flex-direction:column;
      gap:12px;
    }

    .event-guide-head{
      display:flex;
      justify-content:space-between;
      align-items:center;
      gap:12px;
    }

    .event-guide-no{
      width:38px;
      height:38px;
      border-radius:999px;
      display:flex;
      align-items:center;
      justify-content:center;
      background:#f7dbe5;
      font-weight:700;
      font-size:.9rem;
    }

    .event-guide-place{
      font-size:.82rem;
      color:#8d5a6b;
      font-weight:600;
    }

    .event-guide-card h3{
      margin:0;
      font-size:1.1rem;
      line-height:1.4;
    }

    .event-guide-date{
      margin:0;
      font-size:.92rem;
      color:#8f5065;
      font-weight:600;
    }

    .event-guide-text{
      margin:0;
      line-height:1.75;
      color:#333;
    }

    .event-guide-links{
      display:flex;
      flex-wrap:wrap;
      gap:10px;
      margin-top:auto;
    }

    .event-guide-links a{
      display:inline-flex;
      align-items:center;
      justify-content:center;
      min-height:42px;
      padding:0 16px;
      border-radius:999px;
      text-decoration:none;
      background:#111;
      color:#fff;
      font-size:.9rem;
      font-weight:600;
    }

    .food-area-shell{
      position:relative;
      display:grid;
      gap:22px;
    }

    .food-area-grid{
      display:grid;
      grid-template-columns:repeat(3,minmax(0,1fr));
      gap:18px;
      position:relative;
    }

    .food-area-card{
      cursor:pointer;
      border:1px solid rgba(0,0,0,.08);
      border-radius:26px;
      background:#fff;
      box-shadow:0 12px 32px rgba(0,0,0,.05);
      padding:22px;
      min-height:180px;
      display:flex;
      gap:14px;
      transition:transform .24s ease, box-shadow .24s ease, border-color .24s ease;
    }

    .food-area-card:hover,
    .food-area-card.is-active{
      transform:translateY(-4px);
      box-shadow:0 18px 40px rgba(0,0,0,.10);
      border-color:#efb8cb;
    }

    .food-area-card-no{
      flex:0 0 42px;
      width:42px;
      height:42px;
      border-radius:999px;
      background:#f7dbe5;
      display:flex;
      align-items:center;
      justify-content:center;
      font-weight:700;
      font-size:.9rem;
    }

    .food-area-card-copy span{
      display:block;
      margin-bottom:8px;
      font-size:.75rem;
      letter-spacing:.08em;
      color:#9b6678;
      text-transform:uppercase;
      font-weight:700;
    }

    .food-area-card-copy h3{
      margin:0 0 10px;
      font-size:1.1rem;
    }

    .food-area-card-copy p{
      margin:0;
      line-height:1.7;
      color:#444;
    }

    .food-area-detail{
      display:none;
      position:relative;
      z-index:2;
      border-radius:30px;
      padding:10px;
      background:linear-gradient(180deg, rgba(255,255,255,.97), rgba(255,248,251,.98));
      box-shadow:0 24px 64px rgba(0,0,0,.10);
      border:1px solid rgba(239,184,203,.45);
    }

    .food-area-detail.is-open{
      display:block;
      animation:foodPanelPop .24s ease;
    }

    @keyframes foodPanelPop{
      from{opacity:0; transform:scale(.98);}
      to{opacity:1; transform:scale(1);}
    }

    .food-area-detail-inner{
      padding:24px;
    }

    .food-area-detail-head{
      display:flex;
      justify-content:space-between;
      align-items:flex-start;
      gap:16px;
      margin-bottom:22px;
    }

    .food-area-detail-eyebrow{
      display:block;
      margin-bottom:8px;
      font-size:.78rem;
      color:#9b6678;
      letter-spacing:.08em;
      text-transform:uppercase;
      font-weight:700;
    }

    .food-area-detail-head h3{
      margin:0 0 10px;
      font-size:1.5rem;
    }

    .food-area-detail-head p{
      margin:0;
      line-height:1.8;
      color:#444;
    }

    .food-area-close{
      border:none;
      width:42px;
      height:42px;
      border-radius:999px;
      font-size:1.4rem;
      cursor:pointer;
      background:#111;
      color:#fff;
    }

    .food-area-spot-list{
      display:grid;
      grid-template-columns:repeat(3,minmax(0,1fr));
      gap:16px;
    }

    .food-spot-item{
      border-radius:22px;
      padding:18px;
      background:#fff;
      border:1px solid rgba(0,0,0,.06);
      box-shadow:0 10px 24px rgba(0,0,0,.04);
    }

    .food-spot-top{
      display:flex;
      justify-content:space-between;
      align-items:flex-start;
      gap:10px;
      margin-bottom:12px;
    }

    .food-spot-top h4{
      margin:0 0 6px;
      font-size:1rem;
      line-height:1.5;
    }

    .food-spot-type{
      margin:0;
      color:#9b6678;
      font-size:.85rem;
      font-weight:600;
    }

    .food-spot-top a,
    .sakura-guide-links a{
      display:inline-flex;
      align-items:center;
      justify-content:center;
      min-height:38px;
      padding:0 14px;
      border-radius:999px;
      text-decoration:none;
      background:#111;
      color:#fff;
      white-space:nowrap;
      font-size:.88rem;
      font-weight:600;
    }

    .food-spot-desc{
      margin:0 0 12px;
      line-height:1.75;
      color:#333;
    }

    .food-spot-meta{
      margin:0;
      line-height:1.8;
      color:#555;
      font-size:.92rem;
    }

    .sakura-guide-shell{
      position:relative;
    }

    .sakura-slider-frame{
      position:relative;
      padding-bottom:10px;
    }

    .sakura-slider-track{
      display:grid;
      grid-auto-flow:column;
      grid-auto-columns:minmax(300px, 34%);
      gap:18px;
      overflow-x:auto;
      scroll-behavior:smooth;
      padding-bottom:8px;
      scrollbar-width:none;
    }

    .sakura-slider-track::-webkit-scrollbar{
      display:none;
    }

    .sakura-guide-card{
      border-radius:28px;
      padding:24px;
      background:linear-gradient(180deg,#fff,#fff8fb);
      border:1px solid rgba(0,0,0,.06);
      box-shadow:0 16px 40px rgba(0,0,0,.06);
      min-height:260px;
      display:flex;
      flex-direction:column;
      gap:12px;
    }

    .sakura-guide-tag{
      display:inline-flex;
      align-self:flex-start;
      padding:8px 12px;
      border-radius:999px;
      background:#f7dbe5;
      color:#8f5065;
      font-size:.78rem;
      font-weight:700;
    }

    .sakura-guide-card h3{
      margin:0;
      font-size:1.2rem;
      line-height:1.45;
    }

    .sakura-guide-text,
    .sakura-guide-best{
      margin:0;
      line-height:1.8;
      color:#333;
    }

    .sakura-guide-links{
      margin-top:auto;
    }

    .sakura-slider-controls{
      display:flex;
      justify-content:flex-end;
      gap:10px;
      margin-top:16px;
    }

    .sakura-slider-btn{
      width:44px;
      height:44px;
      border-radius:999px;
      border:none;
      background:#111;
      color:#fff;
      cursor:pointer;
      font-size:1rem;
    }

    @media (max-width: 980px){
      .food-area-grid{
        grid-template-columns:repeat(2,minmax(0,1fr));
      }

      .food-area-spot-list{
        grid-template-columns:1fr;
      }

      .sakura-slider-track{
        grid-auto-columns:82%;
      }
    }

    @media (max-width: 640px){
      .food-area-grid{
        grid-template-columns:1fr;
      }

      .food-area-card{
        min-height:auto;
      }

      .event-guide-links{
        flex-direction:column;
      }

      .food-area-detail-inner{
        padding:18px;
      }

      .food-area-detail-head{
        flex-direction:column;
      }

      .food-area-close{
        align-self:flex-end;
      }

      .sakura-slider-track{
        grid-auto-columns:90%;
      }
    }
  `;
  document.head.appendChild(style);
}
