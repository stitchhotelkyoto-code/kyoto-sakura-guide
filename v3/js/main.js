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
  const data = getHotelDataForCurrentPage(key);
  if (!data) return;

  setText("[data-hotel-label]", resolveText(data.label, lang));
  setText("[data-hotel-name]", resolveText(data.name, lang));
  setText("[data-hotel-tagline]", resolveText(data.tagline, lang));
  setText("[data-hotel-description]", resolveText(data.description, lang));
  setText("[data-intro-title]", resolveText(data.introTitle, lang));
  setText("[data-intro-text]", resolveText(data.introText, lang));

  renderHeroButtons(data.heroButtons || []);
  renderPhotoCards(data.cards || [], lang);
  renderCourseCards(data.courses || [], lang);
  renderMiniFood(data.foods || [], lang);
  renderMiniEvents(data.events || [], lang);
  bindCourseFlip();
}

function getHotelDataForCurrentPage(key) {
  const base = window.HOTEL_DATA?.[key];
  if (!base) return null;

  const pathname = window.location.pathname.toLowerCase();
  const isBettelPage = pathname.endsWith("/bettel.html") || pathname.endsWith("bettel.html");

  if (!isBettelPage) return base;

  const cloned = { ...base };

  if (Array.isArray(base.heroButtons)) {
    cloned.heroButtons = [
      {
        label: "Soraniwa",
        href: "soraniwa.html",
        active: false
      },
      {
        label: "Bettei",
        href: "bettel.html",
        active: true
      }
    ];
  }

  return cloned;
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
    .map((btn) => {
      const label = escapeHtml(btn.label || "");
      const href = escapeHtml(btn.href || "#");
      const activeClass = btn.active ? " is-active" : "";
      return `<a class="hotel-pill${activeClass}" href="${href}">${label}</a>`;
    })
    .join("");
}

