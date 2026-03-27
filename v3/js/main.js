document.addEventListener("DOMContentLoaded", () => {
  const lang = normalizeLang(localStorage.getItem("siteLanguage") || "jp");
  localStorage.setItem("siteLanguage", lang);

  applyLanguageUI(lang);
  applyStaticTranslations(lang);

  const hotelPage = document.body.dataset.hotelPage;
  const allPage = document.body.dataset.allPage;

  if (hotelPage) renderHotelPage(hotelPage, lang);
  if (allPage) renderAllPage(allPage, lang);

  if (document.body.dataset.page === "home") bindHomeHeroSlider();
  bindLanguageSwitcher();
});

const STATIC_TRANSLATIONS = {
  jp: {
    nav_home: "Home",
    nav_soraniwa: "Soraniwa",
    nav_bettei: "Bettei",
    nav_hiyori: "Hiyori",
    nav_stitch: "STITCH",
    nav_sakura: "Sakura",
    nav_food: "Food",
    nav_events: "Events",
    nav_crowd: "Crowd",
    nav_ai: "AI Guide",

    widget_title: "Explore Kyoto",
    widget_sakura: "Sakura Spots",
    widget_courses: "Travel Courses",
    widget_food: "Food Guide",
    widget_events: "Events",
    widget_ai: "AI Guide",
    widget_crowd: "Live Crowd",

    ai_title: "AI Guide",
    ai_desc: "ホテル基準で京都旅行のコース、桜スポット、食、イベントを素早く整理するガイドページです。",
    ai_tag_1: "Quick Plan",
    ai_tag_2: "By Mood",
    ai_tag_3: "Nearby",
    ai_card_1_title: "1-Day Course",
    ai_card_1_desc: "1日で京都を見て回りたいお客様向けのクイックルートです。",
    ai_card_2_title: "By Travel Mood",
    ai_card_2_desc: "感性散策・寺社・夜散歩・食中心など、気分に合わせて選べます。",
    ai_card_3_title: "By Hotel Base",
    ai_card_3_desc: "各ホテルを基準に、近いエリアから効率よく回れるように構成しました。",

    crowd_title: "Live Crowd Guide",
    crowd_desc: "移動前に確認しやすい混雑情報リンクをまとめたページです。",
    crowd_tag_1: "Before You Go",
    crowd_tag_2: "Best Time",
    crowd_tag_3: "Smart Route",
    crowd_card_1_title: "Check Area Crowd",
    crowd_card_1_desc: "観光地へ向かう前に、周辺エリアの混雑を確認する用途です。",
    crowd_card_2_title: "Time-Based Planning",
    crowd_card_2_desc: "朝・昼・夜の時間帯に合わせて移動順を変え、混雑を避けられます。",
    crowd_card_3_title: "Alternative Route",
    crowd_card_3_desc: "混雑地の代わりに、似た雰囲気の散策ルートも提案できます."
  },
  en: {
    nav_home: "Home",
    nav_soraniwa: "Soraniwa",
    nav_bettei: "Bettei",
    nav_hiyori: "Hiyori",
    nav_stitch: "STITCH",
    nav_sakura: "Sakura",
    nav_food: "Food",
    nav_events: "Events",
    nav_crowd: "Crowd",
    nav_ai: "AI Guide",

    widget_title: "Explore Kyoto",
    widget_sakura: "Sakura Spots",
    widget_courses: "Travel Courses",
    widget_food: "Food Guide",
    widget_events: "Events",
    widget_ai: "AI Guide",
    widget_crowd: "Live Crowd",

    ai_title: "AI Guide",
    ai_desc: "A quick guide page for Kyoto routes, sakura spots, food, and events based on each hotel.",
    ai_tag_1: "Quick Plan",
    ai_tag_2: "By Mood",
    ai_tag_3: "Nearby",
    ai_card_1_title: "1-Day Course",
    ai_card_1_desc: "A quick route for guests who want to see Kyoto in one day.",
    ai_card_2_title: "By Travel Mood",
    ai_card_2_desc: "Choose by mood: scenic walks, temples, evening strolls, or food-focused plans.",
    ai_card_3_title: "By Hotel Base",
    ai_card_3_desc: "Organized so guests can travel efficiently starting from each hotel area.",

    crowd_title: "Live Crowd Guide",
    crowd_desc: "A page collecting useful crowd-check links before heading out.",
    crowd_tag_1: "Before You Go",
    crowd_tag_2: "Best Time",
    crowd_tag_3: "Smart Route",
    crowd_card_1_title: "Check Area Crowd",
    crowd_card_1_desc: "Use this to check the surrounding area before visiting a sightseeing spot.",
    crowd_card_2_title: "Time-Based Planning",
    crowd_card_2_desc: "Adjust your route by morning, afternoon, or evening to avoid crowd peaks.",
    crowd_card_3_title: "Alternative Route",
    crowd_card_3_desc: "We can also suggest alternative stroll routes with a similar mood."
  },
  kr: {
    nav_home: "Home",
    nav_soraniwa: "Soraniwa",
    nav_bettei: "Bettei",
    nav_hiyori: "Hiyori",
    nav_stitch: "STITCH",
    nav_sakura: "Sakura",
    nav_food: "Food",
    nav_events: "Events",
    nav_crowd: "Crowd",
    nav_ai: "AI Guide",

    widget_title: "Explore Kyoto",
    widget_sakura: "Sakura Spots",
    widget_courses: "Travel Courses",
    widget_food: "Food Guide",
    widget_events: "Events",
    widget_ai: "AI Guide",
    widget_crowd: "Live Crowd",

    ai_title: "AI Guide",
    ai_desc: "호텔을 기준으로 교토 여행 코스, 벚꽃 명소, 음식, 이벤트를 빠르게 정리한 안내 페이지입니다.",
    ai_tag_1: "Quick Plan",
    ai_tag_2: "By Mood",
    ai_tag_3: "Nearby",
    ai_card_1_title: "1-Day Course",
    ai_card_1_desc: "하루 일정으로 교토를 보고 싶은 고객을 위한 빠른 추천 루트입니다.",
    ai_card_2_title: "By Travel Mood",
    ai_card_2_desc: "감성 산책, 전통 사찰, 야간 산책, 먹거리 중심 등 취향별로 고를 수 있습니다.",
    ai_card_3_title: "By Hotel Base",
    ai_card_3_desc: "각 호텔을 기준으로 가까운 지역부터 효율적으로 여행할 수 있게 구성했습니다.",

    crowd_title: "Live Crowd Guide",
    crowd_desc: "실시간 혼잡도와 이동 전 확인하면 좋은 링크를 모아둔 페이지입니다.",
    crowd_tag_1: "Before You Go",
    crowd_tag_2: "Best Time",
    crowd_tag_3: "Smart Route",
    crowd_card_1_title: "Check Area Crowd",
    crowd_card_1_desc: "관광지 방문 전 주변 지역의 혼잡도를 먼저 확인하는 용도입니다.",
    crowd_card_2_title: "Time-Based Planning",
    crowd_card_2_desc: "아침, 점심, 저녁 시간대에 따라 이동 순서를 바꿔 혼잡을 피할 수 있습니다.",
    crowd_card_3_title: "Alternative Route",
    crowd_card_3_desc: "혼잡한 곳 대신 비슷한 분위기의 대체 산책 코스도 함께 제안할 수 있습니다."
  }
};

