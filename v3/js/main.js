document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("siteLanguage") || "jp";

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

function setupLanguageSwitcher() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-lang]");
    if (!btn) return;

    const lang = btn.dataset.lang;
    localStorage.setItem("siteLanguage", lang);

    applyLanguage(lang);

    const hotelPage = document.body.dataset.hotelPage;
    const allPage = document.body.dataset.allPage;

    if (hotelPage) {
      renderHotelPage(hotelPage, lang);
    }

    if (allPage) {
      renderAllPage(allPage, lang);
    }
  });
}

function applyLanguage(lang) {
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    const value = window.UI_TEXT?.[lang]?.[key];
    if (value) {
      el.textContent = value;
    }
  });

  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const key = el.dataset.i18nHtml;
    const value = window.UI_TEXT?.[lang]?.[key];
    if (value) {
      el.innerHTML = value.replace(/\n/g, "<br>");
    }
  });

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.lang === lang);
  });
}

function renderHotelPage(hotelKey, lang = "jp") {
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

  if (labelEl) labelEl.textContent = data.label?.[lang] || "";
  if (nameEl) nameEl.textContent = data.name?.[lang] || "";
  if (taglineEl) taglineEl.textContent = data.tagline?.[lang] || "";
  if (descEl) descEl.textContent = data.description?.[lang] || "";
  if (subLabelEl) subLabelEl.textContent = data.subLabel?.[lang] || "";

  if (data.tabs && tabsEl) {
    let activeKey = data.tabs[0].key;

    tabsEl.innerHTML = data.tabs
      .map(
        (tab, index) => `
          <button class="hotel-tab ${index === 0 ? "is-active" : ""}" type="button" data-tab-key="${tab.key}">
            ${tab.label?.[lang] || tab.key}
          </button>
        `
      )
      .join("");

    renderHotelTab(data, activeKey, lang);

    tabsEl.onclick = (e) => {
      const btn = e.target.closest(".hotel-tab");
      if (!btn) return;

      activeKey = btn.dataset.tabKey;

      tabsEl.querySelectorAll(".hotel-tab").forEach((tabBtn) => {
        tabBtn.classList.remove("is-active");
      });

      btn.classList.add("is-active");
      renderHotelTab(data, activeKey, lang);
    };

    return;
  }

  if (introTitleEl) introTitleEl.textContent = data.introTitle?.[lang] || "";
  if (introTextEl) introTextEl.textContent = data.introText?.[lang] || "";
  renderCards(cardsEl, data.cards || [], lang);
  renderList(courseEl, data.course?.[lang] || []);
  renderList(foodEl, data.food?.[lang] || []);
  renderList(eventsEl, data.events?.[lang] || []);
}

function renderHotelTab(data, tabKey, lang) {
  const tabData = data.tabs.find((tab) => tab.key === tabKey);
  if (!tabData) return;

  const introTitleEl = document.querySelector("[data-intro-title]");
  const introTextEl = document.querySelector("[data-intro-text]");
  const cardsEl = document.querySelector("[data-cards]");
  const courseEl = document.querySelector("[data-course]");
  const foodEl = document.querySelector("[data-food]");
  const eventsEl = document.querySelector("[data-events]");

  if (introTitleEl) introTitleEl.textContent = tabData.introTitle?.[lang] || "";
  if (introTextEl) introTextEl.textContent = tabData.introText?.[lang] || "";

  renderCards(cardsEl, tabData.cards || [], lang);
  renderList(courseEl, tabData.course?.[lang] || []);
  renderList(foodEl, tabData.food?.[lang] || []);
  renderList(eventsEl, tabData.events?.[lang] || []);
}

function renderCards(container, cards, lang) {
  if (!container) return;

  container.innerHTML = `
    <div class="card-slider-track">
      ${cards
        .map(
          (card) => `
            <article class="guide-card">
              <div class="guide-card-image"></div>
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

function renderList(container, items) {
  if (!container) return;

  container.innerHTML = items
    .map(
      (item, index) => `
        <li>
          <span class="list-number">${String(index + 1).padStart(2, "0")}</span>
          <span class="list-text">${item}</span>
        </li>
      `
    )
    .join("");
}

function renderAllPage(type, lang = "jp") {
  const titleEl = document.querySelector("[data-all-title]");
  const descEl = document.querySelector("[data-all-desc]");
  const contentEl = document.querySelector("[data-all-content]");

  if (!titleEl || !descEl || !contentEl) return;

  const source =
    type === "sakura"
      ? window.HOTEL_DATA.allSakura
      : type === "food"
      ? window.HOTEL_DATA.allFood
      : window.HOTEL_DATA.allEvents;

  if (!source) return;

  titleEl.textContent = source.title?.[lang] || "";
  descEl.textContent = source.description?.[lang] || "";

  if (type === "food") {
    contentEl.innerHTML = source.items
      .map(
        (item) => `
          <article class="feature-card large">
            <div class="feature-image"></div>
            <div class="feature-body">
              <span class="feature-tag">${item.tag?.[lang] || ""}</span>
              <h3>${item.title?.[lang] || ""}</h3>
              <p>${item.text?.[lang] || ""}</p>
              <ul class="feature-list">
                ${(item.list || []).map((listItem) => `<li>${listItem}</li>`).join("")}
              </ul>
            </div>
          </article>
        `
      )
      .join("");
    return;
  }

  contentEl.innerHTML = source.items
    .map(
      (item) => `
        <article class="feature-card">
          <div class="feature-image"></div>
          <div class="feature-body">
            <span class="feature-tag">${item.tag?.[lang] || ""}</span>
            <h3>${item.title?.[lang] || ""}</h3>
            <p>${item.text?.[lang] || ""}</p>
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

    if (prevBtn) {
      track.scrollBy({ left: -moveAmount, behavior: "smooth" });
    }

    if (nextBtn) {
      track.scrollBy({ left: moveAmount, behavior: "smooth" });
    }
  });
}
