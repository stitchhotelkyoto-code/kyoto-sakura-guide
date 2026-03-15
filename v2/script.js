document.addEventListener("DOMContentLoaded", () => {
  console.log("Kyoto Sakura Guide script loaded.");

  let currentLanguage = localStorage.getItem("siteLanguage") || "ko";
  let currentGuideLocation = null;
  let currentGuideStatusKey = "ai_status_default";

  /* =========================
     TRANSLATIONS
  ========================= */
  const translations = {
    ko: {
      page_title: "Kyoto Sakura Guide",
      brand: "Kyoto Sakura Guide",

      nav_sakura: "Sakura",
      nav_courses: "Courses",
      nav_food: "Food",
      nav_events: "Events",
      nav_ai: "AI Guide",
      nav_hotels: "Hotels",

      hero_title: "KYOTO",
      hero_subtitle: "SAKURA GUIDE",

      quick_menu_title: "Explore Kyoto",
      quick_sakura: "Sakura Spots",
      quick_courses: "Travel Courses",
      quick_food: "Food Guide",
      quick_events: "Events",
      quick_ai: "AI Guide",
      quick_hotels: "Hotels",

      sakura_eyebrow: "SAKURA HIGHLIGHTS",
      sakura_title: "Sakura Spots",
      sakura_desc: "교토의 대표 벚꽃 명소를 슬라이드 형식으로 소개합니다.",
      sakura_prev_aria: "이전 슬라이드",
      sakura_next_aria: "다음 슬라이드",

      sakura_slide_1_alt: "아라시야마 벚꽃 풍경",
      sakura_slide_1_tag: "#Arashiyama #KyotoSakura",
      sakura_slide_1_title: "아라시야마",
      sakura_slide_1_desc: "도게츠교와 강변 풍경, 산 전체를 물들이는 벚꽃이 어우러져 여유로운 봄 산책을 즐기기 좋은 곳입니다.",

      sakura_slide_2_alt: "철학의 길 벚꽃 풍경",
      sakura_slide_2_tag: "#PhilosophersPath #SpringWalk",
      sakura_slide_2_title: "철학의 길",
      sakura_slide_2_desc: "수로를 따라 벚꽃이 길게 이어지는 교토 대표 산책 코스로, 조용하고 감성적인 봄 분위기를 느끼기 좋습니다.",

      sakura_slide_3_alt: "기요미즈데라 벚꽃 풍경",
      sakura_slide_3_tag: "#KiyomizuDera #KyotoView",
      sakura_slide_3_title: "기요미즈데라",
      sakura_slide_3_desc: "전통 사찰과 교토 시내 전망, 화려한 벚꽃이 함께 어우러져 교토다운 풍경을 한눈에 즐길 수 있습니다.",

      sakura_slide_4_alt: "마루야마 공원 벚꽃 풍경",
      sakura_slide_4_tag: "#MaruyamaPark #Hanami",
      sakura_slide_4_title: "마루야마 공원",
      sakura_slide_4_desc: "벚꽃 시즌이면 교토 시민과 여행객이 모이는 대표적인 하나미 명소로, 활기찬 봄 분위기를 느낄 수 있습니다.",

      sakura_slide_5_alt: "헤이안 신궁 벚꽃 풍경",
      sakura_slide_5_tag: "#HeianShrine #WeepingSakura",
      sakura_slide_5_title: "헤이안 신궁",
      sakura_slide_5_desc: "아름다운 수양벚꽃으로 유명하며, 넓은 경내와 전통 건축이 함께 어우러져 우아한 봄 풍경을 만듭니다.",

      sakura_slide_6_alt: "게아게 인클라인 벚꽃 풍경",
      sakura_slide_6_tag: "#KeageIncline #RailwaySakura",
      sakura_slide_6_title: "게아게 인클라인",
      sakura_slide_6_desc: "옛 철로 양옆으로 벚꽃이 터널처럼 이어져 사진 명소로 인기 있는 봄 시즌 대표 스팟입니다.",

      courses_eyebrow: "TRAVEL COURSES",
      courses_title: "Recommended Courses",
      courses_desc: "교토를 처음 방문하는 여행자부터 벚꽃 시즌 산책, 야경, 먹거리까지 다양한 스타일로 즐길 수 있는 추천 코스입니다.",
      course_route_label: "동선",

      course_1_alt: "클래식 교토 코스",
      course_1_label: "Classic Kyoto Course",
      course_1_title: "클래식 교토 코스",
      course_1_desc: "교토를 처음 방문하는 여행자에게 가장 추천되는 대표 코스입니다. 전통적인 거리 풍경과 사찰, 그리고 기온 거리까지 교토의 분위기를 하루에 경험할 수 있습니다.",
      course_1_meta_1: "소요 시간 : 약 4 ~ 6시간",
      course_1_meta_2: "추천 시간 : 오전 ~ 오후",
      course_1_meta_3: "지역 : 히가시야마",
      course_1_route: "청수사 → 산넨자카 / 니넨자카 → 야사카 신사 → 기온 거리 → 카모 강",

      course_2_alt: "벚꽃 산책 코스",
      course_2_label: "Sakura Walk Course",
      course_2_title: "벚꽃 산책 코스",
      course_2_desc: "교토에서 가장 아름다운 벚꽃 산책 코스 중 하나입니다. 벚꽃이 흐드러지게 피는 길을 따라 산책하며 사찰과 정원을 함께 즐길 수 있습니다.",
      course_2_meta_1: "소요 시간 : 약 3 ~ 5시간",
      course_2_meta_2: "추천 시간 : 오전",
      course_2_meta_3: "지역 : 동부 교토",
      course_2_route: "철학의 길 → 난젠지 → 게아게 인클라인 → 헤이안 신궁",

      course_3_alt: "아라시야마 자연 코스",
      course_3_label: "Arashiyama Nature Course",
      course_3_title: "아라시야마 자연 코스",
      course_3_desc: "교토 서쪽에 위치한 아라시야마 지역의 자연과 전통 사찰을 함께 즐길 수 있는 코스입니다. 대나무 숲과 아름다운 강 풍경을 경험할 수 있습니다.",
      course_3_meta_1: "소요 시간 : 약 4 ~ 5시간",
      course_3_meta_2: "추천 시간 : 오전 ~ 낮",
      course_3_meta_3: "지역 : 아라시야마",
      course_3_route: "아라시야마 대나무 숲 → 텐류지 → 도게츠교 다리 → 아라시야마 강",

      course_4_alt: "교토 야경 산책 코스",
      course_4_label: "Kyoto Night Walk",
      course_4_title: "교토 야경 산책 코스",
      course_4_desc: "밤이 되면 더욱 아름다운 교토의 분위기를 느낄 수 있는 코스입니다. 전통 거리와 골목길을 따라 조용한 교토의 밤을 즐길 수 있습니다.",
      course_4_meta_1: "소요 시간 : 약 2 ~ 4시간",
      course_4_meta_2: "추천 시간 : 저녁",
      course_4_meta_3: "지역 : 기온 / 시조",
      course_4_route: "야사카 신사 → 기온 거리 → 시라카와 운하 → 폰토초 골목",

      course_5_alt: "교토 대표 사찰 코스",
      course_5_label: "Kyoto Temple Highlights",
      course_5_title: "교토 대표 사찰 코스",
      course_5_desc: "교토 북부 지역의 대표적인 사찰들을 둘러보는 코스입니다. 전통적인 일본 건축과 정원을 함께 감상할 수 있습니다.",
      course_5_meta_1: "소요 시간 : 약 4 ~ 6시간",
      course_5_meta_2: "추천 시간 : 오전 ~ 오후",
      course_5_meta_3: "지역 : 북부 교토",
      course_5_route: "금각사 → 료안지 → 닌나지 → 기타노 텐만구",

      course_6_alt: "교토 먹거리 쇼핑 코스",
      course_6_label: "Food & Market Course",
      course_6_title: "교토 먹거리 & 쇼핑 코스",
      course_6_desc: "교토의 다양한 길거리 음식과 전통 시장을 즐길 수 있는 코스입니다. 먹거리 탐방과 쇼핑을 함께 즐기기에 좋은 지역입니다.",
      course_6_meta_1: "소요 시간 : 약 3 ~ 5시간",
      course_6_meta_2: "추천 시간 : 점심 ~ 저녁",
      course_6_meta_3: "지역 : 니시키 / 가와라마치",
      course_6_route: "니시키 시장 → 테라마치 상점가 → 가와라마치 거리 → 카모 강",

      food_eyebrow: "FOOD GUIDE",
      food_title: "Food by Area",
      food_desc: "관광지 주변 맛집을 지역별로 확인할 수 있습니다.",
      food_toggle_symbol: "+",

      food_area_1_alt: "아라시야마 음식",
      food_area_1_title: "아라시야마",
      food_area_1_desc: "아라시야마 주변 추천 맛집",

      food_area_2_alt: "기온 음식",
      food_area_2_title: "기온",
      food_area_2_desc: "기온 주변 추천 맛집",

      food_area_3_alt: "기요미즈 음식",
      food_area_3_title: "기요미즈",
      food_area_3_desc: "청수사 주변 추천 맛집",

      food_area_4_alt: "가와라마치 음식",
      food_area_4_title: "가와라마치",
      food_area_4_desc: "카와라마치 주변 추천 맛집",

      food_place_1_1_name: "Arashiyama Yoshimura",
      food_place_1_1_tag: "소바",
      food_place_1_1_hours: "영업시간 11:00 – 17:00",
      food_place_1_1_menu: "대표메뉴 수제 소바",

      food_place_1_2_name: "% Arabica Kyoto Arashiyama",
      food_place_1_2_tag: "카페",
      food_place_1_2_hours: "영업시간 08:00 – 18:00",
      food_place_1_2_menu: "대표메뉴 카페라떼",

      food_place_1_3_name: "Unagi Hirokawa",
      food_place_1_3_tag: "장어",
      food_place_1_3_hours: "영업시간 11:00 – 14:30 / 17:00 – 20:00",
      food_place_1_3_menu: "대표메뉴 장어덮밥",

      food_place_2_1_name: "Gion Tanto",
      food_place_2_1_tag: "오코노미야키",
      food_place_2_1_hours: "영업시간 11:30 – 22:00",
      food_place_2_1_menu: "대표메뉴 오코노미야키",

      food_place_2_2_name: "Gion Tsujiri",
      food_place_2_2_tag: "디저트",
      food_place_2_2_hours: "영업시간 10:00 – 21:00",
      food_place_2_2_menu: "대표메뉴 말차 파르페",

      food_place_2_3_name: "Izuju Sushi",
      food_place_2_3_tag: "스시",
      food_place_2_3_hours: "영업시간 10:30 – 19:00",
      food_place_2_3_menu: "대표메뉴 교토식 스시",

      food_place_3_1_name: "Okutan Kiyomizu",
      food_place_3_1_tag: "두부",
      food_place_3_1_hours: "영업시간 11:00 – 16:30",
      food_place_3_1_menu: "대표메뉴 유도후",

      food_place_3_2_name: "Kiyomizu Junsei",
      food_place_3_2_tag: "두부",
      food_place_3_2_hours: "영업시간 11:00 – 17:00",
      food_place_3_2_menu: "대표메뉴 두부 코스",

      food_place_3_3_name: "Kasagiya",
      food_place_3_3_tag: "디저트",
      food_place_3_3_hours: "영업시간 11:00 – 17:30",
      food_place_3_3_menu: "대표메뉴 젠자이",

      food_place_4_1_name: "Nishiki Market",
      food_place_4_1_tag: "시장 음식",
      food_place_4_1_hours: "영업시간 10:00 – 18:00",
      food_place_4_1_menu: "대표메뉴 길거리 음식",

      food_place_4_2_name: "Menya Inoichi",
      food_place_4_2_tag: "라멘",
      food_place_4_2_hours: "영업시간 11:00 – 14:30 / 17:30 – 21:00",
      food_place_4_2_menu: "대표메뉴 라멘",

      food_place_4_3_name: "Gyukatsu Kyoto Katsugyu",
      food_place_4_3_tag: "규카츠",
      food_place_4_3_hours: "영업시간 11:00 – 22:00",
      food_place_4_3_menu: "대표메뉴 소고기 커틀릿",

      directions_label: "길찾기",

      food_ranking_label: "Food Picks",
      food_ranking_title: "스태프 추천 맛집",
      food_ranking_desc: "교토에서 즐길 수 있는 추천 음식점을 종류별로 정리했습니다.",
      food_ranking_board_left: "고기・일식 추천",
      food_ranking_board_right: "캐주얼・기타 추천",

      food_rank_1_category: "철판구이",
      food_rank_1_name: "モーリヤ祇園 / 철판구이",
      food_rank_1_desc: "특별한 날에 어울리는 분위기",
      food_rank_2_category: "철판구이",
      food_rank_2_name: "のいち / 철판구이",
      food_rank_2_desc: "차분하고 고급스러운 식사",
      food_rank_3_category: "야키토리",
      food_rank_3_name: "祇園刀 / 야키토리",
      food_rank_3_desc: "교토다운 분위기를 즐기기 좋은 곳",
      food_rank_4_category: "야키니쿠",
      food_rank_4_name: "一笑 / 야키니쿠",
      food_rank_4_desc: "진한 풍미의 고기 요리",
      food_rank_5_category: "야키니쿠",
      food_rank_5_name: "ひろ / 야키니쿠",
      food_rank_5_desc: "부담 없이 즐기기 좋은 인기점",
      food_rank_6_category: "야키니쿠",
      food_rank_6_name: "大黒戎先斗町店 / 야키니쿠",
      food_rank_6_desc: "폰토초 주변 식사 코스로 추천",
      food_rank_7_category: "야키니쿠",
      food_rank_7_name: "善 / 야키니쿠",
      food_rank_7_desc: "차분하게 고기 요리를 즐기기 좋은 곳",
      food_rank_8_category: "스시",
      food_rank_8_name: "寿司よし乃 / 스시",
      food_rank_8_desc: "정갈한 분위기의 추천점",
      food_rank_9_category: "스시",
      food_rank_9_name: "銀座おのでら / 스시",
      food_rank_9_desc: "특별한 식사에 잘 어울리는 고급감",
      food_rank_10_category: "스시",
      food_rank_10_name: "がんこ / 스시",
      food_rank_10_desc: "비교적 편하게 방문하기 좋은 곳",
      food_rank_11_category: "스시",
      food_rank_11_name: "杉玉 / 스시",
      food_rank_11_desc: "캐주얼하게 즐기기 좋은 분위기",
      food_rank_12_category: "스시",
      food_rank_12_name: "東寿司 / 스시",
      food_rank_12_desc: "로컬 감성으로 즐기기 좋은 선택",
      food_rank_13_category: "이자카야",
      food_rank_13_name: "うしのほね / 이자카야",
      food_rank_13_desc: "저녁 시간대에 분위기 좋게 즐기기 추천",
      food_rank_14_category: "이자카야",
      food_rank_14_name: "おにかい / 이자카야",
      food_rank_14_desc: "여행 중 가볍게 들르기 좋은 곳",
      food_rank_15_category: "이자카야",
      food_rank_15_name: "晴れ晴れ / 이자카야",
      food_rank_15_desc: "편안한 분위기의 저녁 식사",
      food_rank_16_category: "이자카야",
      food_rank_16_name: "雅 炭火焼鳥 / 이자카야",
      food_rank_16_desc: "숯불 향이 매력적인 메뉴",
      food_rank_17_category: "이자카야",
      food_rank_17_name: "炭火焼鶏おとなり / 이자카야",
      food_rank_17_desc: "현지 느낌으로 즐기기 좋은 곳",
      food_rank_18_category: "라멘",
      food_rank_18_name: "柳 札幌ラーメン / 라멘",
      food_rank_18_desc: "진한 국물 계열을 좋아한다면 추천",
      food_rank_19_category: "라멘",
      food_rank_19_name: "麺屋EDITION京都本店 / 라멘",
      food_rank_19_desc: "세련된 분위기의 인기 라멘점",
      food_rank_20_category: "라멘",
      food_rank_20_name: "ラーメンの坊歩 七条本店 / 라멘",
      food_rank_20_desc: "든든한 한 끼로 추천",
      food_rank_21_category: "라멘",
      food_rank_21_name: "優光 / 라멘",
      food_rank_21_desc: "여행객에게도 인기가 많은 편",
      food_rank_22_category: "중식",
      food_rank_22_name: "CHAO CHAO / 중식",
      food_rank_22_desc: "교자 메뉴로 유명한 캐주얼한 선택",
      food_rank_23_category: "중식",
      food_rank_23_name: "MING MING / 중식",
      food_rank_23_desc: "가볍게 즐기기 좋은 중화요리",
      food_rank_24_category: "샤브샤브",
      food_rank_24_name: "きんのぶたPREMIUM / 샤브샤브",
      food_rank_24_desc: "여러 명이 함께 가기 좋은 메뉴",
      food_rank_25_category: "비건",
      food_rank_25_name: "Veg Out / 비건",
      food_rank_25_desc: "건강하고 가벼운 식사를 원할 때 추천",
      food_rank_26_category: "비건",
      food_rank_26_name: "TU CASA - plant based & zero waste / 비건",
      food_rank_26_desc: "친환경 콘셉트가 돋보이는 공간",

      events_title: "진행중인 교토의 벚꽃 이벤트",
      events_prev_aria: "이전 이벤트",
      events_next_aria: "다음 이벤트",

      event_1_alt: "마루야마 공원 벚꽃 라이트업",
      event_1_title: "마루야마 공원 벚꽃 라이트업",
      event_1_date: "2026. 3. 25. - 2026. 4. 9.",
      event_1_place: "마루야마 공원",

      event_2_alt: "니조성 벚꽃 축제",
      event_2_title: "니조성 벚꽃 축제",
      event_2_date: "2026. 3. 20. - 2026. 4. 12.",
      event_2_place: "니조성",

      event_3_alt: "오카자키 소스이 벚꽃 라이트업",
      event_3_title: "오카자키 소스이 벚꽃 라이트업",
      event_3_date: "2026. 3. 28. - 2026. 4. 7.",
      event_3_place: "오카자키 소스이",

      event_4_alt: "기온 시라카와 벚꽃 라이트업",
      event_4_title: "기온 시라카와 벚꽃 라이트업",
      event_4_date: "2026. 3. 27. - 2026. 4. 6.",
      event_4_place: "기온 시라카와",

      event_5_alt: "도지 야간 벚꽃 특별관람",
      event_5_title: "도지 야간 벚꽃 특별관람",
      event_5_date: "2026. 3. 20. - 2026. 4. 12.",
      event_5_place: "도지",

      event_6_alt: "헤이안 신궁 벚꽃 콘서트",
      event_6_title: "헤이안 신궁 벚꽃 콘서트",
      event_6_date: "2026. 4. 3. - 2026. 4. 6.",
      event_6_place: "헤이안 신궁",

      event_7_alt: "히라노 신사 벚꽃 축제",
      event_7_title: "히라노 신사 벚꽃 축제",
      event_7_date: "2026. 4. 1. - 2026. 4. 14.",
      event_7_place: "히라노 신사",

      event_8_alt: "가메오카 벚꽃 위크",
      event_8_title: "가메오카 벚꽃 위크",
      event_8_date: "2026. 3. 28. - 2026. 4. 10.",
      event_8_place: "가메오카",

      event_9_alt: "기요미즈데라 봄 야간 특별관람",
      event_9_title: "기요미즈데라 봄 야간 특별관람",
      event_9_date: "2026. 3. 27. - 2026. 4. 5.",
      event_9_place: "기요미즈데라",

      event_10_alt: "고다이지 봄 라이트업",
      event_10_title: "고다이지 봄 라이트업",
      event_10_date: "2026. 3. 14. - 2026. 5. 6.",
      event_10_place: "고다이지",

      ai_eyebrow: "AI GUIDE",
      ai_title: "Smart Guide Near You",
      ai_desc: "현재 위치를 기준으로 가까운 교토 관광지와 맛집 추천을 확인할 수 있습니다.",
      ai_locate_btn: "내 위치 사용",
      ai_status_default: "기본 추천은 교토 중심부 기준으로 표시됩니다.",
      ai_nearby_spots: "가까운 관광지",
      ai_nearby_food: "가까운 맛집",
      ai_top3: "Top 3",

      hotels_title: "호텔 소개",
      hotels_desc: "공식 사이트와 Instagram에 바로 연결되는 교토의 4개 숙소를 소개합니다.",

      hotel_1_label: "HOTEL 01",
      hotel_1_alt: "소라니와 테라스 교토",
      hotel_1_title: "Soraniwa Terrace Kyoto",
      hotel_1_desc: "교토의 풍경을 두 가지 스타일로 즐길 수 있는 새로운 일본식 호텔입니다.",

      hotel_2_label: "HOTEL 02",
      hotel_2_alt: "소라니와 테라스 교토 벳테이",
      hotel_2_title: "Soraniwa Terrace Kyoto Bettei",
      hotel_2_desc: "교토의 풍경을 두 가지 스타일로 즐길 수 있는 새로운 일본식 호텔입니다.",

      hotel_3_label: "HOTEL 03",
      hotel_3_alt: "히요리 스테이 교토 가모가와",
      hotel_3_title: "Hiyori Stay Kyoto Kamogawa",
      hotel_3_desc: "“Love & Natural Friendly” 가족과 함께 즐기는 즐거운 교토 여행.",

      hotel_4_label: "HOTEL 04",
      hotel_4_alt: "스티치 호텔 교토",
      hotel_4_title: "STITCH HOTEL KYOTO",
      hotel_4_desc: "TRADITION, ELEVATED.",

      official_website_label: "공식 홈페이지",
      instagram_label: "인스타그램",
      home_btn: "Home"
    },

    en: {
      page_title: "Kyoto Sakura Guide",
      brand: "Kyoto Sakura Guide",

      nav_sakura: "Sakura",
      nav_courses: "Courses",
      nav_food: "Food",
      nav_events: "Events",
      nav_ai: "AI Guide",
      nav_hotels: "Hotels",

      hero_title: "KYOTO",
      hero_subtitle: "SAKURA GUIDE",

      quick_menu_title: "Explore Kyoto",
      quick_sakura: "Sakura Spots",
      quick_courses: "Travel Courses",
      quick_food: "Food Guide",
      quick_events: "Events",
      quick_ai: "AI Guide",
      quick_hotels: "Hotels",

      sakura_eyebrow: "SAKURA HIGHLIGHTS",
      sakura_title: "Sakura Spots",
      sakura_desc: "Discover some of Kyoto’s most iconic cherry blossom spots in a visual slider.",
      sakura_prev_aria: "Previous slide",
      sakura_next_aria: "Next slide",

      sakura_slide_1_alt: "Arashiyama cherry blossoms",
      sakura_slide_1_tag: "#Arashiyama #KyotoSakura",
      sakura_slide_1_title: "Arashiyama",
      sakura_slide_1_desc: "A relaxing spring area where cherry blossoms, the river, and the mountain scenery create one of Kyoto’s most scenic landscapes.",

      sakura_slide_2_alt: "Philosopher’s Path cherry blossoms",
      sakura_slide_2_tag: "#PhilosophersPath #SpringWalk",
      sakura_slide_2_title: "Philosopher’s Path",
      sakura_slide_2_desc: "One of Kyoto’s most famous spring walking routes, lined with cherry blossoms along the canal in a calm and poetic atmosphere.",

      sakura_slide_3_alt: "Kiyomizu-dera cherry blossoms",
      sakura_slide_3_tag: "#KiyomizuDera #KyotoView",
      sakura_slide_3_title: "Kiyomizu-dera",
      sakura_slide_3_desc: "A classic Kyoto spring view where temple architecture, city 전망, and cherry blossoms come together beautifully.",

      sakura_slide_4_alt: "Maruyama Park cherry blossoms",
      sakura_slide_4_tag: "#MaruyamaPark #Hanami",
      sakura_slide_4_title: "Maruyama Park",
      sakura_slide_4_desc: "A lively hanami favorite where locals and visitors gather to enjoy Kyoto’s festive cherry blossom season.",

      sakura_slide_5_alt: "Heian Shrine cherry blossoms",
      sakura_slide_5_tag: "#HeianShrine #WeepingSakura",
      sakura_slide_5_title: "Heian Shrine",
      sakura_slide_5_desc: "Known for its elegant weeping cherry trees, this spacious shrine offers a refined and graceful spring atmosphere.",

      sakura_slide_6_alt: "Keage Incline cherry blossoms",
      sakura_slide_6_tag: "#KeageIncline #RailwaySakura",
      sakura_slide_6_title: "Keage Incline",
      sakura_slide_6_desc: "A popular photo spot where old railway tracks are surrounded by rows of cherry blossoms like a spring tunnel.",

      courses_eyebrow: "TRAVEL COURSES",
      courses_title: "Recommended Courses",
      courses_desc: "Recommended Kyoto courses for first-time visitors, sakura walks, night strolls, food trips, and more.",
      course_route_label: "Route",

      course_1_alt: "Classic Kyoto Course",
      course_1_label: "Classic Kyoto Course",
      course_1_title: "Classic Kyoto Course",
      course_1_desc: "A must-do route for first-time visitors to Kyoto. Enjoy traditional streets, historic temples, and the atmosphere of Gion all in one day.",
      course_1_meta_1: "Duration : about 4 ~ 6 hours",
      course_1_meta_2: "Best time : morning ~ afternoon",
      course_1_meta_3: "Area : Higashiyama",
      course_1_route: "Kiyomizu-dera → Sannenzaka / Ninenzaka → Yasaka Shrine → Gion → Kamo River",

      course_2_alt: "Sakura Walk Course",
      course_2_label: "Sakura Walk Course",
      course_2_title: "Sakura Walk Course",
      course_2_desc: "One of Kyoto’s most beautiful spring walking routes, perfect for enjoying cherry blossoms, temples, and gardens together.",
      course_2_meta_1: "Duration : about 3 ~ 5 hours",
      course_2_meta_2: "Best time : morning",
      course_2_meta_3: "Area : Eastern Kyoto",
      course_2_route: "Philosopher’s Path → Nanzen-ji → Keage Incline → Heian Shrine",

      course_3_alt: "Arashiyama Nature Course",
      course_3_label: "Arashiyama Nature Course",
      course_3_title: "Arashiyama Nature Course",
      course_3_desc: "A route through Kyoto’s western side where you can enjoy Arashiyama’s nature, traditional temples, bamboo groves, and river scenery.",
      course_3_meta_1: "Duration : about 4 ~ 5 hours",
      course_3_meta_2: "Best time : morning ~ daytime",
      course_3_meta_3: "Area : Arashiyama",
      course_3_route: "Arashiyama Bamboo Grove → Tenryu-ji → Togetsukyo Bridge → Arashiyama River",

      course_4_alt: "Kyoto Night Walk",
      course_4_label: "Kyoto Night Walk",
      course_4_title: "Kyoto Night Walk",
      course_4_desc: "A peaceful evening route where Kyoto’s traditional streets and alleys feel even more charming after sunset.",
      course_4_meta_1: "Duration : about 2 ~ 4 hours",
      course_4_meta_2: "Best time : evening",
      course_4_meta_3: "Area : Gion / Shijo",
      course_4_route: "Yasaka Shrine → Gion → Shirakawa Canal → Pontocho Alley",

      course_5_alt: "Kyoto Temple Highlights",
      course_5_label: "Kyoto Temple Highlights",
      course_5_title: "Kyoto Temple Highlights",
      course_5_desc: "A classic route around northern Kyoto’s famous temples, ideal for appreciating traditional architecture and gardens.",
      course_5_meta_1: "Duration : about 4 ~ 6 hours",
      course_5_meta_2: "Best time : morning ~ afternoon",
      course_5_meta_3: "Area : Northern Kyoto",
      course_5_route: "Kinkaku-ji → Ryoan-ji → Ninna-ji → Kitano Tenmangu",

      course_6_alt: "Food & Market Course",
      course_6_label: "Food & Market Course",
      course_6_title: "Food & Market Course",
      course_6_desc: "A fun course for enjoying Kyoto street food, traditional markets, and casual shopping in one lively area.",
      course_6_meta_1: "Duration : about 3 ~ 5 hours",
      course_6_meta_2: "Best time : lunch ~ evening",
      course_6_meta_3: "Area : Nishiki / Kawaramachi",
      course_6_route: "Nishiki Market → Teramachi Shopping Arcade → Kawaramachi Street → Kamo River",

      food_eyebrow: "FOOD GUIDE",
      food_title: "Food by Area",
      food_desc: "Check recommended restaurants by area near major sightseeing spots.",
      food_toggle_symbol: "+",

      food_area_1_alt: "Arashiyama food",
      food_area_1_title: "Arashiyama",
      food_area_1_desc: "Recommended restaurants around Arashiyama",

      food_area_2_alt: "Gion food",
      food_area_2_title: "Gion",
      food_area_2_desc: "Recommended restaurants around Gion",

      food_area_3_alt: "Kiyomizu food",
      food_area_3_title: "Kiyomizu",
      food_area_3_desc: "Recommended restaurants around Kiyomizu-dera",

      food_area_4_alt: "Kawaramachi food",
      food_area_4_title: "Kawaramachi",
      food_area_4_desc: "Recommended restaurants around Kawaramachi",

      food_place_1_1_name: "Arashiyama Yoshimura",
      food_place_1_1_tag: "Soba",
      food_place_1_1_hours: "Hours 11:00 – 17:00",
      food_place_1_1_menu: "Menu Handmade soba",

      food_place_1_2_name: "% Arabica Kyoto Arashiyama",
      food_place_1_2_tag: "Cafe",
      food_place_1_2_hours: "Hours 08:00 – 18:00",
      food_place_1_2_menu: "Menu Cafe latte",

      food_place_1_3_name: "Unagi Hirokawa",
      food_place_1_3_tag: "Unagi",
      food_place_1_3_hours: "Hours 11:00 – 14:30 / 17:00 – 20:00",
      food_place_1_3_menu: "Menu Unagi rice bowl",

      food_place_2_1_name: "Gion Tanto",
      food_place_2_1_tag: "Okonomiyaki",
      food_place_2_1_hours: "Hours 11:30 – 22:00",
      food_place_2_1_menu: "Menu Okonomiyaki",

      food_place_2_2_name: "Gion Tsujiri",
      food_place_2_2_tag: "Dessert",
      food_place_2_2_hours: "Hours 10:00 – 21:00",
      food_place_2_2_menu: "Menu Matcha parfait",

      food_place_2_3_name: "Izuju Sushi",
      food_place_2_3_tag: "Sushi",
      food_place_2_3_hours: "Hours 10:30 – 19:00",
      food_place_2_3_menu: "Menu Kyoto-style sushi",

      food_place_3_1_name: "Okutan Kiyomizu",
      food_place_3_1_tag: "Tofu",
      food_place_3_1_hours: "Hours 11:00 – 16:30",
      food_place_3_1_menu: "Menu Yudofu",

      food_place_3_2_name: "Kiyomizu Junsei",
      food_place_3_2_tag: "Tofu",
      food_place_3_2_hours: "Hours 11:00 – 17:00",
      food_place_3_2_menu: "Menu Tofu course",

      food_place_3_3_name: "Kasagiya",
      food_place_3_3_tag: "Dessert",
      food_place_3_3_hours: "Hours 11:00 – 17:30",
      food_place_3_3_menu: "Menu Zenzai",

      food_place_4_1_name: "Nishiki Market",
      food_place_4_1_tag: "Market Food",
      food_place_4_1_hours: "Hours 10:00 – 18:00",
      food_place_4_1_menu: "Menu Street food",

      food_place_4_2_name: "Menya Inoichi",
      food_place_4_2_tag: "Ramen",
      food_place_4_2_hours: "Hours 11:00 – 14:30 / 17:30 – 21:00",
      food_place_4_2_menu: "Menu Ramen",

      food_place_4_3_name: "Gyukatsu Kyoto Katsugyu",
      food_place_4_3_tag: "Gyukatsu",
      food_place_4_3_hours: "Hours 11:00 – 22:00",
      food_place_4_3_menu: "Menu Beef cutlet",

      directions_label: "Directions",

      food_ranking_label: "Food Picks",
      food_ranking_title: "Staff Restaurant Picks",
      food_ranking_desc: "A curated list of recommended restaurants in Kyoto by category.",
      food_ranking_board_left: "Meat & Japanese Picks",
      food_ranking_board_right: "Casual & More",

      food_rank_1_category: "Teppanyaki",
      food_rank_1_name: "モーリヤ祇園 / Teppanyaki",
      food_rank_1_desc: "A great atmosphere for a special occasion",
      food_rank_2_category: "Teppanyaki",
      food_rank_2_name: "のいち / Teppanyaki",
      food_rank_2_desc: "Calm and refined dining",
      food_rank_3_category: "Yakitori",
      food_rank_3_name: "祇園刀 / Yakitori",
      food_rank_3_desc: "A nice place to enjoy Kyoto-style atmosphere",
      food_rank_4_category: "Yakiniku",
      food_rank_4_name: "一笑 / Yakiniku",
      food_rank_4_desc: "Rich and flavorful grilled meat",
      food_rank_5_category: "Yakiniku",
      food_rank_5_name: "ひろ / Yakiniku",
      food_rank_5_desc: "A popular and easygoing choice",
      food_rank_6_category: "Yakiniku",
      food_rank_6_name: "大黒戎先斗町店 / Yakiniku",
      food_rank_6_desc: "Recommended around Pontocho",
      food_rank_7_category: "Yakiniku",
      food_rank_7_name: "善 / Yakiniku",
      food_rank_7_desc: "A calm place to enjoy grilled meat",
      food_rank_8_category: "Sushi",
      food_rank_8_name: "寿司よし乃 / Sushi",
      food_rank_8_desc: "Recommended for its neat atmosphere",
      food_rank_9_category: "Sushi",
      food_rank_9_name: "銀座おのでら / Sushi",
      food_rank_9_desc: "Elegant for a special meal",
      food_rank_10_category: "Sushi",
      food_rank_10_name: "がんこ / Sushi",
      food_rank_10_desc: "Comfortable and approachable",
      food_rank_11_category: "Sushi",
      food_rank_11_name: "杉玉 / Sushi",
      food_rank_11_desc: "Casual and easy to enjoy",
      food_rank_12_category: "Sushi",
      food_rank_12_name: "東寿司 / Sushi",
      food_rank_12_desc: "A nice local-style option",
      food_rank_13_category: "Izakaya",
      food_rank_13_name: "うしのほね / Izakaya",
      food_rank_13_desc: "Great for a pleasant evening",
      food_rank_14_category: "Izakaya",
      food_rank_14_name: "おにかい / Izakaya",
      food_rank_14_desc: "Easy stop during a trip",
      food_rank_15_category: "Izakaya",
      food_rank_15_name: "晴れ晴れ / Izakaya",
      food_rank_15_desc: "Relaxed dinner atmosphere",
      food_rank_16_category: "Izakaya",
      food_rank_16_name: "雅 炭火焼鳥 / Izakaya",
      food_rank_16_desc: "Appealing charcoal-grilled menu",
      food_rank_17_category: "Izakaya",
      food_rank_17_name: "炭火焼鶏おとなり / Izakaya",
      food_rank_17_desc: "Good for a local vibe",
      food_rank_18_category: "Ramen",
      food_rank_18_name: "柳 札幌ラーメン / Ramen",
      food_rank_18_desc: "Recommended for rich broth lovers",
      food_rank_19_category: "Ramen",
      food_rank_19_name: "麺屋EDITION京都本店 / Ramen",
      food_rank_19_desc: "A stylish and popular ramen shop",
      food_rank_20_category: "Ramen",
      food_rank_20_name: "ラーメンの坊歩 七条本店 / Ramen",
      food_rank_20_desc: "A satisfying meal option",
      food_rank_21_category: "Ramen",
      food_rank_21_name: "優光 / Ramen",
      food_rank_21_desc: "Popular with travelers too",
      food_rank_22_category: "Chinese",
      food_rank_22_name: "CHAO CHAO / Chinese",
      food_rank_22_desc: "A casual spot known for gyoza",
      food_rank_23_category: "Chinese",
      food_rank_23_name: "MING MING / Chinese",
      food_rank_23_desc: "Light and casual Chinese cuisine",
      food_rank_24_category: "Shabu-shabu",
      food_rank_24_name: "きんのぶたPREMIUM / Shabu-shabu",
      food_rank_24_desc: "Great for dining with a group",
      food_rank_25_category: "Vegan",
      food_rank_25_name: "Veg Out / Vegan",
      food_rank_25_desc: "Recommended for healthy light meals",
      food_rank_26_category: "Vegan",
      food_rank_26_name: "TU CASA - plant based & zero waste / Vegan",
      food_rank_26_desc: "A space with an eco-friendly concept",

      events_title: "Kyoto Cherry Blossom Events",
      events_prev_aria: "Previous event",
      events_next_aria: "Next event",

      event_1_alt: "Maruyama Park Sakura Light-up",
      event_1_title: "Maruyama Park Sakura Light-up",
      event_1_date: "2026. 3. 25. - 2026. 4. 9.",
      event_1_place: "Maruyama Park",

      event_2_alt: "Nijo Castle Sakura Festival",
      event_2_title: "Nijo Castle Sakura Festival",
      event_2_date: "2026. 3. 20. - 2026. 4. 12.",
      event_2_place: "Nijo Castle",

      event_3_alt: "Okazaki Canal Sakura Light-up",
      event_3_title: "Okazaki Canal Sakura Light-up",
      event_3_date: "2026. 3. 28. - 2026. 4. 7.",
      event_3_place: "Okazaki Canal",

      event_4_alt: "Gion Shirakawa Sakura Light-up",
      event_4_title: "Gion Shirakawa Sakura Light-up",
      event_4_date: "2026. 3. 27. - 2026. 4. 6.",
      event_4_place: "Gion Shirakawa",

      event_5_alt: "Toji Night Sakura Special Viewing",
      event_5_title: "Toji Night Sakura Special Viewing",
      event_5_date: "2026. 3. 20. - 2026. 4. 12.",
      event_5_place: "Toji Temple",

      event_6_alt: "Heian Shrine Sakura Concert",
      event_6_title: "Heian Shrine Sakura Otoyo",
      event_6_date: "2026. 4. 3. - 2026. 4. 6.",
      event_6_place: "Heian Shrine",

      event_7_alt: "Hirano Shrine Sakura Festival",
      event_7_title: "Hirano Shrine Sakura Festival",
      event_7_date: "2026. 4. 1. - 2026. 4. 14.",
      event_7_place: "Hirano Shrine",

      event_8_alt: "Kameoka Sakura Week",
      event_8_title: "Kameoka Sakura Week",
      event_8_date: "2026. 3. 28. - 2026. 4. 10.",
      event_8_place: "Kameoka",

      event_9_alt: "Kiyomizudera Spring Night Special Viewing",
      event_9_title: "Kiyomizudera Spring Night Special Viewing",
      event_9_date: "2026. 3. 27. - 2026. 4. 5.",
      event_9_place: "Kiyomizudera",

      event_10_alt: "Kodaiji Spring Light-up",
      event_10_title: "Kodaiji Spring Light-up",
      event_10_date: "2026. 3. 14. - 2026. 5. 6.",
      event_10_place: "Kodaiji Temple",

      ai_eyebrow: "AI GUIDE",
      ai_title: "Smart Guide Near You",
      ai_desc: "Use your current location to discover nearby Kyoto spots and food recommendations.",
      ai_locate_btn: "Use My Location",
      ai_status_default: "Default recommendations are shown based on central Kyoto.",
      ai_nearby_spots: "Nearby Spots",
      ai_nearby_food: "Nearby Food",
      ai_top3: "Top 3",

      hotels_title: "Our Hotels",
      hotels_desc: "Explore four Kyoto stays with direct access to each official website and Instagram page.",

      hotel_1_label: "HOTEL 01",
      hotel_1_alt: "Soraniwa Terrace Kyoto",
      hotel_1_title: "Soraniwa Terrace Kyoto",
      hotel_1_desc: "A new Japanese-style hotel with two ways to enjoy the scenery of Kyoto.",

      hotel_2_label: "HOTEL 02",
      hotel_2_alt: "Soraniwa Terrace Kyoto Bettei",
      hotel_2_title: "Soraniwa Terrace Kyoto Bettei",
      hotel_2_desc: "A new Japanese-style hotel with two ways to enjoy the scenery of Kyoto.",

      hotel_3_label: "HOTEL 03",
      hotel_3_alt: "Hiyori Stay Kyoto Kamogawa",
      hotel_3_title: "Hiyori Stay Kyoto Kamogawa",
      hotel_3_desc: "“Love & Natural Friendly” A fun Kyoto trip for families.",

      hotel_4_label: "HOTEL 04",
      hotel_4_alt: "STITCH HOTEL KYOTO",
      hotel_4_title: "STITCH HOTEL KYOTO",
      hotel_4_desc: "TRADITION, ELEVATED.",

      official_website_label: "Official Website",
      instagram_label: "Instagram",
      home_btn: "Home"
    },

    ja: {
      page_title: "Kyoto Sakura Guide",
      brand: "Kyoto Sakura Guide",

      nav_sakura: "桜",
      nav_courses: "コース",
      nav_food: "グルメ",
      nav_events: "イベント",
      nav_ai: "AIガイド",
      nav_hotels: "ホテル",

      hero_title: "KYOTO",
      hero_subtitle: "SAKURA GUIDE",

      quick_menu_title: "Explore Kyoto",
      quick_sakura: "桜スポット",
      quick_courses: "おすすめコース",
      quick_food: "グルメガイド",
      quick_events: "イベント",
      quick_ai: "AIガイド",
      quick_hotels: "ホテル",

      sakura_eyebrow: "SAKURA HIGHLIGHTS",
      sakura_title: "Sakura Spots",
      sakura_desc: "京都を代表する桜の名所をスライド形式でご紹介します。",
      sakura_prev_aria: "前のスライド",
      sakura_next_aria: "次のスライド",

      sakura_slide_1_alt: "嵐山の桜風景",
      sakura_slide_1_tag: "#Arashiyama #KyotoSakura",
      sakura_slide_1_title: "嵐山",
      sakura_slide_1_desc: "渡月橋や川沿いの景色、山を彩る桜が美しく、春の京都らしいゆったりした散策を楽しめるエリアです。",

      sakura_slide_2_alt: "哲学の道の桜風景",
      sakura_slide_2_tag: "#PhilosophersPath #SpringWalk",
      sakura_slide_2_title: "哲学の道",
      sakura_slide_2_desc: "水路沿いに桜が続く京都屈指の散策コースで、静かで情緒ある春の雰囲気を楽しめます。",

      sakura_slide_3_alt: "清水寺の桜風景",
      sakura_slide_3_tag: "#KiyomizuDera #KyotoView",
      sakura_slide_3_title: "清水寺",
      sakura_slide_3_desc: "伝統的な寺院建築と京都市内の眺望、華やかな桜を一度に楽しめる、京都らしさあふれる名所です。",

      sakura_slide_4_alt: "円山公園の桜風景",
      sakura_slide_4_tag: "#MaruyamaPark #Hanami",
      sakura_slide_4_title: "円山公園",
      sakura_slide_4_desc: "桜の時期になると地元の人も観光客も集まる、京都を代表するお花見スポットです。",

      sakura_slide_5_alt: "平安神宮の桜風景",
      sakura_slide_5_tag: "#HeianShrine #WeepingSakura",
      sakura_slide_5_title: "平安神宮",
      sakura_slide_5_desc: "美しいしだれ桜で知られ、広い境内と伝統建築が上品で華やかな春の景色をつくります。",

      sakura_slide_6_alt: "蹴上インクラインの桜風景",
      sakura_slide_6_tag: "#KeageIncline #RailwaySakura",
      sakura_slide_6_title: "蹴上インクライン",
      sakura_slide_6_desc: "旧線路の両側に桜が並ぶ人気の撮影スポットで、春らしい景色を楽しめます。",

      courses_eyebrow: "TRAVEL COURSES",
      courses_title: "Recommended Courses",
      courses_desc: "京都が初めての方から、桜散策、夜歩き、グルメまで、さまざまなスタイルで楽しめるおすすめコースです。",
      course_route_label: "ルート",

      course_1_alt: "クラシック京都コース",
      course_1_label: "Classic Kyoto Course",
      course_1_title: "クラシック京都コース",
      course_1_desc: "京都が初めての方に最もおすすめしやすい定番コースです。伝統的な街並みや寺院、祇園の雰囲気まで一日で楽しめます。",
      course_1_meta_1: "所要時間 : 約4〜6時間",
      course_1_meta_2: "おすすめ時間 : 午前〜午後",
      course_1_meta_3: "エリア : 東山",
      course_1_route: "清水寺 → 産寧坂 / 二年坂 → 八坂神社 → 祇園 → 鴨川",

      course_2_alt: "桜散策コース",
      course_2_label: "Sakura Walk Course",
      course_2_title: "桜散策コース",
      course_2_desc: "京都でも特に美しい桜散策コースの一つです。桜並木を歩きながら、寺院や庭園も一緒に楽しめます。",
      course_2_meta_1: "所要時間 : 約3〜5時間",
      course_2_meta_2: "おすすめ時間 : 午前",
      course_2_meta_3: "エリア : 京都東部",
      course_2_route: "哲学の道 → 南禅寺 → 蹴上インクライン → 平安神宮",

      course_3_alt: "嵐山自然コース",
      course_3_label: "Arashiyama Nature Course",
      course_3_title: "嵐山自然コース",
      course_3_desc: "京都西部の嵐山エリアで、自然と伝統寺院の両方を楽しめるコースです。竹林や川辺の景色も魅力です。",
      course_3_meta_1: "所要時間 : 約4〜5時間",
      course_3_meta_2: "おすすめ時間 : 午前〜昼",
      course_3_meta_3: "エリア : 嵐山",
      course_3_route: "嵐山竹林 → 天龍寺 → 渡月橋 → 嵐山の川辺",

      course_4_alt: "京都夜さんぽコース",
      course_4_label: "Kyoto Night Walk",
      course_4_title: "京都夜さんぽコース",
      course_4_desc: "夜になるといっそう美しい京都の雰囲気を感じられるコースです。伝統的な通りや路地を歩きながら静かな夜を楽しめます。",
      course_4_meta_1: "所要時間 : 約2〜4時間",
      course_4_meta_2: "おすすめ時間 : 夕方〜夜",
      course_4_meta_3: "エリア : 祇園 / 四条",
      course_4_route: "八坂神社 → 祇園 → 白川沿い → 先斗町",

      course_5_alt: "京都名寺コース",
      course_5_label: "Kyoto Temple Highlights",
      course_5_title: "京都名寺コース",
      course_5_desc: "京都北部の代表的な寺院をめぐるコースです。日本らしい建築や庭園をじっくり楽しめます。",
      course_5_meta_1: "所要時間 : 約4〜6時間",
      course_5_meta_2: "おすすめ時間 : 午前〜午後",
      course_5_meta_3: "エリア : 京都北部",
      course_5_route: "金閣寺 → 龍安寺 → 仁和寺 → 北野天満宮",

      course_6_alt: "京都グルメ＆買い物コース",
      course_6_label: "Food & Market Course",
      course_6_title: "京都グルメ＆買い物コース",
      course_6_desc: "京都の食べ歩きや市場散策を楽しめるコースです。グルメとショッピングを一緒に楽しみたい方におすすめです。",
      course_6_meta_1: "所要時間 : 約3〜5時間",
      course_6_meta_2: "おすすめ時間 : 昼〜夜",
      course_6_meta_3: "エリア : 錦 / 河原町",
      course_6_route: "錦市場 → 寺町商店街 → 河原町通 → 鴨川",

      food_eyebrow: "FOOD GUIDE",
      food_title: "Food by Area",
      food_desc: "観光地周辺のおすすめグルメをエリア別に確認できます。",
      food_toggle_symbol: "+",

      food_area_1_alt: "嵐山グルメ",
      food_area_1_title: "嵐山",
      food_area_1_desc: "嵐山周辺のおすすめグルメ",

      food_area_2_alt: "祇園グルメ",
      food_area_2_title: "祇園",
      food_area_2_desc: "祇園周辺のおすすめグルメ",

      food_area_3_alt: "清水エリアのグルメ",
      food_area_3_title: "清水",
      food_area_3_desc: "清水寺周辺のおすすめグルメ",

      food_area_4_alt: "河原町グルメ",
      food_area_4_title: "河原町",
      food_area_4_desc: "河原町周辺のおすすめグルメ",

      food_place_1_1_name: "Arashiyama Yoshimura",
      food_place_1_1_tag: "そば",
      food_place_1_1_hours: "営業時間 11:00 – 17:00",
      food_place_1_1_menu: "メニュー 手打ちそば",

      food_place_1_2_name: "% Arabica Kyoto Arashiyama",
      food_place_1_2_tag: "カフェ",
      food_place_1_2_hours: "営業時間 08:00 – 18:00",
      food_place_1_2_menu: "メニュー カフェラテ",

      food_place_1_3_name: "Unagi Hirokawa",
      food_place_1_3_tag: "うなぎ",
      food_place_1_3_hours: "営業時間 11:00 – 14:30 / 17:00 – 20:00",
      food_place_1_3_menu: "メニュー うな丼",

      food_place_2_1_name: "Gion Tanto",
      food_place_2_1_tag: "お好み焼き",
      food_place_2_1_hours: "営業時間 11:30 – 22:00",
      food_place_2_1_menu: "メニュー お好み焼き",

      food_place_2_2_name: "Gion Tsujiri",
      food_place_2_2_tag: "デザート",
      food_place_2_2_hours: "営業時間 10:00 – 21:00",
      food_place_2_2_menu: "メニュー 抹茶パフェ",

      food_place_2_3_name: "Izuju Sushi",
      food_place_2_3_tag: "寿司",
      food_place_2_3_hours: "営業時間 10:30 – 19:00",
      food_place_2_3_menu: "メニュー 京寿司",

      food_place_3_1_name: "Okutan Kiyomizu",
      food_place_3_1_tag: "豆腐",
      food_place_3_1_hours: "営業時間 11:00 – 16:30",
      food_place_3_1_menu: "メニュー 湯豆腐",

      food_place_3_2_name: "Kiyomizu Junsei",
      food_place_3_2_tag: "豆腐",
      food_place_3_2_hours: "営業時間 11:00 – 17:00",
      food_place_3_2_menu: "メニュー 豆腐コース",

      food_place_3_3_name: "Kasagiya",
      food_place_3_3_tag: "デザート",
      food_place_3_3_hours: "営業時間 11:00 – 17:30",
      food_place_3_3_menu: "メニュー ぜんざい",

      food_place_4_1_name: "Nishiki Market",
      food_place_4_1_tag: "市場グルメ",
      food_place_4_1_hours: "営業時間 10:00 – 18:00",
      food_place_4_1_menu: "メニュー 食べ歩き",

      food_place_4_2_name: "Menya Inoichi",
      food_place_4_2_tag: "ラーメン",
      food_place_4_2_hours: "営業時間 11:00 – 14:30 / 17:30 – 21:00",
      food_place_4_2_menu: "メニュー ラーメン",

      food_place_4_3_name: "Gyukatsu Kyoto Katsugyu",
      food_place_4_3_tag: "牛カツ",
      food_place_4_3_hours: "営業時間 11:00 – 22:00",
      food_place_4_3_menu: "メニュー 牛カツ",

      directions_label: "経路を見る",

      food_ranking_label: "Food Picks",
      food_ranking_title: "スタッフおすすめグルメ",
      food_ranking_desc: "京都で楽しめるおすすめ飲食店をジャンル別にまとめました。",
      food_ranking_board_left: "肉・和食おすすめ",
      food_ranking_board_right: "カジュアル・その他おすすめ",

      food_rank_1_category: "鉄板焼き",
      food_rank_1_name: "モーリヤ祇園 / 鉄板焼き",
      food_rank_1_desc: "特別な日にぴったりの雰囲気",
      food_rank_2_category: "鉄板焼き",
      food_rank_2_name: "のいち / 鉄板焼き",
      food_rank_2_desc: "落ち着いた上質な食事",
      food_rank_3_category: "焼き鳥",
      food_rank_3_name: "祇園刀 / 焼き鳥",
      food_rank_3_desc: "京都らしい雰囲気を楽しみやすいお店",
      food_rank_4_category: "焼肉",
      food_rank_4_name: "一笑 / 焼肉",
      food_rank_4_desc: "旨みの強いお肉料理",
      food_rank_5_category: "焼肉",
      food_rank_5_name: "ひろ / 焼肉",
      food_rank_5_desc: "気軽に楽しみやすい人気店",
      food_rank_6_category: "焼肉",
      food_rank_6_name: "大黒戎先斗町店 / 焼肉",
      food_rank_6_desc: "先斗町周辺の食事コースにもおすすめ",
      food_rank_7_category: "焼肉",
      food_rank_7_name: "善 / 焼肉",
      food_rank_7_desc: "落ち着いて焼肉を楽しみたい時におすすめ",
      food_rank_8_category: "寿司",
      food_rank_8_name: "寿司よし乃 / 寿司",
      food_rank_8_desc: "整った雰囲気のおすすめ店",
      food_rank_9_category: "寿司",
      food_rank_9_name: "銀座おのでら / 寿司",
      food_rank_9_desc: "特別な食事に合う上質感",
      food_rank_10_category: "寿司",
      food_rank_10_name: "がんこ / 寿司",
      food_rank_10_desc: "比較的気軽に入りやすいお店",
      food_rank_11_category: "寿司",
      food_rank_11_name: "杉玉 / 寿司",
      food_rank_11_desc: "カジュアルに楽しみやすい雰囲気",
      food_rank_12_category: "寿司",
      food_rank_12_name: "東寿司 / 寿司",
      food_rank_12_desc: "ローカル感を楽しみたい方におすすめ",
      food_rank_13_category: "居酒屋",
      food_rank_13_name: "うしのほね / 居酒屋",
      food_rank_13_desc: "夜の時間帯に雰囲気よく楽しみたい時におすすめ",
      food_rank_14_category: "居酒屋",
      food_rank_14_name: "おにかい / 居酒屋",
      food_rank_14_desc: "旅行中にも気軽に立ち寄りやすいお店",
      food_rank_15_category: "居酒屋",
      food_rank_15_name: "晴れ晴れ / 居酒屋",
      food_rank_15_desc: "落ち着いた雰囲気の夕食におすすめ",
      food_rank_16_category: "居酒屋",
      food_rank_16_name: "雅 炭火焼鳥 / 居酒屋",
      food_rank_16_desc: "炭火の香りが魅力のメニュー",
      food_rank_17_category: "居酒屋",
      food_rank_17_name: "炭火焼鶏おとなり / 居酒屋",
      food_rank_17_desc: "地元らしい雰囲気を楽しみやすいお店",
      food_rank_18_category: "ラーメン",
      food_rank_18_name: "柳 札幌ラーメン / ラーメン",
      food_rank_18_desc: "濃いめのスープが好きな方におすすめ",
      food_rank_19_category: "ラーメン",
      food_rank_19_name: "麺屋EDITION京都本店 / ラーメン",
      food_rank_19_desc: "洗練された雰囲気の人気ラーメン店",
      food_rank_20_category: "ラーメン",
      food_rank_20_name: "ラーメンの坊歩 七条本店 / ラーメン",
      food_rank_20_desc: "しっかり食べたい一食におすすめ",
      food_rank_21_category: "ラーメン",
      food_rank_21_name: "優光 / ラーメン",
      food_rank_21_desc: "旅行者からも人気が高いお店",
      food_rank_22_category: "中華",
      food_rank_22_name: "CHAO CHAO / 中華",
      food_rank_22_desc: "餃子で有名なカジュアルなお店",
      food_rank_23_category: "中華",
      food_rank_23_name: "MING MING / 中華",
      food_rank_23_desc: "軽く楽しみやすい中華料理",
      food_rank_24_category: "しゃぶしゃぶ",
      food_rank_24_name: "きんのぶたPREMIUM / しゃぶしゃぶ",
      food_rank_24_desc: "複数人で行く食事にもおすすめ",
      food_rank_25_category: "ビーガン",
      food_rank_25_name: "Veg Out / ビーガン",
      food_rank_25_desc: "ヘルシーで軽めの食事をしたい時におすすめ",
      food_rank_26_category: "ビーガン",
      food_rank_26_name: "TU CASA - plant based & zero waste / ビーガン",
      food_rank_26_desc: "環境配慮のコンセプトが魅力の空間",

      events_title: "開催中の京都さくらイベント",
      events_prev_aria: "前のイベント",
      events_next_aria: "次のイベント",

      event_1_alt: "円山公園の桜ライトアップ",
      event_1_title: "円山公園 桜ライトアップ",
      event_1_date: "2026. 3. 25. - 2026. 4. 9.",
      event_1_place: "円山公園",

      event_2_alt: "二条城の桜まつり",
      event_2_title: "二条城 桜まつり",
      event_2_date: "2026. 3. 20. - 2026. 4. 12.",
      event_2_place: "二条城",

      event_3_alt: "岡崎疏水の桜ライトアップ",
      event_3_title: "岡崎疏水 桜ライトアップ",
      event_3_date: "2026. 3. 28. - 2026. 4. 7.",
      event_3_place: "岡崎疏水",

      event_4_alt: "祇園白川の桜ライトアップ",
      event_4_title: "祇園白川 桜ライトアップ",
      event_4_date: "2026. 3. 27. - 2026. 4. 6.",
      event_4_place: "祇園白川",

      event_5_alt: "東寺 夜桜特別拝観",
      event_5_title: "東寺 夜桜特別拝観",
      event_5_date: "2026. 3. 20. - 2026. 4. 12.",
      event_5_place: "東寺",

      event_6_alt: "平安神宮の桜音夜",
      event_6_title: "平安神宮 桜音夜",
      event_6_date: "2026. 4. 3. - 2026. 4. 6.",
      event_6_place: "平安神宮",

      event_7_alt: "平野神社の桜祭り",
      event_7_title: "平野神社 桜祭り",
      event_7_date: "2026. 4. 1. - 2026. 4. 14.",
      event_7_place: "平野神社",

      event_8_alt: "亀岡さくらウィーク",
      event_8_title: "亀岡さくらウィーク",
      event_8_date: "2026. 3. 28. - 2026. 4. 10.",
      event_8_place: "亀岡",

      event_9_alt: "清水寺 春の夜間特別拝観",
      event_9_title: "清水寺 春の夜間特別拝観",
      event_9_date: "2026. 3. 27. - 2026. 4. 5.",
      event_9_place: "清水寺",

      event_10_alt: "高台寺 春のライトアップ",
      event_10_title: "高台寺 春のライトアップ",
      event_10_date: "2026. 3. 14. - 2026. 5. 6.",
      event_10_place: "高台寺",

      ai_eyebrow: "AI GUIDE",
      ai_title: "Smart Guide Near You",
      ai_desc: "現在地を使って、近くの京都スポットやグルメのおすすめを確認できます。",
      ai_locate_btn: "現在地を使う",
      ai_status_default: "おすすめは京都中心部を基準に表示しています。",
      ai_nearby_spots: "近くのスポット",
      ai_nearby_food: "近くのグルメ",
      ai_top3: "Top 3",

      hotels_title: "ホテル紹介",
      hotels_desc: "公式サイトとInstagramへ直接アクセスできる京都の4つの滞在先をご紹介します。",

      hotel_1_label: "HOTEL 01",
      hotel_1_alt: "Soraniwa Terrace Kyoto",
      hotel_1_title: "Soraniwa Terrace Kyoto",
      hotel_1_desc: "京都の景色を2つのスタイルで楽しめる新しい和のホテルです。",

      hotel_2_label: "HOTEL 02",
      hotel_2_alt: "Soraniwa Terrace Kyoto Bettei",
      hotel_2_title: "Soraniwa Terrace Kyoto Bettei",
      hotel_2_desc: "京都の景色を2つのスタイルで楽しめる新しい和のホテルです。",

      hotel_3_label: "HOTEL 03",
      hotel_3_alt: "Hiyori Stay Kyoto Kamogawa",
      hotel_3_title: "Hiyori Stay Kyoto Kamogawa",
      hotel_3_desc: "“Love & Natural Friendly” ファミリーで過ごす楽しい京都旅。",

      hotel_4_label: "HOTEL 04",
      hotel_4_alt: "STITCH HOTEL KYOTO",
      hotel_4_title: "STITCH HOTEL KYOTO",
      hotel_4_desc: "TRADITION, ELEVATED.",

      official_website_label: "公式ホームページ",
      instagram_label: "Instagram",
      home_btn: "Home"
    }
  };

  const runtimeTexts = {
    ko: {
      ai_walk_maps: "지도에서 길찾기",
      ai_view_place: "장소 보기",
      ai_status_default: "기본 추천은 교토 중심부 기준으로 표시됩니다.",
      ai_status_unsupported: "이 브라우저에서는 위치 기능이 지원되지 않습니다.",
      ai_status_finding: "현재 위치를 찾는 중입니다...",
      ai_status_current: "현재 위치 기준의 주변 추천으로 업데이트되었습니다.",
      ai_status_denied: "위치 권한이 거부되어 기본 교토 추천을 표시합니다."
    },
    en: {
      ai_walk_maps: "Walk on Maps",
      ai_view_place: "View Place",
      ai_status_default: "Default recommendations are shown based on central Kyoto.",
      ai_status_unsupported: "Geolocation is not supported on this browser.",
      ai_status_finding: "Finding your location...",
      ai_status_current: "Nearby recommendations are now based on your current location.",
      ai_status_denied: "Location access was denied. Default Kyoto recommendations are shown."
    },
    ja: {
      ai_walk_maps: "地図で経路を見る",
      ai_view_place: "場所を見る",
      ai_status_default: "おすすめは京都中心部を基準に表示しています。",
      ai_status_unsupported: "このブラウザでは位置情報機能に対応していません。",
      ai_status_finding: "現在地を取得しています...",
      ai_status_current: "現在地を基準に周辺のおすすめへ更新しました。",
      ai_status_denied: "位置情報の取得が許可されなかったため、京都の標準おすすめを表示しています。"
    }
  };

  const aiSpotTranslations = {
    Kiyomizudera: { ko: "기요미즈데라", en: "Kiyomizudera", ja: "清水寺" },
    YasakaShrine: { ko: "야사카 신사", en: "Yasaka Shrine", ja: "八坂神社" },
    GionShirakawa: { ko: "기온 시라카와", en: "Gion Shirakawa", ja: "祇園白川" },
    NijoCastle: { ko: "니조성", en: "Nijo Castle", ja: "二条城" },
    HeianShrine: { ko: "헤이안 신궁", en: "Heian Shrine", ja: "平安神宮" },
    ArashiyamaBambooGrove: { ko: "아라시야마 대나무 숲", en: "Arashiyama Bamboo Grove", ja: "嵐山竹林" },

    Higashiyama: { ko: "히가시야마", en: "Higashiyama", ja: "東山" },
    Gion: { ko: "기온", en: "Gion", ja: "祇園" },
    Nakagyo: { ko: "나카교", en: "Nakagyo", ja: "中京" },
    Okazaki: { ko: "오카자키", en: "Okazaki", ja: "岡崎" },
    Arashiyama: { ko: "아라시야마", en: "Arashiyama", ja: "嵐山" }
  };

  const aiFoodTranslations = {
    MoriyaGionArea: {
      ko: "철판구이 / 기온",
      en: "Teppanyaki / Gion",
      ja: "鉄板焼き / 祇園"
    },
    GionKatanaArea: {
      ko: "야키토리 / 기온",
      en: "Yakitori / Gion",
      ja: "焼き鳥 / 祇園"
    },
    YoshinoArea: {
      ko: "스시 / 교토",
      en: "Sushi / Kyoto",
      ja: "寿司 / 京都"
    },
    UshiNoHoneArea: {
      ko: "이자카야 / 교토",
      en: "Izakaya / Kyoto",
      ja: "居酒屋 / 京都"
    },
    ChaoChaoArea: {
      ko: "중식 / 교토",
      en: "Chinese / Kyoto",
      ja: "中華 / 京都"
    },
    VegOutArea: {
      ko: "비건 / 교토",
      en: "Vegan / Kyoto",
      ja: "ビーガン / 京都"
    }
  };

  function rt(key) {
    return runtimeTexts[currentLanguage]?.[key] || runtimeTexts.ko[key] || key;
  }

  function tt(key) {
    return translations[currentLanguage]?.[key] || translations.ko[key] || "";
  }

  /* =========================
     FOOD TOGGLE
  ========================= */
  const foodToggleButtons = document.querySelectorAll(".food-toggle-btn");
  const foodPanels = document.querySelectorAll(".food-slide-panel");

  function closeAllFoodPanels() {
    foodPanels.forEach((panel) => panel.classList.remove("open"));
    foodToggleButtons.forEach((btn) => {
      btn.classList.remove("is-open");
      btn.textContent = tt("food_toggle_symbol") || "+";
    });
  }

  foodToggleButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();

      const targetId = button.dataset.target;
      const targetPanel = document.getElementById(targetId);
      if (!targetPanel) return;

      const isOpen = targetPanel.classList.contains("open");
      closeAllFoodPanels();

      if (!isOpen) {
        targetPanel.classList.add("open");
        button.classList.add("is-open");
        button.textContent = "−";
      }
    });
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".food-area-item")) {
      closeAllFoodPanels();
    }
  });

  /* =========================
     SAKURA SLIDER
  ========================= */
  const sakuraSlidesEl = document.getElementById("sakuraSlides");
  const sakuraCards = document.querySelectorAll(".sakura-slide-card");
  const sakuraPrev = document.querySelector(".sakura-prev");
  const sakuraNext = document.querySelector(".sakura-next");
  const sakuraDotsEl = document.getElementById("sakuraDots");

  let sakuraIndex = 0;
  let sakuraAuto = null;

  function buildSakuraDots() {
    if (!sakuraDotsEl || !sakuraCards.length) return;

    sakuraDotsEl.innerHTML = "";

    sakuraCards.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "sakura-dot";
      if (index === 0) dot.classList.add("active");

      dot.addEventListener("click", () => {
        sakuraIndex = index;
        updateSakuraSlider();
        restartSakuraAuto();
      });

      sakuraDotsEl.appendChild(dot);
    });
  }

  function updateSakuraSlider() {
    if (!sakuraSlidesEl || !sakuraCards.length) return;
    sakuraSlidesEl.style.transform = `translateX(-${sakuraIndex * 100}%)`;

    if (sakuraDotsEl) {
      const dots = sakuraDotsEl.querySelectorAll(".sakura-dot");
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === sakuraIndex);
      });
    }
  }

  function nextSakuraSlide() {
    if (!sakuraCards.length) return;
    sakuraIndex = (sakuraIndex + 1) % sakuraCards.length;
    updateSakuraSlider();
  }

  function prevSakuraSlide() {
    if (!sakuraCards.length) return;
    sakuraIndex = (sakuraIndex - 1 + sakuraCards.length) % sakuraCards.length;
    updateSakuraSlider();
  }

  function startSakuraAuto() {
    if (!sakuraCards.length) return;
    clearInterval(sakuraAuto);
    sakuraAuto = setInterval(() => {
      nextSakuraSlide();
    }, 5000);
  }

  function restartSakuraAuto() {
    clearInterval(sakuraAuto);
    startSakuraAuto();
  }

  if (sakuraPrev) {
    sakuraPrev.addEventListener("click", () => {
      prevSakuraSlide();
      restartSakuraAuto();
    });
  }

  if (sakuraNext) {
    sakuraNext.addEventListener("click", () => {
      nextSakuraSlide();
      restartSakuraAuto();
    });
  }

  if (sakuraSlidesEl && sakuraCards.length > 0) {
    buildSakuraDots();
    updateSakuraSlider();
    startSakuraAuto();
  }

  /* =========================
     EVENTS SLIDER
  ========================= */
  const eventsSlider = document.getElementById("eventsSlider");
  const prevBtn = document.querySelector(".events-prev");
  const nextBtn = document.querySelector(".events-next");
  const eventCards = document.querySelectorAll(".event-card");
  const eventsCurrent = document.getElementById("eventsCurrent");
  const eventsTotal = document.getElementById("eventsTotal");

  if (eventsTotal) {
    eventsTotal.textContent = eventCards.length;
  }

  function getEventGap() {
    return window.innerWidth <= 768 ? 14 : 20;
  }

  function getScrollAmount() {
    const card = eventCards[0];
    if (!card) return 300;
    return card.offsetWidth + getEventGap();
  }

  function updateEventCounter() {
    if (!eventsSlider || !eventCards.length) return;

    const cardWidth = getScrollAmount();
    const index = Math.round(eventsSlider.scrollLeft / cardWidth) + 1;
    const safeIndex = Math.max(1, Math.min(index, eventCards.length));

    if (eventsCurrent) {
      eventsCurrent.textContent = safeIndex;
    }
  }

  if (prevBtn && eventsSlider) {
    prevBtn.addEventListener("click", () => {
      eventsSlider.scrollBy({
        left: -getScrollAmount(),
        behavior: "smooth"
      });
    });
  }

  if (nextBtn && eventsSlider) {
    nextBtn.addEventListener("click", () => {
      eventsSlider.scrollBy({
        left: getScrollAmount(),
        behavior: "smooth"
      });
    });
  }

  if (eventsSlider) {
    eventsSlider.addEventListener("scroll", updateEventCounter);
    window.addEventListener("load", updateEventCounter);
    window.addEventListener("resize", updateEventCounter);
    updateEventCounter();
  }

  /* =========================
     AI GUIDE
  ========================= */
  const aiGuideStatus = document.getElementById("aiGuideStatus");
  const spotsList = document.getElementById("spotsList");
  const foodList = document.getElementById("foodList");
  const locateBtn = document.getElementById("locateBtn");

  const defaultLocation = {
    lat: 35.0037,
    lng: 135.7680,
    name: "Central Kyoto"
  };

  const nearbySpots = [
    { key: "Kiyomizudera", areaKey: "Higashiyama", lat: 34.9949, lng: 135.7850 },
    { key: "YasakaShrine", areaKey: "Gion", lat: 35.0037, lng: 135.7788 },
    { key: "GionShirakawa", areaKey: "Gion", lat: 35.0063, lng: 135.7768 },
    { key: "NijoCastle", areaKey: "Nakagyo", lat: 35.0142, lng: 135.7481 },
    { key: "HeianShrine", areaKey: "Okazaki", lat: 35.0159, lng: 135.7823 },
    { key: "ArashiyamaBambooGrove", areaKey: "Arashiyama", lat: 35.0170, lng: 135.6713 }
  ];

  const nearbyFood = [
    { name: "モーリヤ祇園", areaKey: "MoriyaGionArea", lat: 35.0039, lng: 135.7769 },
    { name: "祇園刀", areaKey: "GionKatanaArea", lat: 35.0035, lng: 135.7778 },
    { name: "寿司よし乃", areaKey: "YoshinoArea", lat: 35.0094, lng: 135.7635 },
    { name: "うしのほね", areaKey: "UshiNoHoneArea", lat: 35.0082, lng: 135.7701 },
    { name: "CHAO CHAO", areaKey: "ChaoChaoArea", lat: 35.0055, lng: 135.7648 },
    { name: "Veg Out", areaKey: "VegOutArea", lat: 34.9986, lng: 135.7720 }
  ];

  function toRad(value) {
    return (value * Math.PI) / 180;
  }

  function getDistanceKm(lat1, lng1, lat2, lng2) {
    const earthRadius = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadius * c;
  }

  function localizeSpot(place) {
    return {
      ...place,
      name: aiSpotTranslations[place.key]?.[currentLanguage] || place.key,
      area: aiSpotTranslations[place.areaKey]?.[currentLanguage] || place.areaKey
    };
  }

  function localizeFood(place) {
    return {
      ...place,
      area: aiFoodTranslations[place.areaKey]?.[currentLanguage] || place.areaKey
    };
  }

  function getSortedPlaces(userLocation, places, localizeFn) {
    return [...places]
      .map((place) => {
        const localized = localizeFn(place);
        const distance = getDistanceKm(
          userLocation.lat,
          userLocation.lng,
          place.lat,
          place.lng
        );

        return {
          ...localized,
          distance
        };
      })
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 3);
  }

  function createGoogleMapsSearchUrl(name) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + " Kyoto")}`;
  }

  function createGoogleMapsDirectionUrl(lat, lng) {
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=walking`;
  }

  function renderCards(targetEl, items) {
    if (!targetEl) return;

    targetEl.innerHTML = items
      .map((item) => {
        return `
          <article class="ai-guide__card">
            <div class="ai-guide__card-top">
              <h4 class="ai-guide__card-title">${item.name}</h4>
              <span class="ai-guide__badge">${item.distance.toFixed(1)} km</span>
            </div>
            <p class="ai-guide__meta">${item.area}</p>
            <div class="ai-guide__buttons">
              <a href="${createGoogleMapsDirectionUrl(item.lat, item.lng)}" target="_blank" rel="noopener noreferrer" class="ai-guide__link ai-guide__link--primary">${rt("ai_walk_maps")}</a>
              <a href="${createGoogleMapsSearchUrl(item.name)}" target="_blank" rel="noopener noreferrer" class="ai-guide__link ai-guide__link--secondary">${rt("ai_view_place")}</a>
            </div>
          </article>
        `;
      })
      .join("");
  }

  function updateAiGuide(locationData, labelText) {
    const sortedSpots = getSortedPlaces(locationData, nearbySpots, localizeSpot);
    const sortedFood = getSortedPlaces(locationData, nearbyFood, localizeFood);

    renderCards(spotsList, sortedSpots);
    renderCards(foodList, sortedFood);

    if (aiGuideStatus) {
      aiGuideStatus.textContent = labelText;
    }
  }

  function updateAiGuideByKey(locationData, statusKey) {
    currentGuideLocation = locationData;
    currentGuideStatusKey = statusKey;
    updateAiGuide(locationData, rt(statusKey));
  }

  currentGuideLocation = defaultLocation;

  if (spotsList && foodList) {
    updateAiGuideByKey(defaultLocation, "ai_status_default");
  }

  if (locateBtn) {
    locateBtn.addEventListener("click", () => {
      if (!navigator.geolocation) {
        if (aiGuideStatus) {
          aiGuideStatus.textContent = rt("ai_status_unsupported");
        }
        return;
      }

      if (aiGuideStatus) {
        aiGuideStatus.textContent = rt("ai_status_finding");
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          updateAiGuideByKey(userLocation, "ai_status_current");
        },
        () => {
          updateAiGuideByKey(defaultLocation, "ai_status_denied");
        }
      );
    });
  }

  /* =========================
     LANGUAGE SWITCH
  ========================= */
  const langButtons = document.querySelectorAll(".lang-btn");

  function setLanguage(lang) {
    const dict = translations[lang];
    if (!dict) return;

    currentLanguage = lang;

    const translatableEls = document.querySelectorAll("[data-i18n]");
    translatableEls.forEach((el) => {
      const key = el.dataset.i18n;
      const attr = el.dataset.i18nAttr;

      if (!dict[key]) return;

      if (attr) {
        el.setAttribute(attr, dict[key]);
      } else {
        el.textContent = dict[key];
      }
    });

    langButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });

    document.documentElement.lang = lang;
    localStorage.setItem("siteLanguage", lang);

    foodToggleButtons.forEach((btn) => {
      if (!btn.classList.contains("is-open")) {
        btn.textContent = dict.food_toggle_symbol || "+";
      }
    });

    if (spotsList && foodList && currentGuideLocation) {
      updateAiGuideByKey(currentGuideLocation, currentGuideStatusKey);
    }
  }

  const savedLanguage = localStorage.getItem("siteLanguage") || "ko";
  setLanguage(savedLanguage);

  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;
      setLanguage(lang);
    });
  });

  /* =========================
     SMOOTH SCROLL
  ========================= */
  const scrollLinks = document.querySelectorAll('a[href^="#"]');

  scrollLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });
});