function normalizeLang(lang) {
  if (lang === "ko") return "kr";
  if (lang === "ja") return "jp";
  if (["jp", "en", "kr"].includes(lang)) return lang;
  return "jp";
}

function applyLanguageUI(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("is-active", normalizeLang(btn.dataset.lang) === lang);
  });
}

function applyStaticTranslations(lang) {
  const dict = STATIC_TRANSLATIONS[lang] || STATIC_TRANSLATIONS.jp;

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    if (dict[key]) node.textContent = dict[key];
  });
}

function bindLanguageSwitcher() {
  document.addEventListener("click", (event) => {
    const btn = event.target.closest(".lang-btn");
    if (!btn) return;

    const lang = normalizeLang(btn.dataset.lang);
    localStorage.setItem("siteLanguage", lang);

    applyLanguageUI(lang);
    applyStaticTranslations(lang);

    const hotelPage = document.body.dataset.hotelPage;
    const allPage = document.body.dataset.allPage;

    if (hotelPage) renderHotelPage(hotelPage, lang);
    if (allPage) renderAllPage(allPage, lang);
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

  renderPhotoCards(data.cards || [], lang);
  renderCourseCards(data.courses || [], lang);
  renderMiniFood(data.foods || [], lang);
  renderMiniEvents(data.events || [], lang);
  bindCourseFlip();
  bindHotelTabs();
}

function getHotelDataForCurrentPage(key) {
  const pathname = window.location.pathname.toLowerCase();

  if (key === "bettei") {
    const base = window.HOTEL_DATA?.bettei;
    if (!base) return null;

    return {
      ...base,
      name: {
        jp: "Soraniwa Bettei",
        kr: "Soraniwa Bettei",
        en: "Soraniwa Bettei"
      },
      tagline: {
        jp: "別邸でゆったり楽しむ京都の春",
        kr: "벳테이에서 여유롭게 즐기는 교토의 봄",
        en: "A quieter Kyoto spring from Bettei"
      },
      description: {
        jp: "落ち着いた別邸ステイの流れで、京都の春をゆっくり味わいたいお客様向けのページです。",
        kr: "차분한 벳테이 스테이의 흐름으로 교토의 봄을 천천히 즐기고 싶은 고객을 위한 페이지입니다.",
        en: "A guide for guests who want a quieter Bettei stay and a slower Kyoto spring rhythm."
      },
      introTitle: {
        jp: "Bettei から始まる静かな春時間",
        kr: "Bettei에서 시작하는 고요한 봄 시간",
        en: "A calmer spring flow from Bettei"
      },
      introText: {
        jp: "ソラニワの華やかさとは少し違う、ゆるやかなペースで春を楽しみたい方におすすめです。",
        kr: "소라니와의 화사함과는 조금 다른, 더 느린 템포로 봄을 즐기고 싶은 분께 추천합니다.",
        en: "Recommended for guests who prefer a quieter spring pace than the main Soraniwa flow."
      },
      heroButtons: [
        { label: "Soraniwa", href: "soraniwa.html", active: false },
        { label: "Bettei", href: "bettel.html", active: true }
      ]
    };
  }

  const base = window.HOTEL_DATA?.[key];
  if (!base) return null;

  if (key === "soraniwa") {
    return {
      ...base,
      heroButtons: [
        { label: "Soraniwa", href: "soraniwa.html", active: !pathname.endsWith("bettel.html") },
        { label: "Bettei", href: "bettel.html", active: pathname.endsWith("bettel.html") }
      ]
    };
  }

  return base;
}

function renderHeroButtons(buttons) {
  const el = document.querySelector("[data-hero-buttons]");
  if (!el) return;

  if (!buttons.length) {
    el.innerHTML = "";
    return;
  }

  el.innerHTML = buttons
    .map((btn) => {
      const activeClass = btn.active ? " is-active" : "";
      return `
        <a class="hotel-pill${activeClass}" href="${escapeHtml(btn.href || "#")}">
          ${escapeHtml(btn.label || "")}
        </a>
      `;
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
          const number = escapeHtml(item.no || String(index + 1).padStart(2, "0"));
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
                  <p class="item-no">${number}</p>
                  <h4 class="item-title">${title}</h4>
                  <p class="item-sub">${sub}</p>
                  ${accessHtml}
                  <button class="soft-pill course-open-btn" type="button" data-course-open="${index}">View</button>
                </div>

                <div class="course-face course-back">
                  <p class="item-no">${number}</p>
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
    btn.addEventListener("click", (event) => {
      const index = event.currentTarget.dataset.courseOpen;
      const card = document.querySelector(`[data-course-card="${index}"]`);
      if (card) card.classList.add("is-open");
    });
  });

  document.querySelectorAll("[data-course-close]").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const index = event.currentTarget.dataset.courseClose;
      const card = document.querySelector(`[data-course-card="${index}"]`);
      if (card) card.classList.remove("is-open");
    });
  });
}

