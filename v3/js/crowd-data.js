window.CROWD_UI_TEXT = {
  jp: {
    eyebrow: "Smart Kyoto Guide",
    title: "今行くのにおすすめのスポットを探す",
    desc: "行きたい場所を検索するか、今の時間に合ったおすすめスポットをご確認ください。",
    searchLabel: "どこに行きたいですか？",
    topTitle: "Top Picks Right Now",
    topDesc: "現在の時間帯と混雑バランスをもとにしたおすすめです。",
    resultTitle: "Search Result",
    resultDesc: "検索したスポットの詳細ガイドです。",
    empty: "スポット名を検索すると、現在のおすすめ状況が表示されます。",
    statusNow: "現在",
    bestTime: "おすすめ時間",
    category: "カテゴリ",
    tip: "ポイント",
    route: "Route",
    popular: "人気スポット",
    quiet: "比較的ゆったり",
    night: "夜におすすめ",
    walk: "散策向き",
    all: "すべて",
    crowd1: "余裕",
    crowd2: "普通",
    crowd3: "混雑",
    crowd4: "かなり混雑",
    topReasonGood: "今の時間帯でも比較的動きやすいスポットです。",
    topReasonOkay: "やや人はいますが、まだ楽しみやすいスポットです。",
    topReasonBusy: "有名エリアのため混雑しやすいですが、時間を選べば楽しめます。",
    searchPlaceholder: "清水寺 / Kiyomizu / 기요미즈"
  },
  en: {
    eyebrow: "Smart Kyoto Guide",
    title: "Find the best place to go right now",
    desc: "Search the place you want to visit, or explore the best recommendations for this moment.",
    searchLabel: "Where do you want to go?",
    topTitle: "Top Picks Right Now",
    topDesc: "Best options based on crowd balance and timing.",
    resultTitle: "Search Result",
    resultDesc: "Detailed guide for the place you searched.",
    empty: "Search for a place to see the current guide.",
    statusNow: "Now",
    bestTime: "Best time",
    category: "Category",
    tip: "Tip",
    route: "Route",
    popular: "Popular",
    quiet: "Relaxed",
    night: "Night",
    walk: "Walk",
    all: "All",
    crowd1: "Easy",
    crowd2: "Moderate",
    crowd3: "Busy",
    crowd4: "Very Busy",
    topReasonGood: "A relatively comfortable option for this time of day.",
    topReasonOkay: "A bit lively, but still manageable right now.",
    topReasonBusy: "Popular and often crowded, but still worth timing carefully.",
    searchPlaceholder: "Kiyomizu / 清水寺 / 기요미즈"
  },
  kr: {
    eyebrow: "Smart Kyoto Guide",
    title: "지금 가기 좋은 교토 스팟 찾기",
    desc: "가고 싶은 장소를 검색하거나, 지금 이 시간에 맞는 추천 스팟을 확인해보세요.",
    searchLabel: "어디에 가고 싶으신가요?",
    topTitle: "Top Picks Right Now",
    topDesc: "현재 시간대와 혼잡 밸런스를 기준으로 추천합니다.",
    resultTitle: "Search Result",
    resultDesc: "검색한 장소의 상세 가이드입니다.",
    empty: "장소를 검색하면 현재 추천 상황이 표시됩니다.",
    statusNow: "지금",
    bestTime: "추천 시간",
    category: "카테고리",
    tip: "포인트",
    route: "Route",
    popular: "인기 스팟",
    quiet: "비교적 한산",
    night: "야간 추천",
    walk: "산책 추천",
    all: "전체",
    crowd1: "여유",
    crowd2: "보통",
    crowd3: "혼잡",
    crowd4: "매우 혼잡",
    topReasonGood: "지금 시간대에도 비교적 이동하기 편한 스팟입니다.",
    topReasonOkay: "조금 사람은 있지만 아직 즐기기 괜찮은 스팟입니다.",
    topReasonBusy: "인기 지역이라 붐비기 쉽지만 시간대를 잘 맞추면 좋습니다.",
    searchPlaceholder: "기요미즈 / 清水寺 / Kiyomizu"
  }
};