function renderPhotoCards(cards, lang) {
  const el = document.querySelector("[data-photo-grid]");
  if (!el) return;

  el.innerHTML = cards
    .map((card) => {
      const title = escapeHtml(resolveText(card.title, lang));
      const text = escapeHtml(resolveText(card.text, lang));
      const image = escapeHtml(card.image || "");

      return `
        <article class="hotel-photo-card">
          <div class="hotel-photo-thumb">
            <img src="${image}" alt="${title}" loading="lazy">
          </div>
          <div class="hotel-photo-body">
            <h3 class="hotel-photo-title">${title}</h3>
            <p class="hotel-photo-text">${text}</p>
          </div>
        </article>
      `;
    })
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
        .map((item, index) => {
          const title = escapeHtml(resolveText(item.title, lang));
          const sub = escapeHtml(resolveText(item.sub, lang));
          const route = escapeHtml(resolveText(item.route, lang));
          const detail = escapeHtml(resolveText(item.detail, lang));
          const direction = escapeHtml(item.direction || "#");
          const accessHtml = renderCourseAccess(item.access, lang);

          return `
            <article class="course-card" data-course-card="${index}">
              <div class="course-inner">
                <div class="course-face course-front">
                  <p class="item-no">${escapeHtml(item.no || String(index + 1).padStart(2, "0"))}</p>
                  <h4 class="item-title">${title}</h4>
                  <p class="item-sub">${sub}</p>
                  ${accessHtml}
                  <button class="soft-pill course-open-btn" type="button" data-course-open="${index}">View</button>
                </div>

                <div class="course-face course-back">
                  <p class="item-no">${escapeHtml(item.no || String(index + 1).padStart(2, "0"))}</p>
                  <h4 class="item-title">${title}</h4>
                  <p class="item-sub">${route}</p>
                  <p class="item-detail">${detail}</p>
                  ${accessHtml}
                  <div class="course-back-actions">
                    <a class="soft-pill" href="${direction}" target="_blank" rel="noopener noreferrer">Directions</a>
                    <button class="line-pill" type="button" data-course-close="${index}">Back</button>
                  </div>
                </div>
              </div>
            </article>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderCourseAccess(access, lang) {
  if (!Array.isArray(access) || !access.length) return "";

  return `
    <div class="course-access">
      ${access
        .map((item) => {
          const label = escapeHtml(resolveText(item.label, lang));
          const value = escapeHtml(resolveText(item.value, lang));
          return `
            <div class="course-access-chip">
              <span class="course-access-label">${label}</span>
              <strong class="course-access-value">${value}</strong>
            </div>
          `;
        })
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

function renderMiniFood(items, lang) {
  const el = document.querySelector("[data-food-panel]");
  if (!el) return;

  el.innerHTML = `
    <div class="panel-head">
      <span class="panel-no">02</span>
      <h3 class="panel-title">Food Picks</h3>
    </div>
    <div class="mini-list">
      ${items
        .map((item) => {
          const name = escapeHtml(resolveText(item.name, lang));
          const type = escapeHtml(resolveText(item.type, lang));
          const direction = escapeHtml(item.direction || "#");
          const image = item.image ? escapeHtml(item.image) : "";

          return `
            <article class="mini-item ${image ? "has-thumb" : ""}">
              ${
                image
                  ? `
                    <div class="mini-thumb">
                      <img src="${image}" alt="${name}" loading="lazy">
                    </div>
                  `
                  : ""
              }
              <div class="mini-item-body">
                <p class="item-no">${escapeHtml(item.no || "")}</p>
                <h4 class="mini-item-title">${name}</h4>
                <p class="mini-item-sub">${type}</p>
                <a class="soft-pill" href="${direction}" target="_blank" rel="noopener noreferrer">Directions</a>
              </div>
            </article>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderMiniEvents(items, lang) {
  const el = document.querySelector("[data-events-panel]");
  if (!el) return;

  el.innerHTML = `
    <div class="panel-head">
      <span class="panel-no">03</span>
      <h3 class="panel-title">Nearby Events</h3>
    </div>
    <div class="mini-list">
      ${items
        .map((item) => {
          const name = escapeHtml(resolveText(item.name, lang));
          const sub = escapeHtml(resolveText(item.sub, lang));
          const official = escapeHtml(item.official || "#");

          return `
            <article class="mini-item">
              <p class="item-no">${escapeHtml(item.no || "")}</p>
              <h4 class="mini-item-title">${name}</h4>
              <p class="mini-item-sub">${sub}</p>
              <a class="soft-pill" href="${official}" target="_blank" rel="noopener noreferrer">Official</a>
            </article>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderAllPage(type, lang) {
  if (type === "sakura") {
    renderSakuraPage(lang);
    return;
  }

  if (type === "food") {
    renderFoodPage(lang);
    return;
  }

  if (type === "events") {
    renderEventsPage(lang);
    return;
  }
}

function renderSakuraPage(lang) {
  const data = window.HOTEL_DATA?.allSakura;
  if (!data) return;

  setText("[data-all-title]", resolveText(data.title, lang));
  setText("[data-all-desc]", resolveText(data.description, lang));

  const el = document.querySelector("[data-all-content]");
  if (!el) return;

  el.innerHTML = `
    <section class="sakura-grid">
      ${data.items
        .map((item) => {
          const tag = escapeHtml(resolveText(item.tag, lang));
          const title = escapeHtml(resolveText(item.title, lang));
          const text = escapeHtml(resolveText(item.text, lang));
          const direction = escapeHtml(item.direction || "#");
          const image = escapeHtml(item.image || "");

          return `
            <article class="sakura-card">
              <div class="sakura-card-media">
                <img src="${image}" alt="${title}" loading="lazy">
              </div>
              <div class="sakura-card-body">
                <span class="sakura-tag">${tag}</span>
                <h3 class="sakura-card-title">${title}</h3>
                <p class="sakura-card-text">${text}</p>
                <a class="soft-pill" href="${direction}" target="_blank" rel="noopener noreferrer">Directions</a>
              </div>
            </article>
          `;
        })
        .join("")}
    </section>
  `;
}

function renderFoodPage(lang) {
  const data = window.HOTEL_DATA?.allFood;
  if (!data) return;

  setText("[data-all-title]", resolveText(data.title, lang));
  setText("[data-all-desc]", resolveText(data.description, lang));

  const el = document.querySelector("[data-all-content]");
  if (!el) return;

  el.innerHTML = `
    <section class="food-shell">
      <div class="food-grid" data-food-grid>
        ${data.items
          .map((item) => {
            const eyebrow = escapeHtml(resolveText(item.eyebrow, lang));
            const title = escapeHtml(resolveText(item.title, lang));
            const summary = escapeHtml(resolveText(item.summary, lang));

            return `
              <article class="food-area-card" data-food-area="${escapeHtml(item.key || "")}">
                <p class="item-no">${escapeHtml(item.no || "")}</p>
                <p class="eyebrow">${eyebrow}</p>
                <h3 class="item-title">${title}</h3>
                <p class="item-sub">${summary}</p>
              </article>
            `;
          })
          .join("")}
      </div>
      <div class="food-overlay" data-food-overlay></div>
    </section>
  `;

  bindFoodOverlay(data, lang);
}

function bindFoodOverlay(data, lang) {
  const overlay = document.querySelector("[data-food-overlay]");
  if (!overlay) return;

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
              <p class="eyebrow">${escapeHtml(resolveText(area.eyebrow, lang))}</p>
              <h3 class="food-overlay-title">${escapeHtml(resolveText(area.title, lang))}</h3>
              <p class="food-overlay-desc">${escapeHtml(resolveText(area.summary, lang))}</p>
            </div>
            <button class="overlay-close" type="button" data-food-close>×</button>
          </div>

          <div class="food-spot-grid">
            ${(area.spots || [])
              .map((spot) => {
                const name = escapeHtml(resolveText(spot.name, lang));
                const type = escapeHtml(resolveText(spot.type, lang));
                const desc = escapeHtml(resolveText(spot.desc, lang));
                const hours = escapeHtml(resolveText(spot.hours, lang));
                const menu = escapeHtml(resolveText(spot.menu, lang));
                const direction = escapeHtml(spot.direction || "#");
                const image = spot.image ? escapeHtml(spot.image) : "";

                return `
                  <article class="food-spot-card ${image ? "has-image" : ""}">
                    ${
                      image
                        ? `
                          <div class="food-spot-image">
                            <img src="${image}" alt="${name}" loading="lazy">
                          </div>
                        `
                        : ""
                    }

                    <div class="food-spot-top">
                      <div>
                        <h4>${name}</h4>
                        <p class="food-spot-type">${type}</p>
                      </div>
                      <a class="soft-pill" href="${direction}" target="_blank" rel="noopener noreferrer">Directions</a>
                    </div>

                    <p class="food-spot-desc">${desc}</p>
                    <p class="food-spot-meta">Hours ${hours}</p>
                    <p class="food-spot-meta">Menu ${menu}</p>
                  </article>
                `;
              })
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

  setText("[data-all-title]", resolveText(data.title, lang));
  setText("[data-all-desc]", resolveText(data.description, lang));

  const el = document.querySelector("[data-all-content]");
  if (!el) return;

  el.innerHTML = `
    <section class="event-grid">
      ${data.items
        .map((item) => {
          const image = escapeHtml(item.image || "");
          const title = escapeHtml(resolveText(item.title, lang));
          const date = escapeHtml(resolveText(item.date, lang));
          const location = escapeHtml(resolveText(item.location, lang));
          const text = escapeHtml(resolveText(item.text, lang));
          const official = escapeHtml(item.official || "#");
          const direction = escapeHtml(item.direction || "#");

          return `
            <article class="event-card">
              <div class="event-card-media">
                <img src="${image}" alt="${title}" loading="lazy">
              </div>
              <div class="event-card-body">
                <div class="event-topline">
                  <span class="event-place">${location}</span>
                </div>
                <h3 class="sakura-card-title">${title}</h3>
                <p class="item-sub">${date}</p>
                <p class="sakura-card-text">${text}</p>
                <div class="event-actions">
                  <a class="soft-pill" href="${official}" target="_blank" rel="noopener noreferrer">Official Website</a>
                  <a class="line-pill" href="${direction}" target="_blank" rel="noopener noreferrer">Directions</a>
                </div>
              </div>
            </article>
          `;
        })
        .join("")}
    </section>
  `;
}

function setText(selector, value) {
  const el = document.querySelector(selector);
  if (el) el.textContent = value;
}

function resolveText(value, lang) {
  if (value == null) return "";
  if (typeof value === "string") return value;
  return value[lang] || value.jp || value.en || value.kr || "";
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