function bindHotelTabs() {
  const tabButtons = document.querySelectorAll("[data-tab-target]");
  const tabPanels = document.querySelectorAll("[data-tab-panel]");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.tabTarget;

      tabButtons.forEach((b) =>
        b.classList.toggle("is-active", b === btn)
      );

      tabPanels.forEach((panel) =>
        panel.classList.toggle(
          "is-active",
          panel.dataset.tabPanel === target
        )
      );
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
          const number = escapeHtml(item.no || "");
          const name = escapeHtml(resolveText(item.name, lang));
          const type = escapeHtml(resolveText(item.type, lang));
          const image = item.image ? escapeHtml(item.image) : "";
          const direction = escapeHtml(item.direction || "#");

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
                <p class="item-no">${number}</p>
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
          const number = escapeHtml(item.no || "");
          const name = escapeHtml(resolveText(item.name || item.title, lang));
          const sub = escapeHtml(resolveText(item.sub || item.date, lang));
          const official = escapeHtml(item.official || item.site || "#");

          return `
            <article class="mini-item">
              <p class="item-no">${number}</p>
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
  if (type === "sakura") renderSakuraPage(lang);
  if (type === "courses") renderCoursesPage(lang);
  if (type === "food") renderFoodPage(lang);
  if (type === "events") renderEventsPage(lang);
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
          const image = escapeHtml(item.image || "");
          const direction = escapeHtml(item.direction || "#");

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

function renderCoursesPage(lang) {
  const data = window.HOTEL_DATA?.allCourses;
  if (!data) return;

  setText("[data-all-title]", resolveText(data.title, lang));
  setText("[data-all-desc]", resolveText(data.description, lang));

  const el = document.querySelector("[data-all-content]");
  if (!el) return;

  el.innerHTML = `
    <section class="courses-grid">
      ${data.items.map((item) => {
        const tag = escapeHtml(resolveText(item.tag, lang));
        const title = escapeHtml(resolveText(item.title, lang));
        const text = escapeHtml(resolveText(item.text, lang));
        const image = escapeHtml(item.image || "");
        const direction = escapeHtml(item.direction || "#");

        return `
          <article class="courses-card">
            <div class="courses-card-media">
              ${
                image
                  ? `<img src="${image}" alt="${title}" loading="lazy">`
                  : `<div class="courses-card-placeholder"></div>`
              }
            </div>
            <div class="courses-card-body">
              <span class="courses-tag">${tag}</span>
              <h3 class="courses-card-title">${title}</h3>
              <p class="courses-card-text">${text}</p>
              <a class="soft-pill" href="${direction}" target="_blank" rel="noopener noreferrer">
                Directions
              </a>
            </div>
          </article>
        `;
      }).join("")}
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
      <div class="food-grid">
        ${data.items
          .map((item) => {
            const no = escapeHtml(item.no || "");
            const eyebrow = escapeHtml(resolveText(item.eyebrow, lang));
            const title = escapeHtml(resolveText(item.title, lang));
            const summary = escapeHtml(resolveText(item.summary, lang));

            return `
              <article class="food-area-card" data-food-area="${escapeHtml(item.key || "")}">
                <p class="item-no">${no}</p>
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
    card.addEventListener("click", (event) => {
      event.stopPropagation();

      const key = card.dataset.foodArea;
      const area = data.items.find((item) => item.key === key);
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
                const image = spot.image ? escapeHtml(spot.image) : "";
                const direction = escapeHtml(spot.direction || "#");

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

  document.addEventListener("click", (event) => {
    const closeBtn = event.target.closest("[data-food-close]");
    if (closeBtn) {
      overlay.classList.remove("is-open");
      overlay.innerHTML = "";
      return;
    }

    const clickedCard = event.target.closest("[data-food-area]");
    const clickedOverlay = event.target.closest(".food-overlay-card");

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
          const title = escapeHtml(resolveText(item.title, lang));
          const date = escapeHtml(resolveText(item.date, lang));
          const location = escapeHtml(resolveText(item.location, lang));
          const text = escapeHtml(resolveText(item.text, lang));
          const image = escapeHtml(item.image || "");
          const official = escapeHtml(item.official || item.site || "#");
          const direction = escapeHtml(item.direction || "#");

          return `
            <article class="event-card">
              <div class="event-card-media">
                <img src="${image}" alt="${title}" loading="lazy">
              </div>
              <div class="event-card-body">
                <span class="event-place">${location}</span>
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

function bindHomeHeroSlider() {
  const slides = Array.from(document.querySelectorAll(".hero-slide"));
  const prevBtn = document.getElementById("heroPrevBtn");
  const nextBtn = document.getElementById("heroNextBtn");
  const currentEl = document.getElementById("heroCurrent");
  const totalEl = document.getElementById("heroTotal");

  if (!slides.length || !prevBtn || !nextBtn || !currentEl || !totalEl) return;

  let current = 0;
  let autoTimer = null;
  const autoDelay = 3500;

  totalEl.textContent = String(slides.length);

  function showSlide(index) {
    current = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      slide.classList.toggle("is-active", i === current);
    });

    currentEl.textContent = String(current + 1);
  }

  function startAuto() {
    stopAuto();
    autoTimer = window.setInterval(() => {
      showSlide(current + 1);
    }, autoDelay);
  }

  function stopAuto() {
    if (autoTimer) {
      window.clearInterval(autoTimer);
      autoTimer = null;
    }
  }

  prevBtn.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    showSlide(current - 1);
    startAuto();
  });

  nextBtn.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    showSlide(current + 1);
    startAuto();
  });

  slides.forEach((slide) => {
    slide.addEventListener("mouseenter", stopAuto);
    slide.addEventListener("mouseleave", startAuto);
  });

  prevBtn.addEventListener("mouseenter", stopAuto);
  nextBtn.addEventListener("mouseenter", stopAuto);
  prevBtn.addEventListener("mouseleave", startAuto);
  nextBtn.addEventListener("mouseleave", startAuto);

  showSlide(0);
  startAuto();
}