window.CROWD_CONFIG = {
  baseByTime: {
    earlyMorning: 1, // 6-8
    morning: 2,      // 8-10
    noon: 3,         // 10-15
    afternoon: 2,    // 15-17
    evening: 2,      // 17-19
    night: 1         // 19+
  }
};

window.CROWD_SPOTS = [
  {
    id: "kiyomizu",
    name: { jp: "清水寺", en: "Kiyomizu-dera", kr: "기요미즈데라" },
    area: { jp: "東山", en: "Higashiyama", kr: "히가시야마" },
    adjustment: 1,
    category: "popular",
    bestTime: { jp: "7:00–8:30 / 17:30以降", en: "7:00–8:30 / after 17:30", kr: "7:00–8:30 / 17:30 이후" },
    tip: {
      jp: "午前後半から一気に混みやすく、昼は写真撮影も移動も混雑しやすいです。",
      en: "Crowds rise quickly from late morning, and midday can be difficult for both photos and movement.",
      kr: "오전 후반부터 급격히 붐비며, 점심 시간대에는 사진도 이동도 힘들 수 있습니다."
    },
    keywords: ["kiyomizu", "kiyomizudera", "清水寺", "기요미즈", "기요미즈데라", "히가시야마"]
  },
  {
    id: "gion",
    name: { jp: "祇園", en: "Gion", kr: "기온" },
    area: { jp: "祇園", en: "Gion", kr: "기온" },
    adjustment: 1,
    category: "popular",
    bestTime: { jp: "8:00前 / 18:00以降", en: "before 8:00 / after 18:00", kr: "8시 이전 / 18시 이후" },
    tip: {
      jp: "昼は人通りが多く、写真をゆっくり撮りたい場合は朝か夕方以降がおすすめです。",
      en: "Daytime gets very busy. Early morning or evening is better for photos.",
      kr: "낮에는 유동 인구가 많아서 사진을 천천히 찍으려면 아침이나 저녁 이후가 좋습니다."
    },
    keywords: ["gion", "祇園", "기온"]
  },
  {
    id: "philosophers-path",
    name: { jp: "哲学の道", en: "Philosopher's Path", kr: "철학의 길" },
    area: { jp: "左京区", en: "Sakyo", kr: "사쿄구" },
    adjustment: 0,
    category: "walk",
    bestTime: { jp: "7:30–9:00 / 16:00以降", en: "7:30–9:00 / after 16:00", kr: "7:30–9:00 / 16:00 이후" },
    tip: {
      jp: "歩きやすいですが、桜ピーク時は人気区間に人が集中しやすいです。",
      en: "Pleasant for walking, but popular sections can still get crowded during peak bloom.",
      kr: "걷기 좋지만, 벚꽃 피크 때는 인기 구간에 사람이 몰릴 수 있습니다."
    },
    keywords: ["philosopher", "philosophers path", "哲学の道", "철학의 길"]
  },
  {
    id: "nanzenji",
    name: { jp: "南禅寺", en: "Nanzen-ji", kr: "난젠지" },
    area: { jp: "左京区", en: "Sakyo", kr: "사쿄구" },
    adjustment: -1,
    category: "quiet",
    bestTime: { jp: "9:00前 / 15:30以降", en: "before 9:00 / after 15:30", kr: "9시 이전 / 15:30 이후" },
    tip: {
      jp: "有名スポットに比べると落ち着きやすく、静かな雰囲気を楽しみやすいです。",
      en: "Compared with major hotspots, this area often feels calmer and more spacious.",
      kr: "대표적인 인기 명소들에 비해 비교적 차분하고 여유로운 분위기를 즐기기 좋습니다."
    },
    keywords: ["nanzenji", "南禅寺", "난젠지"]
  },
  {
    id: "heian-jingu",
    name: { jp: "平安神宮", en: "Heian Shrine", kr: "헤이안진구" },
    area: { jp: "岡崎", en: "Okazaki", kr: "오카자키" },
    adjustment: 0,
    category: "popular",
    bestTime: { jp: "8:00–9:30 / 16:00以降", en: "8:00–9:30 / after 16:00", kr: "8:00–9:30 / 16:00 이후" },
    tip: {
      jp: "周辺イベントや観光動線の影響を受けやすいため、昼前後は混雑しやすいです。",
      en: "Nearby events and major sightseeing flow often make midday busier here.",
      kr: "주변 이벤트와 주요 관광 동선의 영향으로 점심 전후에 붐비기 쉽습니다."
    },
    keywords: ["heian", "heian shrine", "平安神宮", "헤이안진구"]
  },
  {
    id: "kamogawa",
    name: { jp: "鴨川", en: "Kamogawa", kr: "가모가와" },
    area: { jp: "中心部", en: "Central Kyoto", kr: "교토 중심부" },
    adjustment: -1,
    category: "walk",
    bestTime: { jp: "15:00–18:00", en: "15:00–18:00", kr: "15:00–18:00" },
    tip: {
      jp: "寺社よりも分散しやすく、比較的ゆったり春の空気を楽しみやすいです。",
      en: "More spread out than temple areas, making it easier to enjoy the season at a relaxed pace.",
      kr: "사찰 지역보다 동선이 분산되어 비교적 여유롭게 봄 분위기를 즐기기 좋습니다."
    },
    keywords: ["kamogawa", "kamo river", "鴨川", "가모가와", "카모가와"]
  },
  {
    id: "maruyama",
    name: { jp: "円山公園", en: "Maruyama Park", kr: "마루야마 공원" },
    area: { jp: "東山", en: "Higashiyama", kr: "히가시야마" },
    adjustment: 1,
    category: "night",
    bestTime: { jp: "朝早め / 夜ライトアップ", en: "early morning / night illumination", kr: "이른 아침 / 야간 라이트업" },
    tip: {
      jp: "昼はかなり賑わいやすく、夜はライトアップ目当てで再び人が増えることがあります。",
      en: "Busy during the day, and crowds can build again at night for illuminations.",
      kr: "낮에도 붐비고, 밤에는 라이트업 때문에 다시 사람이 늘어날 수 있습니다."
    },
    keywords: ["maruyama", "円山公園", "마루야마", "마루야마 공원"]
  },
  {
    id: "yasaka-shrine",
    name: { jp: "八坂神社", en: "Yasaka Shrine", kr: "야사카 신사" },
    area: { jp: "祇園", en: "Gion", kr: "기온" },
    adjustment: 1,
    category: "night",
    bestTime: { jp: "8:00前 / 18:00以降", en: "before 8:00 / after 18:00", kr: "8시 이전 / 18시 이후" },
    tip: {
      jp: "祇園動線と重なるため、日中は特に人が集まりやすいエリアです。",
      en: "This area connects with the main Gion flow, so daytime foot traffic is heavy.",
      kr: "기온 주요 동선과 겹쳐서 낮 시간대 유동 인구가 특히 많은 편입니다."
    },
    keywords: ["yasaka", "yasaka shrine", "八坂神社", "야사카", "야사카 신사"]
  },
  {
    id: "arashiyama",
    name: { jp: "嵐山", en: "Arashiyama", kr: "아라시야마" },
    area: { jp: "嵐山", en: "Arashiyama", kr: "아라시야마" },
    adjustment: 1,
    category: "popular",
    bestTime: { jp: "7:00–8:30", en: "7:00–8:30", kr: "7:00–8:30" },
    tip: {
      jp: "朝から動く人が多く、人気スポット全体として早い時間から混みやすいです。",
      en: "Many visitors start early here, so crowds build from the morning.",
      kr: "아침부터 움직이는 관광객이 많아 이른 시간부터 붐비기 쉬운 지역입니다."
    },
    keywords: ["arashiyama", "嵐山", "아라시야마"]
  },
  {
    id: "togetsukyo",
    name: { jp: "渡月橋", en: "Togetsukyo Bridge", kr: "도게츠교" },
    area: { jp: "嵐山", en: "Arashiyama", kr: "아라시야마" },
    adjustment: 1,
    category: "popular",
    bestTime: { jp: "朝早め", en: "early morning", kr: "이른 아침" },
    tip: {
      jp: "橋周辺は写真待ちや立ち止まりが発生しやすく、昼は特に混雑感が強いです。",
      en: "The bridge area gets photo bottlenecks, especially around midday.",
      kr: "다리 주변은 사진 때문에 멈춰서는 사람이 많아 점심 시간대 체감 혼잡이 큽니다."
    },
    keywords: ["togetsukyo", "渡月橋", "도게츠교"]
  },
  {
    id: "sagano-bamboo",
    name: { jp: "竹林の小径", en: "Bamboo Grove", kr: "대나무숲" },
    area: { jp: "嵐山", en: "Arashiyama", kr: "아라시야마" },
    adjustment: 1,
    category: "walk",
    bestTime: { jp: "7:00前", en: "before 7:00", kr: "7시 이전" },
    tip: {
      jp: "細い導線のため、人が増えると一気に歩きづらくなります。",
      en: "Because the path is narrow, it feels crowded very quickly once people arrive.",
      kr: "동선이 좁아서 사람이 몰리면 금방 걷기 힘들어집니다."
    },
    keywords: ["bamboo", "bamboo grove", "竹林", "竹林の小径", "대나무숲"]
  },
  {
    id: "nijo-castle",
    name: { jp: "二条城", en: "Nijo Castle", kr: "니조성" },
    area: { jp: "中京区", en: "Nakagyo", kr: "나카교구" },
    adjustment: 0,
    category: "night",
    bestTime: { jp: "開場直後 / 夜イベント", en: "right after opening / night event", kr: "오픈 직후 / 야간 이벤트" },
    tip: {
      jp: "イベント時は夜にも人が集中しやすいので、時間帯選びが重要です。",
      en: "During special events, nighttime can also become crowded, so timing matters.",
      kr: "이벤트 기간에는 밤에도 사람이 몰릴 수 있어 시간대 선택이 중요합니다."
    },
    keywords: ["nijo", "nijo castle", "二条城", "니조성"]
  },
  {
    id: "okazaki-canal",
    name: { jp: "岡崎疏水", en: "Okazaki Canal", kr: "오카자키 소수" },
    area: { jp: "岡崎", en: "Okazaki", kr: "오카자키" },
    adjustment: 0,
    category: "walk",
    bestTime: { jp: "9:00前 / 16:00以降", en: "before 9:00 / after 16:00", kr: "9시 이전 / 16시 이후" },
    tip: {
      jp: "景色はとても良いですが、見頃時は写真目的の人が増えやすいです。",
      en: "Beautiful scenery, but photo-seekers can make the area busier during peak bloom.",
      kr: "풍경은 정말 좋지만, 절정 시기에는 사진을 찍으려는 사람들로 붐빌 수 있습니다."
    },
    keywords: ["okazaki", "okazaki canal", "岡崎疏水", "오카자키", "오카자키 소수"]
  },
  {
    id: "chionin",
    name: { jp: "知恩院", en: "Chion-in", kr: "치온인" },
    area: { jp: "東山", en: "Higashiyama", kr: "히가시야마" },
    adjustment: 0,
    category: "quiet",
    bestTime: { jp: "8:00–9:30 / 16:00以降", en: "8:00–9:30 / after 16:00", kr: "8:00–9:30 / 16:00 이후" },
    tip: {
      jp: "周辺有名エリアよりは落ち着きやすいですが、近隣動線の影響は受けます。",
      en: "Often calmer than nearby hotspots, though still affected by surrounding visitor flow.",
      kr: "주변 인기 지역보다 비교적 차분하지만, 인근 동선의 영향은 받습니다."
    },
    keywords: ["chionin", "chion-in", "知恩院", "치온인"]
  },
  {
    id: "kodai-ji",
    name: { jp: "高台寺", en: "Kodai-ji", kr: "고다이지" },
    area: { jp: "東山", en: "Higashiyama", kr: "히가시야마" },
    adjustment: 0,
    category: "night",
    bestTime: { jp: "朝 / 夜拝観", en: "morning / night visit", kr: "아침 / 야간 관람" },
    tip: {
      jp: "夜間特別拝観がある日は夜も混みやすいため、早め行動がおすすめです。",
      en: "When there is a special night event, crowds can build again after sunset.",
      kr: "야간 특별관람이 있는 날은 밤에도 다시 붐빌 수 있어 조금 일찍 움직이는 게 좋습니다."
    },
    keywords: ["kodai", "kodaiji", "高台寺", "고다이지"]
  },
  {
    id: "toji",
    name: { jp: "東寺", en: "To-ji", kr: "도지" },
    area: { jp: "南区", en: "Minami", kr: "미나미구" },
    adjustment: 0,
    category: "night",
    bestTime: { jp: "朝 / 夜ライトアップ", en: "morning / night illumination", kr: "아침 / 야간 라이트업" },
    tip: {
      jp: "ライトアップ日は夜も人気が高く、通常日より人が増えやすいです。",
      en: "On illumination days, nighttime can be much busier than usual.",
      kr: "라이트업 있는 날은 평소보다 밤 시간대 혼잡도가 높아질 수 있습니다."
    },
    keywords: ["toji", "to-ji", "東寺", "도지"]
  },
  {
    id: "hirano-shrine",
    name: { jp: "平野神社", en: "Hirano Shrine", kr: "히라노 신사" },
    area: { jp: "北区", en: "Kita", kr: "기타구" },
    adjustment: 0,
    category: "popular",
    bestTime: { jp: "朝早め", en: "early morning", kr: "이른 아침" },
    tip: {
      jp: "桜の名所として知られており、見頃時は朝から人が集まりやすいです。",
      en: "Known as a cherry blossom spot, it can get busy early during peak bloom.",
      kr: "벚꽃 명소로 유명해서 만개 시기에는 아침부터 사람이 모이기 쉽습니다."
    },
    keywords: ["hirano", "hirano shrine", "平野神社", "히라노", "히라노 신사"]
  },
  {
    id: "keage-incline",
    name: { jp: "蹴上インクライン", en: "Keage Incline", kr: "게아게 인클라인" },
    area: { jp: "東山", en: "Higashiyama", kr: "히가시야마" },
    adjustment: 1,
    category: "popular",
    bestTime: { jp: "7:00–8:00", en: "7:00–8:00", kr: "7:00–8:00" },
    tip: {
      jp: "写真映えスポットのため、見頃は朝から撮影客が集中しやすいです。",
      en: "A very photogenic place, so visitors gather early for pictures.",
      kr: "사진 명소라 절정 시기에는 아침부터 촬영객이 몰리기 쉽습니다."
    },
    keywords: ["keage", "keage incline", "蹴上インクライン", "게아게", "인클라인"]
  },
  {
    id: "fushimi-inari",
    name: { jp: "伏見稲荷大社", en: "Fushimi Inari", kr: "후시미 이나리" },
    area: { jp: "伏見", en: "Fushimi", kr: "후시미" },
    adjustment: 1,
    category: "popular",
    bestTime: { jp: "7:00前 / 夕方遅め", en: "before 7:00 / later evening", kr: "7시 이전 / 늦은 저녁" },
    tip: {
      jp: "桜メインではなくても常に人気が高く、昼は特に混雑しやすいです。",
      en: "Even outside sakura focus, this is always popular and often crowded in the daytime.",
      kr: "벚꽃 메인이 아니어도 원래 인기가 많아 낮에는 항상 붐비기 쉬운 곳입니다."
    },
    keywords: ["fushimi", "fushimi inari", "伏見稲荷", "후시미", "후시미 이나리"]
  }
];
