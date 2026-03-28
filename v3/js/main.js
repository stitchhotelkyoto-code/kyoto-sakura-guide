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
  widget_sakura_desc: "京都の春らしい桜景色をエリア別にチェック。",
  widget_course_desc: "歩きやすい京都ルートを大切な人と一緒に。",
  widget_events_desc: "ライトアップや春のイベントをまとめて確認。",
  widget_crowd_desc: "お出かけ前に現地の雰囲気をチェック。"
  
  ai_title: "AI Guide",
  ai_desc: "ホテルを起点に、その時の気分・時間帯・同行者に合わせて京都の過ごし方を整理するガイドです。『今夜1時間だけ歩きたい』『雨の日でも動きやすい場所を知りたい』『チェックイン後に遅めの夕食を探したい』といった使い方を想定しています。",

  ai_tag_1: "Tonight",
  ai_tag_2: "By Situation",
  ai_tag_3: "By Stay Style",

  ai_card_1_title: "1-Hour Evening Walk",
  ai_card_1_desc: "到着後や夕食後に、無理なく京都らしい雰囲気を感じられる夜散策ルートを考えるためのガイドです。ホテル近くから始めやすい流れを想定しています。",

  ai_card_2_title: "Rainy Day / Late Dinner / Short Time",
  ai_card_2_desc: "雨の日、移動を増やしたくない日、遅い時間の食事を探したい時など、状況に合わせて無理のない回り方を組み立てるための案内です。",

  ai_card_3_title: "Family / Group / Easy Pace",
  ai_card_3_desc: "家族旅行やグループ滞在でも動きやすいように、移動距離・休憩しやすさ・食事のつなげやすさを意識してプランを考えるためのガイドです。",

  crowd_title: "Live Crowd Guide",
  crowd_desc: "リアルタイム表示というより、混みやすい時間帯や動きやすい時間の目安をもとに、京都を少しでもスムーズに回るためのガイドです。出発前の判断や、混雑を避ける順番決めに使える想定です。",

  crowd_tag_1: "Best Time",
  crowd_tag_2: "Busy Hours",
  crowd_tag_3: "Smart Timing",

  crowd_card_1_title: "Morning vs Noon",
  crowd_card_1_desc: "錦市場や中心部エリアは昼前後に人が増えやすいため、朝の早い時間から回る方が歩きやすいスポットを見分けるための考え方です。",

  crowd_card_2_title: "Evening Crowd Around Gion",
  crowd_card_2_desc: "祇園・白川・東山エリアは、桜シーズンやライトアップ時に夜の混雑が強くなりやすいため、夕方前後に動くか、余裕を持って出る判断につなげます。",

  crowd_card_3_title: "Choose the Order Wisely",
  crowd_card_3_desc: "『人気エリアを先に行くか、あとに行くか』を時間帯で調整し、混雑が強い場所は避けながら、似た雰囲気の散策ルートへ切り替える発想を持たせるためのガイドです."
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
  widget_sakura_desc: "Discover Kyoto’s seasonal cherry blossom views.",
  widget_course_desc: "Walkable Kyoto routes with smooth map guidance.",
  widget_events_desc: "Seasonal illuminations and spring happenings in Kyoto.",
  widget_crowd_desc: "Check the atmosphere before heading out."
  
  ai_title: "AI Guide",
  ai_desc: "This guide helps guests shape their Kyoto plan based on where they stay, how much time they have, and what kind of mood they are in. It is meant for requests like “I only want a 1-hour evening walk,” “I need rainy-day ideas,” or “I want a late dinner after check-in.”",

  ai_tag_1: "Tonight",
  ai_tag_2: "By Situation",
  ai_tag_3: "By Stay Style",

  ai_card_1_title: "1-Hour Evening Walk",
  ai_card_1_desc: "A guide for building a light evening route after arrival or after dinner, so guests can enjoy Kyoto’s atmosphere without committing to a long outing.",

  ai_card_2_title: "Rainy Day / Late Dinner / Short Time",
  ai_card_2_desc: "Useful when guests want a practical plan for rainy weather, a shorter outing, or a later dinner without adding too much movement to the day.",

  ai_card_3_title: "Family / Group / Easy Pace",
  ai_card_3_desc: "Built around shorter distances, easier pacing, and smoother meal breaks, so families and groups can enjoy Kyoto more comfortably.",

  crowd_title: "Live Crowd Guide",
  crowd_desc: "Rather than showing exact live tracking, this page is designed as a practical timing guide: when an area is usually easier, when it tends to get busy, and how guests can move more smoothly by choosing the order of their route well.",

  crowd_tag_1: "Best Time",
  crowd_tag_2: "Busy Hours",
  crowd_tag_3: "Smart Timing",

  crowd_card_1_title: "Morning vs Noon",
  crowd_card_1_desc: "Useful for areas like Nishiki Market and central shopping streets, where walking is often easier in the morning and noticeably busier around lunch.",

  crowd_card_2_title: "Evening Crowd Around Gion",
  crowd_card_2_desc: "Helpful for Gion, Shirakawa, and Higashiyama, where spring evenings and light-up periods can become much more crowded than daytime.",

  crowd_card_3_title: "Choose the Order Wisely",
  crowd_card_3_desc: "The idea is to avoid crowd peaks by changing the order of visits, or by switching to another stroll area with a similar mood when one place feels too busy."
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
  widget_sakura_desc: "교토의 봄 벚꽃 풍경을 지역별로 살펴보세요.",
  widget_course_desc: "걷기 좋은 교토 코스를 확인하세요.",
  widget_events_desc: "라이트업과 봄 시즌 이벤트를 한눈에 확인하세요.",
  widget_crowd_desc: "외출 전에 현지 분위기를 먼저 확인해보세요.",
  
  ai_title: "AI Guide",
  ai_desc: "이 페이지는 호텔을 기준으로, 지금의 시간대·기분·동행 형태에 맞춰 교토에서 어떻게 움직일지 정리해주는 가이드입니다. ‘오늘 밤 1시간만 걷고 싶다’, ‘비 오는 날에도 가기 쉬운 곳이 궁금하다’, ‘체크인 후 늦은 저녁을 먹고 싶다’ 같은 상황을 상정했습니다.",

  ai_tag_1: "Tonight",
  ai_tag_2: "By Situation",
  ai_tag_3: "By Stay Style",

  ai_card_1_title: "1-Hour Evening Walk",
  ai_card_1_desc: "도착 후나 저녁 식사 후, 너무 무리하지 않으면서도 교토다운 밤 분위기를 느낄 수 있는 짧은 산책 루트를 생각할 때 쓰는 가이드입니다.",

  ai_card_2_title: "Rainy Day / Late Dinner / Short Time",
  ai_card_2_desc: "비 오는 날, 오래 걷고 싶지 않은 날, 체크인 후 늦게 식사할 곳을 찾고 싶은 상황처럼 조건이 애매할 때 실용적으로 동선을 정리하기 위한 안내입니다.",

  ai_card_3_title: "Family / Group / Easy Pace",
  ai_card_3_desc: "가족 여행이나 그룹 여행에서도 무리 없이 움직일 수 있도록, 이동 거리·쉬기 쉬운 흐름·식사 연결을 고려해 코스를 잡는 데 초점을 둔 가이드입니다.",

  crowd_title: "Live Crowd Guide",
  crowd_desc: "정확한 실시간 추적보다는, 어디가 어느 시간대에 붐비기 쉬운지와 언제 움직이면 조금 더 편한지를 바탕으로 교토를 더 부드럽게 돌아보기 위한 가이드입니다. 출발 전 판단이나 방문 순서 조정에 쓰는 것을 상정했습니다.",

  crowd_tag_1: "Best Time",
  crowd_tag_2: "Busy Hours",
  crowd_tag_3: "Smart Timing",

  crowd_card_1_title: "Morning vs Noon",
  crowd_card_1_desc: "니시키시장이나 도심권처럼 점심 전후로 사람이 확 늘어나는 곳은, 아침에 먼저 가는 편이 훨씬 걷기 편하다는 기준을 잡기 위한 내용입니다.",

  crowd_card_2_title: "Evening Crowd Around Gion",
  crowd_card_2_desc: "기온·시라카와·히가시야마 방면은 벚꽃 시즌과 라이트업 시간대에 저녁 혼잡이 커지기 쉬워, 해 지기 전 이동이나 여유 있는 출발 판단에 도움이 되는 내용입니다.",

  crowd_card_3_title: "Choose the Order Wisely",
  crowd_card_3_desc: "인기 지역을 언제 먼저 갈지, 언제 뒤로 미룰지 시간대에 따라 조정하고, 너무 붐비면 비슷한 분위기의 다른 산책 구간으로 바꾸는 발상을 주기 위한 가이드입니다."
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
      ${
        card.isComingSoon
          ? `
            <div class="coming-soon-card">
              <div class="coming-soon-inner">
                <div class="coming-soon-label">BAR</div>
                <div class="coming-soon-title">Coming Soon</div>
              </div>
            </div>
          `
          : `
            <img src="${image}" alt="${title}" loading="lazy">
          `
      }
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
    ${data.items
      .map((item) => {
        const tag = escapeHtml(resolveText(item.tag, lang));
        const title = escapeHtml(resolveText(item.title, lang));
        const text = escapeHtml(resolveText(item.text, lang));
        const image = escapeHtml(item.image || "");
        const direction = escapeHtml(item.direction || "#");

        return `
          <article class="all-course-card">
            ${
              image
                ? `
                  <div class="all-course-card-image-wrap">
                    <img class="all-course-card-image" src="${image}" alt="${title}">
                  </div>
                `
                : ""
            }

            <div class="all-course-card-body">
              <div class="all-course-card-tag">${tag}</div>
              <h3 class="all-course-card-title">${title}</h3>
              <p class="all-course-card-text">${text}</p>
              <a class="chip-btn" href="${direction}" target="_blank" rel="noopener noreferrer">Directions</a>
            </div>
          </article>
        `;
      })
      .join("")}
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
    ${data.items
      .map((item) => {
        const no = escapeHtml(item.no || "");
        const eyebrow = escapeHtml(resolveText(item.eyebrow, lang));
        const title = escapeHtml(resolveText(item.title, lang));
        const summary = escapeHtml(resolveText(item.summary, lang));
        const image = escapeHtml(item.image || "");

        return `
          <article class="food-area-card" data-food-area="${escapeHtml(item.key || "")}">
            ${
              image
                ? `
                  <div class="food-area-card-image-wrap">
                    <img class="food-area-card-image" src="${image}" alt="${title}">
                  </div>
                `
                : ""
            }

            <div class="food-area-card-body">
              <div class="food-area-card-no">${no}</div>
              <div class="food-area-card-eyebrow">${eyebrow}</div>
              <h3 class="food-area-card-title">${title}</h3>
              <p class="food-area-card-summary">${summary}</p>
            </div>
          </article>
        `;
      })
      .join("")}
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
