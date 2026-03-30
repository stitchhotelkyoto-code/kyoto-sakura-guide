(function () {
  const STORAGE_KEY = "siteLanguage";

  function normalizeLang(lang) {
    if (lang === "ko") return "kr";
    if (lang === "en") return "en";
    if (lang === "kr") return "kr";
    return "jp";
  }

 function getInitialLang() {
  try {
    const saved =
      localStorage.getItem("siteLanguage") ||
      localStorage.getItem("kyotoSakuraGuideLang") ||
      localStorage.getItem(STORAGE_KEY);

    if (saved) return normalizeLang(saved);
  } catch (error) {}

  const htmlLang = document.documentElement.getAttribute("lang");
  if (htmlLang) return normalizeLang(htmlLang);

  return "jp";
}

  const state = {
    lang: getInitialLang(),
    activeFilter: "all",
    searchTerm: ""
  };

  const page = document.querySelector('[data-page="crowd-guide"]');
  if (!page) return;

  const els = {
    searchInput: document.querySelector("[data-crowd-search]"),
    clearBtn: document.querySelector("[data-crowd-clear]"),
    suggestions: document.querySelector("[data-crowd-suggestions]"),
    topList: document.querySelector("[data-crowd-top-list]"),
    result: document.querySelector("[data-crowd-result]"),
    filters: Array.from(document.querySelectorAll("[data-filter]")),
    langButtons: Array.from(document.querySelectorAll("[data-lang]")),
    textNodes: Array.from(document.querySelectorAll("[data-crowd-text]"))
  };

  const TEXT = window.CROWD_UI_TEXT || {};
  const SPOTS = window.CROWD_SPOTS || [];
  const CONFIG = window.CROWD_CONFIG || { baseByTime: {} };

  function getText(key) {
    return TEXT[state.lang]?.[key] || TEXT.jp?.[key] || key;
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function getSpotText(fieldObj) {
    if (!fieldObj) return "";
    return fieldObj[state.lang] || fieldObj.jp || fieldObj.en || fieldObj.kr || "";
  }

  function getCurrentTimeBucket() {
    const hour = new Date().getHours();

    if (hour >= 6 && hour < 8) return "earlyMorning";
    if (hour >= 8 && hour < 10) return "morning";
    if (hour >= 10 && hour < 15) return "noon";
    if (hour >= 15 && hour < 17) return "afternoon";
    if (hour >= 17 && hour < 19) return "evening";
    return "night";
  }

  function getCrowdScore(spot) {
    const bucket = getCurrentTimeBucket();
    const base = CONFIG.baseByTime?.[bucket] || 2;
    const adjustment = Number(spot.adjustment || 0);
    return Math.max(1, Math.min(4, base + adjustment));
  }

  function getCrowdLabel(score) {
    return getText(`crowd${score}`);
  }

  function getCategoryLabel(category) {
    return getText(category || "all");
  }

  function getTopReason(score) {
    if (score <= 1) return getText("topReasonGood");
    if (score === 2) return getText("topReasonOkay");
    return getText("topReasonBusy");
  }

  function matchesFilter(spot) {
    if (state.activeFilter === "all") return true;
    return spot.category === state.activeFilter;
  }

  function normalize(value) {
    return String(value || "").trim().toLowerCase();
  }

  function matchesSearch(spot, term) {
    const q = normalize(term);
    if (!q) return true;

    const values = [
      getSpotText(spot.name),
      getSpotText(spot.area),
      ...(spot.keywords || [])
    ];

    return values.some((v) => normalize(v).includes(q));
  }

  function getFilteredSpots() {
    return SPOTS
      .filter(matchesFilter)
      .map((spot) => ({
        ...spot,
        crowdScore: getCrowdScore(spot)
      }))
      .sort((a, b) => {
        if (a.crowdScore !== b.crowdScore) return a.crowdScore - b.crowdScore;
        return getSpotText(a.name).localeCompare(getSpotText(b.name));
      });
  }

  function getSuggestions(term) {
    const q = normalize(term);
    if (!q) return [];

    return SPOTS
      .filter((spot) => matchesSearch(spot, q))
      .slice(0, 6);
  }

  function renderStaticText() {
    els.textNodes.forEach((node) => {
      const key = node.getAttribute("data-crowd-text");
      node.textContent = getText(key);
    });

    if (els.searchInput) {
      els.searchInput.placeholder = getText("searchPlaceholder");
    }

    const filterMap = {
      all: "all",
      popular: "popular",
      quiet: "quiet",
      night: "night",
      walk: "walk"
    };

    els.filters.forEach((btn) => {
      const key = filterMap[btn.dataset.filter] || "all";
      btn.textContent = getText(key);
    });

    els.langButtons.forEach((btn) => {
      const isActive = btn.dataset.lang === state.lang;
      btn.classList.toggle("is-active", isActive);
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  function renderTopList() {
    if (!els.topList) return;

    const spots = getFilteredSpots().slice(0, 5);

    els.topList.innerHTML = spots
      .map((spot) => {
        const name = escapeHtml(getSpotText(spot.name));
        const area = escapeHtml(getSpotText(spot.area));
        const bestTime = escapeHtml(getSpotText(spot.bestTime));
        const tip = escapeHtml(getTopReason(spot.crowdScore));
        const category = escapeHtml(getCategoryLabel(spot.category));
        const crowd = escapeHtml(getCrowdLabel(spot.crowdScore));

        return `
          <article class="crowd-card" data-spot-id="${escapeHtml(spot.id)}">
            <div class="crowd-card-top">
              <span class="crowd-chip">${category}</span>
              <span class="crowd-badge crowd-level-${spot.crowdScore}">${crowd}</span>
            </div>

            <h3 class="crowd-card-title">${name}</h3>
            <p class="crowd-card-area">${area}</p>

            <div class="crowd-card-meta">
              <div class="crowd-card-row">
                <span class="crowd-card-label">${escapeHtml(getText("bestTime"))}</span>
                <span class="crowd-card-value">${bestTime}</span>
              </div>
            </div>

            <p class="crowd-card-tip">${tip}</p>

            <button type="button" class="crowd-card-button" data-select-spot="${escapeHtml(spot.id)}">
              ${escapeHtml(getText("route"))}
            </button>
          </article>
        `;
      })
      .join("");
  }

  function renderSuggestions() {
    if (!els.suggestions) return;

    const suggestions = getSuggestions(state.searchTerm);

    if (!state.searchTerm.trim()) {
      els.suggestions.innerHTML = "";
      els.suggestions.classList.remove("is-visible");
      return;
    }

    if (!suggestions.length) {
      els.suggestions.innerHTML = `<div class="crowd-suggestion-empty">No result</div>`;
      els.suggestions.classList.add("is-visible");
      return;
    }

    els.suggestions.innerHTML = suggestions
      .map((spot) => {
        const name = escapeHtml(getSpotText(spot.name));
        const area = escapeHtml(getSpotText(spot.area));
        return `
          <button type="button" class="crowd-suggestion-item" data-suggestion-id="${escapeHtml(spot.id)}">
            <span class="crowd-suggestion-name">${name}</span>
            <span class="crowd-suggestion-area">${area}</span>
          </button>
        `;
      })
      .join("");

    els.suggestions.classList.add("is-visible");
  }

  function renderResult(spot) {
    if (!els.result) return;

    if (!spot) {
      els.result.innerHTML = `
        <div class="crowd-empty">${escapeHtml(getText("empty"))}</div>
      `;
      return;
    }

    const crowdScore = getCrowdScore(spot);
    const crowdLabel = getCrowdLabel(crowdScore);

    els.result.innerHTML = `
      <article class="crowd-detail">
        <div class="crowd-detail-top">
          <div>
            <p class="crowd-detail-area">${escapeHtml(getSpotText(spot.area))}</p>
            <h3 class="crowd-detail-title">${escapeHtml(getSpotText(spot.name))}</h3>
          </div>
          <span class="crowd-badge crowd-level-${crowdScore}">${escapeHtml(crowdLabel)}</span>
        </div>

        <div class="crowd-detail-grid">
          <div class="crowd-detail-box">
            <p class="crowd-detail-label">${escapeHtml(getText("statusNow"))}</p>
            <p class="crowd-detail-value">${escapeHtml(crowdLabel)}</p>
          </div>

          <div class="crowd-detail-box">
            <p class="crowd-detail-label">${escapeHtml(getText("bestTime"))}</p>
            <p class="crowd-detail-value">${escapeHtml(getSpotText(spot.bestTime))}</p>
          </div>

          <div class="crowd-detail-box">
            <p class="crowd-detail-label">${escapeHtml(getText("category"))}</p>
            <p class="crowd-detail-value">${escapeHtml(getCategoryLabel(spot.category))}</p>
          </div>
        </div>

        <div class="crowd-detail-note">
          <p class="crowd-detail-label">${escapeHtml(getText("tip"))}</p>
          <p class="crowd-detail-text">${escapeHtml(getSpotText(spot.tip))}</p>
        </div>
      </article>
    `;
  }

  function findCurrentSpotFromSearchTerm() {
    return SPOTS.find((spot) => {
      return normalize(getSpotText(spot.name)) === normalize(state.searchTerm);
    });
  }

  function selectSpotById(id) {
    const spot = SPOTS.find((item) => item.id === id);
    if (!spot) return;

    state.searchTerm = getSpotText(spot.name);
    if (els.searchInput) els.searchInput.value = state.searchTerm;

    renderSuggestions();
    if (els.suggestions) {
      els.suggestions.classList.remove("is-visible");
    }
    renderResult(spot);
  }

  function applyLanguage(lang) {
  state.lang = normalizeLang(lang);

  try {
    localStorage.setItem(STORAGE_KEY, state.lang);
    localStorage.setItem("siteLanguage", state.lang === "jp" ? "ja" : state.lang === "kr" ? "ko" : "en");
    localStorage.setItem("kyotoSakuraGuideLang", state.lang);
  } catch (error) {}

  document.documentElement.setAttribute("lang", state.lang === "jp" ? "ja" : state.lang);

  renderStaticText();
  renderTopList();
  renderSuggestions();

  const currentSpot = findCurrentSpotFromSearchTerm();
  renderResult(currentSpot || null);
}

  function bindEvents() {
    if (els.searchInput) {
      els.searchInput.addEventListener("input", (e) => {
        state.searchTerm = e.target.value || "";
        renderSuggestions();

        const exact = SPOTS.find((spot) => {
          return matchesSearch(spot, state.searchTerm)
            && normalize(getSpotText(spot.name)) === normalize(state.searchTerm);
        });

        if (exact) renderResult(exact);
        else if (!state.searchTerm.trim()) renderResult(null);
      });

      els.searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          const suggestions = getSuggestions(state.searchTerm);
          if (suggestions[0]) {
            selectSpotById(suggestions[0].id);
          }
        }
      });
    }

    if (els.clearBtn) {
      els.clearBtn.addEventListener("click", () => {
        state.searchTerm = "";
        if (els.searchInput) els.searchInput.value = "";
        renderSuggestions();
        renderResult(null);
      });
    }

    if (els.suggestions) {
      els.suggestions.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-suggestion-id]");
        if (!btn) return;
        selectSpotById(btn.dataset.suggestionId);
      });
    }

    if (els.topList) {
      els.topList.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-select-spot]");
        if (!btn) return;
        selectSpotById(btn.dataset.selectSpot);
      });
    }

    els.filters.forEach((btn) => {
      btn.addEventListener("click", () => {
        state.activeFilter = btn.dataset.filter || "all";

        els.filters.forEach((item) => item.classList.remove("is-active"));
        btn.classList.add("is-active");

        renderTopList();
      });
    });

    els.langButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        applyLanguage(btn.dataset.lang || "jp");
      });
    });

    window.addEventListener("app:languagechange", (e) => {
      const lang = e.detail?.lang || getInitialLang();
      applyLanguage(lang);
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".crowd-search-box")) {
        if (els.suggestions) {
          els.suggestions.classList.remove("is-visible");
        }
      }
    });
  }

  function init() {
    applyLanguage(state.lang);
    renderResult(null);
    bindEvents();
  }

  init();
})();
