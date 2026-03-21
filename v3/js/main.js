document.addEventListener("DOMContentLoaded", () => {
  const hotelPage = document.body.dataset.hotelPage;
  const allPage = document.body.dataset.allPage;

  if (hotelPage) {
    renderHotelPage(hotelPage);
  }

  if (allPage) {
    renderAllPage(allPage);
  }

  setupCardSlider();
});

function renderHotelPage(hotelKey) {
  const data = window.HOTEL_DATA?.[hotelKey];
  if (!data) return;

  const hotelName = document.querySelector("[data-hotel-name]");
  const hotelTagline = document.querySelector("[data-hotel-tagline]");
  const hotelDescription = document.querySelector("[data-hotel-description]");
  const hotelTheme = document.querySelector("[data-hotel-theme]");
  const cardsContainer = document.querySelector("[data-cards]");
  const courseContainer = document.querySelector("[data-course]");
  const foodContainer = document.querySelector("[data-food]");
  const eventsContainer = document.querySelector("[data-events]");
  const tabContainer = document.querySelector("[data-hotel-tabs]");
  const introTitle = document.querySelector("[data-intro-title]");
  const introText = document.querySelector("[data-intro-text]");

  if (hotelTheme && data.themeClass) {
    document.body.classList.add(data.themeClass);
  }

  if (hotelName) hotelName.textContent = data.name;
  if (hotelTagline) hotelTagline.textContent = data.tagline;
  if (hotelDescription) hotelDescription.textContent = data.description;

  if (data.tabs && data.tabs.length) {
    let activeTab = data.tabs[0].key;

    if (tabContainer) {
      tabContainer.innerHTML = data.tabs
        .map(
          (tab) => `
          <button class="hotel-tab ${tab.key === activeTab ? "is-active" : ""}" data-tab-key="${tab.key}">
            ${tab.label}
          </button>
        `
        )
        .join("");
    }

    renderSoraniwaTab(data, activeTab);

    tabContainer?.addEventListener("click", (e) => {
      const btn = e.target.closest(".hotel-tab");
      if (!btn) return;

      activeTab = btn.dataset.tabKey;

      tabContainer.querySelectorAll(".hotel-tab").forEach((tab) => {
        tab.classList.remove("is-active");
      });
      btn.classList.add("is-active");

      renderSoraniwaTab(data, activeTab);
    });
  } else {
    if (introTitle) introTitle.textContent = `${data.shortName}에서 시작하는 봄 가이드`;
    if (introText) introText.textContent = data.description;

    renderCards(cardsContainer, data.cards || []);
    renderList(courseContainer, data.course || []);
    renderList(foodContainer, data.food || []);
    renderList(eventsContainer, data.events || []);
  }
}

function renderSoraniwaTab(data, tabKey) {
  const tabData = data.tabs.find((tab) => tab.key === tabKey);
  if (!tabData) return;

  const introTitle = document.querySelector("[data-intro-title]");
  const introText = document.querySelector("[data-intro-text]");
  const cardsContainer = document.querySelector("[data-cards]");
  const courseContainer = document.querySelector("[data-course]");
  const foodContainer = document.querySelector("[data-food]");
  const eventsContainer = document.querySelector("[data-events]");

  if (introTitle) introTitle.textContent = tabData.introTitle;
  if (introText) introText.textContent = tabData.introText;

  renderCards(cardsContainer, tabData.cards || []);
  renderList(courseContainer, tabData.course || []);
  renderList(foodContainer, tabData.food || []);
  renderList(eventsContainer, tabData.events || []);
}

function renderCards(container, cards) {
  if (!container) return;

  container.innerHTML = `
    <div class="card-slider-track">
      ${cards
        .map(
          (card) => `
          <article class="guide-card">
            <div class="guide-card-image"></div>
            <div class="guide-card-body">
              <h3>${card.title}</h3>
              <p>${card.text}</p>
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

function renderAllPage(type) {
  const pageTitle = document.querySelector("[data-all-title]");
  const pageDesc = document.querySelector("[data-all-desc]");
  const content = document.querySelector("[data-all-content]");

  if (!pageTitle || !pageDesc || !content) return;

  if (type === "sakura") {
    pageTitle.textContent = "All Sakura Guide";
    pageDesc.textContent = "교토 전체 벚꽃 명소를 한눈에 확인할 수 있는 가이드입니다.";
    content.innerHTML = window.HOTEL_DATA.allSakura
      .map(
        (item) => `
        <article class="all-card">
          <h3>${item.title}</h3>
          <p>${item.text}</p>
        </article>
      `
      )
      .join("");
  }

  if (type === "food") {
    pageTitle.textContent = "All Food Guide";
    pageDesc.textContent = "호텔 구분 없이 즐길 수 있는 교토 추천 맛집 리스트입니다.";
    content.innerHTML = window.HOTEL_DATA.allFood
      .map(
        (group) => `
        <article class="all-card">
          <h3>${group.category}</h3>
          <ul class="simple-bullet-list">
            ${group.items.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </article>
      `
      )
      .join("");
  }

  if (type === "events") {
    pageTitle.textContent = "All Events Guide";
    pageDesc.textContent = "봄 시즌에 즐길 수 있는 교토 이벤트 정보를 모았습니다.";
    content.innerHTML = window.HOTEL_DATA.allEvents
      .map(
        (item) => `
        <article class="all-card">
          <h3>${item.title}</h3>
          <p>${item.text}</p>
        </article>
      `
      )
      .join("");
  }
}

function setupCardSlider() {
  document.addEventListener("click", (e) => {
    const prevBtn = e.target.closest(".slider-btn.prev");
    const nextBtn = e.target.closest(".slider-btn.next");

    if (!prevBtn && !nextBtn) return;

    const controls = e.target.closest(".slider-controls");
    const parent = controls?.previousElementSibling;
    if (!parent || !parent.classList.contains("card-slider-track")) return;

    const amount = 320;

    if (prevBtn) {
      parent.scrollBy({ left: -amount, behavior: "smooth" });
    }

    if (nextBtn) {
      parent.scrollBy({ left: amount, behavior: "smooth" });
    }
  });
}
