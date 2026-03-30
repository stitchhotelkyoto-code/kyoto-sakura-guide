(function () {
  const STORAGE_KEY = "siteLang";

  const CROWD_PAGE_UI_TEXT = {
    jp: {
      heroEyebrow: "LIVE CROWD",
      heroTitle: "Live Crowd Guide",
      heroDesc: "行きたい場所を検索すると、混雑傾向・おすすめ時間帯・回りやすい代替候補を確認できます。",
      searchLabel: "どこに行きたいですか？",
      searchPlaceholder: "清水寺 / 祇園 / 二条城",
      filterAll: "すべて",
      filterPopular: "人気スポット",
      filterQuiet: "比較的ゆったり",
      filterNight: "夜におすすめ",
      filterWalk: "散策向き",
      topTitle: "Top Picks Right Now",
      topDesc: "現在の時間帯と混雑バランスをもとにしたおすすめです。",
      resultTitle: "Search Result",
      resultDesc: "検索したスポットの詳細ガイドです。",
      empty: "スポット名を検索すると、現在のおすすめ状況が表示されます。"
    },
    en: {
      heroEyebrow: "LIVE CROWD",
      heroTitle: "Live Crowd Guide",
      heroDesc: "Search where you want to go and quickly check crowd trends, recommended time slots, and easier alternatives.",
      searchLabel: "Where would you like to go?",
      searchPlaceholder: "Kiyomizu / Gion / Nijo Castle",
      filterAll: "All",
      filterPopular: "Popular Spots",
      filterQuiet: "Less Busy",
      filterNight: "Good at Night",
      filterWalk: "Walk-Friendly",
      topTitle: "Top Picks Right Now",
      topDesc: "Recommended spots based on the current time and crowd balance.",
      resultTitle: "Search Result",
      resultDesc: "Detailed guide for the place you searched.",
      empty: "Search by spot name, area, or vibe to see the current recommendation."
    },
    kr: {
      heroEyebrow: "LIVE CROWD",
      heroTitle: "Live Crowd Guide",
      heroDesc: "가고 싶은 장소를 검색하면 혼잡도 경향, 추천 시간대, 더 둘러보기 쉬운 대안을 빠르게 확인할 수 있습니다.",
      searchLabel: "어디로 가고 싶으신가요?",
      searchPlaceholder: "기요미즈데라 / 기온 / 니조성",
      filterAll: "전체",
      filterPopular: "인기 스팟",
      filterQuiet: "비교적 여유",
      filterNight: "밤에 추천",
      filterWalk: "산책용",
      topTitle: "지금 추천 스팟",
      topDesc: "현재 시간대와 혼잡도 균형을 기준으로 추천하는 장소입니다.",
      resultTitle: "검색 결과",
      resultDesc: "검색한 장소의 상세 가이드입니다.",
      empty: "스팟 이름, 지역, 분위기로 검색하면 현재 추천 상황이 표시됩니다."
    }
  };

  function normalizeLang(lang) {
    if (lang === "ko") return "kr";
    if (lang === "jp" || lang === "en" || lang === "kr") return lang;
    return "jp";
  }

  function getSavedLang() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return normalizeLang(saved);
    } catch (error) {}

    const htmlLang = document.documentElement.getAttribute("lang");
    if (htmlLang) return normalizeLang(htmlLang);

    return "jp";
  }

  function saveLang(lang) {
    const normalized = normalizeLang(lang);
    try {
      localStorage.setItem(STORAGE_KEY, normalized);
    } catch (error) {}
  }

  function setHtmlLang(lang) {
    document.documentElement.setAttribute("lang", normalizeLang(lang));
  }

  function syncLangButtons(lang) {
    const normalized = normalizeLang(lang);

    document.querySelectorAll(".lang-btn").forEach((btn) => {
      const isActive = btn.dataset.lang === normalized;
      btn.classList.toggle("is-active", isActive);
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  function applyCrowdStaticUIText(lang) {
    const normalized = normalizeLang(lang);
    const dict = CROWD_PAGE_UI_TEXT[normalized] || CROWD_PAGE_UI_TEXT.jp;

    document.querySelectorAll("[data-crowd-ui]").forEach((el) => {
      const key = el.getAttribute("data-crowd-ui");
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    document.querySelectorAll("[data-crowd-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-crowd-placeholder");
      if (dict[key]) {
        el.setAttribute("placeholder", dict[key]);
      }
    });
  }

  function syncWindowCrowdUIText(lang) {
    const normalized = normalizeLang(lang);

    if (!window.CROWD_UI_TEXT || !window.CROWD_UI_TEXT[normalized]) return;

    window.__CURRENT_CROWD_LANG__ = normalized;
  }

  function notifyLanguageChange(lang) {
    const normalized = normalizeLang(lang);

    window.dispatchEvent(
      new CustomEvent("app:languagechange", {
        detail: { lang: normalized }
      })
    );

    document.dispatchEvent(
      new CustomEvent("app:languagechange", {
        detail: { lang: normalized }
      })
    );
  }

  function applyLang(lang) {
    const normalized = normalizeLang(lang);
    saveLang(normalized);
    setHtmlLang(normalized);
    syncLangButtons(normalized);
    applyCrowdStaticUIText(normalized);
    syncWindowCrowdUIText(normalized);
    notifyLanguageChange(normalized);
  }

  function bindLangButtons() {
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      if (btn.dataset.crowdLangBound === "true") return;

      btn.dataset.crowdLangBound = "true";

      btn.addEventListener("click", function () {
        const nextLang = normalizeLang(btn.dataset.lang || "jp");
        applyLang(nextLang);

        setTimeout(() => {
          window.location.reload();
        }, 10);
      });
    });
  }

  function initCrowdPageLang() {
    const initialLang = getSavedLang();
    applyLang(initialLang);
    bindLangButtons();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCrowdPageLang);
  } else {
    initCrowdPageLang();
  }
})();
