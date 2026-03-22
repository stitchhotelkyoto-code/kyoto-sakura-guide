document.addEventListener("DOMContentLoaded", () => {
  const HOTEL_DATA = {
    soraniwa: {
      hero: {
        kicker: "HOTEL GUIDE",
        title: "Soraniwa Hotel",
        sub: "하늘과 교토의 봄을 여유롭게 즐기는 스테이",
        desc: "Soraniwa Hotel은 차분한 교토 산책과 봄 풍경을 천천히 즐기고 싶은 고객에게 어울리는 호텔입니다. 객실에서의 휴식, 바에서의 한 잔, 조식과 석식까지 하루 흐름 전체를 교토다운 리듬으로 이어갈 수 있도록 구성했습니다.",
        tabs: ["Soraniwa", "Soraniwa Bettei"]
      },
      brand: {
        kicker: "BRAND VIEW",
        title: "Soraniwa에서 시작하는 교토의 봄",
        desc: "기온・야사카・마루야마 공원 등 교토다운 화려한 봄을 여유롭게 즐기고 싶은 고객에게 추천합니다."
      },
      gallery: [
        {
          title: "Room Hanami",
          desc: "객실에서 한숨 돌린 뒤 천천히 봄의 교토를 즐겨보세요.",
          image: "images/hotels/soraniwa-room.jpg"
        },
        {
          title: "Bar Time",
          desc: "저녁 산책 전후로 분위기 있게 머물기 좋은 바 이미지에 맞춘 카드입니다.",
          image: "images/hotels/soraniwa-bar.jpg"
        },
        {
          title: "Breakfast Start",
          desc: "부드럽게 하루를 열어 주는 조식 이미지용 카드입니다.",
          image: "images/hotels/soraniwa-breakfast.jpg"
        },
        {
          title: "Dinner Course",
          desc: "하루 마무리를 조금 더 특별하게 만드는 석식 이미지용 카드입니다.",
          image: "images/hotels/soraniwa-dinner.jpg"
        }
      ],
      courses: [
        {
          no: "01",
          title: "호텔 출발 · 기온 저녁 산책 코스",
          sub: "Soraniwa → 기온 시라카와 → 야사카 신사 → 마루야마 공원 → 카모강",
          route: "Soraniwa Hotel → Gion Shirakawa → Yasaka Shrine → Maruyama Park → Kamogawa",
          detail: "호텔에서 출발해 교토다운 거리 분위기를 가장 쉽게 느낄 수 있는 대표 저녁 코스입니다. 해 질 무렵 기온 시라카와를 지나 야사카 신사와 마루야마 공원을 걸은 뒤 카모강 쪽으로 내려오면 밤 분위기까지 깔끔하게 이어집니다.",
          direction: "https://www.google.com/maps/dir/?api=1&origin=Soraniwa+Hotel+Kyoto&destination=Kamogawa+Kyoto&waypoints=Gion+Shirakawa+Kyoto|Yasaka+Shrine+Kyoto|Maruyama+Park+Kyoto"
        },
        {
          no: "02",
          title: "호텔 출발 · 벚꽃 하이라이트 코스",
          sub: "Soraniwa → 마루야마 공원 → 고다이지 → 엔토쿠인 → 기요미즈데라",
          route: "Soraniwa Hotel → Maruyama Park → Kodai-ji → Entoku-in → Kiyomizu-dera",
          detail: "벚꽃 시즌에 가장 만족도가 높은 히가시야마 중심 코스입니다. 공원형 벚꽃, 절의 정원 벚꽃, 전망형 야간 감상까지 연결되기 때문에 사진과 분위기 둘 다 챙기기 좋습니다.",
          direction: "https://www.google.com/maps/dir/?api=1&origin=Soraniwa+Hotel+Kyoto&destination=Kiyomizu-dera+Kyoto&waypoints=Maruyama+Park+Kyoto|Kodai-ji+Kyoto|Entoku-in+Kyoto"
        },
        {
          no: "03",
          title: "호텔 출발 · 아침 산책 코스",
          sub: "Soraniwa → 카모강 → 폰토초 → 니시키 시장 → 가와라마치",
          route: "Soraniwa Hotel → Kamogawa → Pontocho → Nishiki Market → Kawaramachi",
          detail: "늦잠 대신 가볍게 움직이고 싶은 고객용 코스입니다. 강변 공기부터 시장 골목까지 이어져 조식 후 반나절 코스로 좋고, 쇼핑과 카페 동선을 섞기에도 편합니다.",
          direction: "https://www.google.com/maps/dir/?api=1&origin=Soraniwa+Hotel+Kyoto&destination=Kawaramachi+Kyoto&waypoints=Kamogawa+Kyoto|Pontocho+Kyoto|Nishiki+Market+Kyoto"
        },
        {
          no: "04",
          title: "호텔 출발 · 전통 거리 집중 코스",
          sub: "Soraniwa → 야사카 신사 → 니넨자카 → 산넨자카 → 기요미즈데라",
          route: "Soraniwa Hotel → Yasaka Shrine → Ninenzaka → Sannenzaka → Kiyomizu-dera",
          detail: "전통적인 교토 사진과 골목 분위기를 가장 진하게 느낄 수 있는 클래식 코스입니다. 천천히 걸으며 기념사진을 남기고, 중간중간 디저트나 기념품 쇼핑을 넣기 좋습니다.",
          direction: "https://www.google.com/maps/dir/?api=1&origin=Soraniwa+Hotel+Kyoto&destination=Kiyomizu-dera+Kyoto&waypoints=Yasaka+Shrine+Kyoto|Ninenzaka+Kyoto|Sannenzaka+Kyoto"
        },
        {
          no: "05",
          title: "호텔 출발 · 저녁 식사 연계 코스",
          sub: "Soraniwa → 기온 → 하나미코지 → 바/디너 → 호텔 복귀",
          route: "Soraniwa Hotel → Gion → Hanamikoji → Dinner & Bar → Soraniwa Hotel",
          detail: "관광을 크게 하지 않고 호텔 주변에서 분위기 좋게 하루를 마무리하고 싶은 고객에게 어울립니다. 기온 거리 산책 후 저녁 식사와 바 이용까지 자연스럽게 이어지는 구성이 장점입니다.",
          direction: "https://www.google.com/maps/dir/?api=1&origin=Soraniwa+Hotel+Kyoto&destination=Hanamikoji+Street+Kyoto&waypoints=Gion+Kyoto"
        }
      ],
      foods: [
        {
          no: "01",
          name: "モーリヤ祇園",
          type: "鉄板焼き",
          direction: "https://www.google.com/maps/search/?api=1&query=%E3%83%A2%E3%83%BC%E3%83%AA%E3%83%A4%E7%A5%87%E5%9C%92+Kyoto"
        },
        {
          no: "02",
          name: "のいち",
          type: "鉄板焼き",
          direction: "https://www.google.com/maps/search/?api=1&query=%E3%81%AE%E3%81%84%E3%81%A1+Kyoto"
        },
        {
          no: "03",
          name: "一笑",
          type: "焼肉",
          direction: "https://www.google.com/maps/search/?api=1&query=%E4%B8%80%E7%AC%91+Kyoto"
        },
        {
          no: "04",
          name: "寿司よし乃",
          type: "寿司",
          direction: "https://www.google.com/maps/search/?api=1&query=%E5%AF%BF%E5%8F%B8%E3%82%88%E3%81%97%E4%B9%83+Kyoto"
        },
        {
          no: "05",
          name: "うしのほね",
          type: "居酒屋",
          direction: "https://www.google.com/maps/search/?api=1&query=%E3%81%86%E3%81%97%E3%81%AE%E3%81%BB%E3%81%AD+Kyoto"
        }
      ],
      events: [
        {
          no: "01",
          name: "기요미즈데라 봄 야간 특별관람",
          sub: "Official",
          link: "https://www.kiyomizudera.or.jp/en/visit/special_night_viewing/"
        },
        {
          no: "02",
          name: "기온 시라카와 야간 벚꽃 라이트업",
          sub: "Official",
          link: "https://ja.kyoto.travel/event/single.php?event_id=4544"
        },
        {
          no: "03",
          name: "마루야마 공원 벚꽃 정보",
          sub: "Official",
          link: "https://kyoto.travel/en/destinations/maruyama-park/"
        },
        {
          no: "04",
          name: "고다이지 봄 야간 특별관람",
          sub: "Official",
          link: "https://www.kodaiji.com/saiji.html"
        },
        {
          no: "05",
          name: "헤이안신궁 벚꽃 다도 이벤트",
          sub: "Official",
          link: "https://kyoto.travel/en/areas/okazaki/"
        }
      ]
    },

    bettei: {
      hero: {
        kicker: "HOTEL GUIDE",
        title: "Soraniwa Bettei",
        sub: "좀 더 프라이빗하게 즐기는 교토의 봄",
        desc: "Soraniwa Bettei는 한층 조용하고 여유로운 분위기를 선호하는 고객을 위한 선택지입니다. 객실에서의 쉼, 바에서의 한 잔, 조식과 석식까지 조금 더 차분하고 정돈된 무드로 즐기기 좋은 흐름을 상정해 구성했습니다.",
        tabs: ["Soraniwa", "Soraniwa Bettei"]
      },
      brand: {
        kicker: "BRAND VIEW",
        title: "Bettei에서 시작하는 여유로운 교토",
        desc: "조용한 동선, 정돈된 식사, 밤 산책까지 담백하게 즐기고 싶은 고객에게 추천합니다."
      },
      gallery: [
        {
          title: "Private Room",
          desc: "좀 더 프라이빗한 분위기의 객실 이미지용 카드입니다.",
          image: "images/hotels/bettei-room.jpg"
        },
        {
          title: "Bar Lounge",
          desc: "조용히 한 잔 즐기는 바 이미지에 맞춘 설명입니다.",
          image: "images/hotels/bettei-bar.jpg"
        },
        {
          title: "Morning Breakfast",
          desc: "차분한 아침 흐름을 만드는 조식 이미지용 카드입니다.",
          image: "images/hotels/bettei-breakfast.jpg"
        },
        {
          title: "Evening Dining",
          desc: "조용한 디너 타임과 잘 어울리는 석식 이미지용 카드입니다.",
          image: "images/hotels/bettei-dinner.jpg"
        }
      ],
      courses: [
        {
          no: "01",
          title: "호텔 출발 · 조용한 히가시야마 코스",
          sub: "Bettei → 고다이지 → 엔토쿠인 → 네네노미치 → 야사카",
          route: "Soraniwa Bettei → Kodai-ji → Entoku-in → Nene-no-Michi → Yasaka Shrine",
          detail: "복잡한 메인 동선보다 분위기 있는 길을 천천히 걷는 데 초점을 둔 코스입니다. 정원과 돌길, 야간 조명 감상이 모두 잘 어울립니다.",
          direction: "https://www.google.com/maps/dir/?api=1&origin=Soraniwa+Bettei+Kyoto&destination=Yasaka+Shrine+Kyoto&waypoints=Kodai-ji+Kyoto|Entoku-in+Kyoto|Nene-no-Michi+Kyoto"
        },
        {
          no: "02",
          title: "호텔 출발 · 디저트 & 산책 코스",
          sub: "Bettei → 니넨자카 → 산넨자카 → 기요미즈데라 → 기온",
          route: "Soraniwa Bettei → Ninenzaka → Sannenzaka → Kiyomizu-dera → Gion",
          detail: "골목 구경과 카페, 기념품 쇼핑을 함께 즐기기 좋은 코스입니다. 이동이 무리하지 않고 교토다운 사진을 남기기에도 적합합니다.",
          direction: "https://www.google.com/maps/dir/?api=1&origin=Soraniwa+Bettei+Kyoto&destination=Gion+Kyoto&waypoints=Ninenzaka+Kyoto|Sannenzaka+Kyoto|Kiyomizu-dera+Kyoto"
        },
        {
          no: "03",
          title: "호텔 출발 · 벚꽃 야경 코스",
          sub: "Bettei → 마루야마 공원 → 기온 시라카와 → 하나미코지",
          route: "Soraniwa Bettei → Maruyama Park → Gion Shirakawa → Hanamikoji",
          detail: "낮보다 밤이 더 어울리는 고객용 코스입니다. 마루야마 공원 벚꽃과 기온 시라카와 라이트업, 하나미코지 분위기를 한 번에 묶었습니다.",
          direction: "https://www.google.com/maps/dir/?api=1&origin=Soraniwa+Bettei+Kyoto&destination=Hanamikoji+Street+Kyoto&waypoints=Maruyama+Park+Kyoto|Gion+Shirakawa+Kyoto"
        },
        {
          no: "04",
          title: "호텔 출발 · 카모강 리듬 코스",
          sub: "Bettei → 기온 → 폰토초 → 카모강 → 가와라마치",
          route: "Soraniwa Bettei → Gion → Pontocho → Kamogawa → Kawaramachi",
          detail: "관광보다 분위기 위주로 가볍게 움직이고 싶은 고객에게 추천하는 도시형 산책 코스입니다. 저녁 식사 동선과도 잘 맞습니다.",
          direction: "https://www.google.com/maps/dir/?api=1&origin=Soraniwa+Bettei+Kyoto&destination=Kawaramachi+Kyoto&waypoints=Gion+Kyoto|Pontocho+Kyoto|Kamogawa+Kyoto"
        },
        {
          no: "05",
          title: "호텔 출발 · 반나절 집중 코스",
          sub: "Bettei → 야사카 신사 → 마루야마 공원 → 지온인 주변 → 호텔 복귀",
          route: "Soraniwa Bettei → Yasaka Shrine → Maruyama Park → Chion-in Area → Soraniwa Bettei",
          detail: "멀리 가지 않고 히가시야마 핵심만 짧고 굵게 즐기는 구성입니다. 체크인 전후의 반나절 동선으로도 잘 맞습니다.",
          direction: "https://www.google.com/maps/dir/?api=1&origin=Soraniwa+Bettei+Kyoto&destination=Chion-in+Kyoto&waypoints=Yasaka+Shrine+Kyoto|Maruyama+Park+Kyoto"
        }
      ],
      foods: [
        {
          no: "01",
          name: "モーリヤ祇園",
          type: "鉄板焼き",
          direction: "https://www.google.com/maps/search/?api=1&query=%E3%83%A2%E3%83%BC%E3%83%AA%E3%83%A4%E7%A5%87%E5%9C%92+Kyoto"
        },
        {
          no: "02",
          name: "のいち",
          type: "鉄板焼き",
          direction: "https://www.google.com/maps/search/?api=1&query=%E3%81%AE%E3%81%84%E3%81%A1+Kyoto"
        },
        {
          no: "03",
          name: "祇園刀",
          type: "焼き鳥",
          direction: "https://www.google.com/maps/search/?api=1&query=%E7%A5%87%E5%9C%92%E5%88%80+Kyoto"
        },
        {
          no: "04",
          name: "銀座おのでら",
          type: "寿司",
          direction: "https://www.google.com/maps/search/?api=1&query=%E9%8A%80%E5%BA%A7%E3%81%8A%E3%81%AE%E3%81%A7%E3%82%89+Kyoto"
        },
        {
          no: "05",
          name: "うしのほね",
          type: "居酒屋",
          direction: "https://www.google.com/maps/search/?api=1&query=%E3%81%86%E3%81%97%E3%81%AE%E3%81%BB%E3%81%AD+Kyoto"
        }
      ],
      events: [
        {
          no: "01",
          name: "고다이지 봄 야간 특별관람",
          sub: "Official",
          link: "https://www.kodaiji.com/saiji.html"
        },
        {
          no: "02",
          name: "기요미즈데라 봄 야간 특별관람",
          sub: "Official",
          link: "https://www.kiyomizudera.or.jp/en/visit/special_night_viewing/"
        },
        {
          no: "03",
          name: "기온 시라카와 야간 벚꽃 라이트업",
          sub: "Official",
          link: "https://ja.kyoto.travel/event/single.php?event_id=4544"
        },
        {
          no: "04",
          name: "마루야마 공원 벚꽃 정보",
          sub: "Official",
          link: "https://kyoto.travel/en/destinations/maruyama-park/"
        },
        {
          no: "05",
          name: "헤이안신궁 벚꽃 다도 이벤트",
          sub: "Official",
          link: "https://kyoto.travel/en/areas/okazaki/"
        }
      ]
    },

    hiyori: {
      hero: {
        kicker: "HOTEL GUIDE",
        title: "Hiyori Stay Kyoto Gojo",
        sub: "실용적인 동선으로 편하게 즐기는 교토 스테이",
        desc: "Hiyori Stay Kyoto Gojo는 교토 시내 이동이 편하고, 카페와 식사, 관광 동선을 균형 있게 짜기 좋은 거점형 호텔입니다. 객실, 카페 무드, 조식, 프론트 이미지를 중심으로 좀 더 친근하고 실용적인 흐름으로 구성했습니다.",
        tabs: ["Hiyori Stay Kyoto Gojo"]
      },
      brand: {
        kicker: "BRAND VIEW",
        title: "Hiyori에서 시작하는 가볍고 편한 교토",
        desc: "고조·시치조·교토역 방향과 히가시야마 방향을 균형 있게 움직이고 싶은 고객에게 추천합니다."
      },
      gallery: [
        {
          title: "Comfort Room",
          desc: "편하게 쉬기 좋은 객실 이미지용 카드입니다.",
          image: "images/hotels/hiyori-room.jpg"
        },
        {
          title: "Cafe Stop",
          desc: "가벼운 카페 이용 분위기에 맞춘 카드입니다.",
          image: "images/hotels/hiyori-cafe.jpg"
        },
        {
          title: "Breakfast Easy",
          desc: "산뜻하게 하루를 시작하는 조식 이미지용 카드입니다.",
          image: "images/hotels/hiyori-breakfast.jpg"
        },
        {
          title: "Front Welcome",
          desc: "체크인과 응대 이미지를 위한 프론트 카드입니다.",
          image: "images/hotels/hiyori-front.jpg"
        }
      ],
      courses: [
        {
          no: "01",
          title: "호텔 출발 · 고조 기본 코스",
          sub: "Hiyori → 가모강 → 시치조 → 산쥬산겐도 → 교토역",
          route: "Hiyori Stay Kyoto Gojo → Kamogawa → Shichijo → Sanjusangendo → Kyoto Station",
          detail: "무리 없이 이동하면서 교토 시내 감각을 익히기 좋은 입문 코스입니다. 강변 산책, 사찰, 역 주변 쇼핑까지 자연스럽게 연결됩니다.",
          direction: "https://www.google.com/maps/dir/?api=1&origin=Hiyori+Stay+Kyoto+Gojo&destination=Kyoto+Station&waypoints=Kamogawa+Kyoto|Sanjusangendo+Kyoto"
        },
        {
          no: "02",
          title: "호텔 출발 · 카페 & 산책 코스",
          sub: "Hiyori → 고조 거리 → 카페 → 가와라마치 → 니시키 시장",
          route: "Hiyori Stay Kyoto Gojo → Gojo Street → Cafe Stop → Kawaramachi → Nishiki Market",
          detail: "오전이나 늦은 오후에 가볍게 움직이기 좋은 실용형 코스입니다. 카페 방문과 시장 구경을 함께 넣어 여행 템포를 너무 무겁지 않게 유지할 수 있습니다.",
          direction: "https://www.google.com/maps/dir/?api=1&origin=Hiyori+Stay+Kyoto+Gojo&destination=Nishiki+Market+Kyoto&waypoints=Kawaramachi+Kyoto"
        },
        {
          no: "03",
          title: "호텔 출발 · 기요미즈 반나절 코스",
          sub: "Hiyori → 기요미즈데라 → 니넨자카 → 산넨자카 → 야사카",
          route: "Hiyori Stay Kyoto Gojo → Kiyomizu-dera → Ninenzaka → Sannenzaka → Yasaka Shrine",
          detail: "Hiyori에서 가장 활용하기 쉬운 대표 관광 코스입니다. 교토다운 골목과 사찰, 쇼핑 포인트가 한 번에 들어 있어 첫 방문객에게 특히 잘 맞습니다.",
          direction: "https://www.google.com/maps/dir/?api=1&origin=Hiyori+Stay+Kyoto+Gojo&destination=Yasaka+Shrine+Kyoto&waypoints=Kiyomizu-dera+Kyoto|Ninenzaka+Kyoto|Sannenzaka+Kyoto"
        },
        {
          no: "04",
          title: "호텔 출발 · 교토역 야간 코스",
          sub: "Hiyori → 교토역 → 도지 → 야간 라이트업 → 복귀",
          route: "Hiyori Stay Kyoto Gojo → Kyoto Station → To-ji Temple → Night View → Hiyori Stay Kyoto Gojo",
          detail: "교토역 방향 접근성이 좋은 장점을 살린 야간 코스입니다. 도지 라이트업이나 역 주변 야경, 저녁 식사와 조합하기 쉽습니다.",
          direction: "https://www.google.com/maps/dir/?api=1&origin=Hiyori+Stay+Kyoto+Gojo&destination=To-ji+Temple+Kyoto&waypoints=Kyoto+Station"
        },
        {
          no: "05",
          title: "호텔 출발 · 실속형 먹거리 코스",
          sub: "Hiyori → 라멘/이자카야 → 가모강 산책 → 호텔 복귀",
          route: "Hiyori Stay Kyoto Gojo → Food Spot → Kamogawa → Hiyori Stay Kyoto Gojo",
          detail: "관광보다 식사 만족도를 우선하고 싶은 고객용 코스입니다. Hiyori Pick 음식점을 중심으로 저녁을 보내고, 강변 산책으로 마무리하면 부담이 없습니다.",
          direction: "https://www.google.com/maps/dir/?api=1&origin=Hiyori+Stay+Kyoto+Gojo&destination=Kamogawa+Kyoto"
        }
      ],
      foods: [
        {
          no: "01",
          name: "おにかい",
          type: "居酒屋",
          direction: "https://www.google.com/maps/search/?api=1&query=%E3%81%8A%E3%81%AB%E3%81%8B%E3%81%84+Kyoto"
        },
        {
          no: "02",
          name: "晴れ晴れ",
          type: "居酒屋",
          direction: "https://www.google.com/maps/search/?api=1&query=%E6%99%B4%E3%82%8C%E6%99%B4%E3%82%8C+Kyoto"
        },
        {
          no: "03",
          name: "雅 炭火焼鳥",
          type: "居酒屋 / 焼鳥",
          direction: "https://www.google.com/maps/search/?api=1&query=%E9%9B%85+%E7%82%AD%E7%81%AB%E7%84%BC%E9%B3%A5+Kyoto"
        },
        {
          no: "04",
          name: "麺屋EDITION京都本店",
          type: "ラーメン",
          direction: "https://www.google.com/maps/search/?api=1&query=%E9%BA%BA%E5%B1%8BEDITION%E4%BA%AC%E9%83%BD%E6%9C%AC%E5%BA%97"
        },
        {
          no: "05",
          name: "ラーメンの坊歩 七条本店",
          type: "ラーメン",
          direction: "https://www.google.com/maps/search/?api=1&query=%E3%83%A9%E3%83%BC%E3%83%A1%E3%83%B3%E3%81%AE%E5%9D%8A%E6%AD%A9+%E4%B8%83%E6%9D%A1%E6%9C%AC%E5%BA%97"
        }
      ],
      events: [
        {
          no: "01",
          name: "도지 벚꽃 야간 특별관람",
          sub: "Official",
          link: "https://toji.or.jp/"
        },
        {
          no: "02",
          name: "교토역 주변 봄 이벤트 안내",
          sub: "Official",
          link: "https://kyoto.travel/en/areas/around-kyoto-station/"
        },
        {
          no: "03",
          name: "기요미즈데라 봄 야간 특별관람",
          sub: "Official",
          link: "https://www.kiyomizudera.or.jp/en/visit/special_night_viewing/"
        },
        {
          no: "04",
          name: "니조성 사쿠라 페스티벌",
          sub: "Official",
          link: "https://nijo-jocastle.city.kyoto.lg.jp/event/?lang=en"
        },
        {
          no: "05",
          name: "교토시 봄 벚꽃 캘린더",
          sub: "Official",
          link: "https://kyoto.travel/en/seasonal-info/cherryblossom/"
        }
      ]
    },

    stitch: {
      hero: {
        kicker: "HOTEL GUIDE",
        title: "STITCH HOTEL Kyoto",
        sub: "도심 감도와 교토 산책을 함께 즐기는 스테이",
        desc: "STITCH HOTEL Kyoto는 조금 더 캐주얼하고 감각적인 템포로 교토를 즐기고 싶은 고객에게 잘 맞습니다. 객실, 바, 조식, 프론트 이미지를 중심으로 도심형 동선과 먹거리, 이벤트 접근성을 살려 구성했습니다.",
        tabs: ["STITCH HOTEL Kyoto"]
      },
      brand: {
        kicker: "BRAND VIEW",
        title: "STITCH에서 시작하는 감각적인 교토 시티 스테이",
        desc: "가와라마치·폰토초·기온과의 연결감, 식사와 야간 산책, 캐주얼한 도시 감성을 중시하는 고객에게 추천합니다."
      },
      gallery: [
        {
          title: "City Room",
          desc: "도심형 스테이 무드에 맞춘 객실 이미지용 카드입니다.",
          image: "images/hotels/stitch-room.jpg"
        },
        {
          title: "Bar Mood",
          desc: "저녁 시간과 잘 어울리는 바 이미지용 카드입니다.",
          image: "images/hotels/stitch-bar.jpg"
        },
        {
          title: "Breakfast Table",
          desc: "가볍고 세련된 조식 이미지를 위한 카드입니다.",
          image: "images/hotels/stitch-breakfast.jpg"
        },
        {
          title: "Front Scene",
          desc: "체크인과 프론트 공간 이미지를 위한 카드입니다.",
          image: "images/hotels/stitch-front.jpg"
        }
      ],
      courses: [
        {
          no: "01",
          title: "호텔 출발 · 폰토초 나이트 코스",
          sub: "STITCH → 가와라마치 → 폰토초 → 카모강 → 기온",
          route: "STITCH HOTEL Kyoto → Kawaramachi → Pontocho → Kamogawa → Gion",
          detail: "STITCH의 도심형 장점을 가장 잘 보여 주는 코스입니다. 저녁 식사와 산책, 분위기 있는 사진 포인트가 자연스럽게 이어집니다.",
          direction: "https://www.google.com/maps/dir/?api=1&origin=STITCH+HOTEL+Kyoto&destination=Gion+Kyoto&waypoints=Kawaramachi+Kyoto|Pontocho+Kyoto|Kamogawa+Kyoto"
        },
        {
          no: "02",
          title: "호텔 출발 · 먹거리 집중 코스",
          sub: "STITCH → 니시키 시장 → 가와라마치 → 디너 → 바",
          route: "STITCH HOTEL Kyoto → Nishiki Market → Kawaramachi → Dinner → Bar",
          detail: "식사와 쇼핑, 카페, 밤 분위기를 한 번에 즐기고 싶은 고객용 코스입니다. 걷는 거리가 무리하지 않아 반나절~저녁 루트로 좋습니다.",
          direction: "https://www.google.com/maps/dir/?api=1&origin=STITCH+HOTEL+Kyoto&destination=Nishiki+Market+Kyoto&waypoints=Kawaramachi+Kyoto"
        },
        {
          no: "03",
          title: "호텔 출발 · 기온 클래식 코스",
          sub: "STITCH → 기온 시라카와 → 하나미코지 → 야사카 신사 → 마루야마",
          route: "STITCH HOTEL Kyoto → Gion Shirakawa → Hanamikoji → Yasaka Shrine → Maruyama Park",
          detail: "교토다운 장면을 가장 안정적으로 즐길 수 있는 전통 도시 코스입니다. 저녁 시간대로 잡으면 분위기가 더 살아납니다.",
          direction: "https://www.google.com/maps/dir/?api=1&origin=STITCH+HOTEL+Kyoto&destination=Maruyama+Park+Kyoto&waypoints=Gion+Shirakawa+Kyoto|Hanamikoji+Street+Kyoto|Yasaka+Shrine+Kyoto"
        },
        {
          no: "04",
          title: "호텔 출발 · 벚꽃 이벤트 코스",
          sub: "STITCH → 니조성 또는 기온 라이트업 → 저녁 식사 → 복귀",
          route: "STITCH HOTEL Kyoto → Event Spot → Dinner → STITCH HOTEL Kyoto",
          detail: "그날의 행사 일정에 맞춰 유연하게 움직이기 좋은 코스입니다. STITCH는 중심부에 있어 니조성, 기온, 고다이지 쪽을 선택적으로 붙이기 편합니다.",
          direction: "https://www.google.com/maps/dir/?api=1&origin=STITCH+HOTEL+Kyoto&destination=Nijo+Castle+Kyoto"
        },
        {
          no: "05",
          title: "호텔 출발 · 로컬 식당 산책 코스",
          sub: "STITCH → 로컬 식당 → 강변 산책 → 호텔 복귀",
          route: "STITCH HOTEL Kyoto → Local Food Spot → Kamogawa → STITCH HOTEL Kyoto",
          detail: "복잡한 관광보다 동네 감성과 식사 만족도를 중시하는 고객에게 추천합니다. STITCH Pick 식당들과 연결하기 좋은 흐름입니다.",
          direction: "https://www.google.com/maps/dir/?api=1&origin=STITCH+HOTEL+Kyoto&destination=Kamogawa+Kyoto"
        }
      ],
      foods: [
        {
          no: "01",
          name: "大黒戎先斗町店",
          type: "焼肉",
          direction: "https://www.google.com/maps/search/?api=1&query=%E5%A4%A7%E9%BB%92%E6%88%8E+%E5%85%88%E6%96%97%E7%94%BA%E5%BA%97+Kyoto"
        },
        {
          no: "02",
          name: "善",
          type: "焼肉",
          direction: "https://www.google.com/maps/search/?api=1&query=%E5%96%84+Kyoto+Yakiniku"
        },
        {
          no: "03",
          name: "杉玉",
          type: "寿司",
          direction: "https://www.google.com/maps/search/?api=1&query=%E6%9D%89%E7%8E%89+Kyoto"
        },
        {
          no: "04",
          name: "CHAO CHAO",
          type: "中華",
          direction: "https://www.google.com/maps/search/?api=1&query=CHAO+CHAO+Kyoto"
        },
        {
          no: "05",
          name: "優光",
          type: "ラーメン",
          direction: "https://www.google.com/maps/search/?api=1&query=%E5%84%AA%E5%85%89+Kyoto+Ramen"
        }
      ],
      events: [
        {
          no: "01",
          name: "기온 시라카와 야간 벚꽃 라이트업",
          sub: "Official",
          link: "https://ja.kyoto.travel/event/single.php?event_id=4544"
        },
        {
          no: "02",
          name: "니조성 사쿠라 페스티벌",
          sub: "Official",
          link: "https://nijo-jocastle.city.kyoto.lg.jp/event/?lang=en"
        },
        {
          no: "03",
          name: "고다이지 봄 야간 특별관람",
          sub: "Official",
          link: "https://www.kodaiji.com/saiji.html"
        },
        {
          no: "04",
          name: "기요미즈데라 봄 야간 특별관람",
          sub: "Official",
          link: "https://www.kiyomizudera.or.jp/en/visit/special_night_viewing/"
        },
        {
          no: "05",
          name: "교토시 봄 벚꽃 캘린더",
          sub: "Official",
          link: "https://kyoto.travel/en/seasonal-info/cherryblossom/"
        }
      ]
    }
  };

  function renderHotelPage(hotelKey) {
    const data = HOTEL_DATA[hotelKey];
    if (!data) return;

    const heroBox = document.getElementById("hotelHeroBox");
    const brandBox = document.getElementById("hotelBrandBox");
    const galleryGrid = document.getElementById("hotelGalleryGrid");
    const courseList = document.getElementById("hotelCourseList");
    const foodList = document.getElementById("hotelFoodList");
    const eventList = document.getElementById("hotelEventList");

    heroBox.innerHTML = `
      <p class="hotel-kicker">${data.hero.kicker}</p>
      <h1 class="hotel-main-title">${data.hero.title}</h1>
      <p class="hotel-sub-title">${data.hero.sub}</p>
      <p class="hotel-desc">${data.hero.desc}</p>
      <div class="hotel-tab-row">
        ${data.hero.tabs.map((tab, index) => `
          <button class="hotel-tab-pill ${index === 0 ? "is-active" : ""}" type="button">${tab}</button>
        `).join("")}
      </div>
    `;

    brandBox.innerHTML = `
      <p class="hotel-kicker">${data.brand.kicker}</p>
      <h2 class="hotel-main-title" style="font-size: clamp(2rem, 3vw, 3rem); margin-bottom: 10px;">
        ${data.brand.title}
      </h2>
      <p class="hotel-desc">${data.brand.desc}</p>
    `;

    galleryGrid.innerHTML = data.gallery.map(item => `
      <article class="hotel-gallery-card">
        <img class="hotel-gallery-image" src="${item.image}" alt="${item.title}">
        <div class="hotel-gallery-body">
          <h4>${item.title}</h4>
          <p>${item.desc}</p>
        </div>
      </article>
    `).join("");

    courseList.innerHTML = data.courses.map((item, index) => `
      <div class="hotel-list-item">
        <div class="hotel-list-num">${item.no}</div>
        <div class="hotel-list-text">
          <button
            type="button"
            class="hotel-list-title course-trigger"
            data-index="${index}"
            style="background:none;border:none;padding:0;text-align:left;cursor:pointer;"
          >
            ${item.title}
          </button>
          <span class="hotel-list-sub">${item.sub}</span>
        </div>
        <div class="hotel-list-actions">
          <button type="button" class="hotel-mini-btn is-light course-trigger" data-index="${index}">
            View
          </button>
        </div>
      </div>
    `).join("");

    foodList.innerHTML = data.foods.map(item => `
      <div class="hotel-list-item">
        <div class="hotel-list-num">${item.no}</div>
        <div class="hotel-list-text">
          <span class="hotel-list-title">${item.name}</span>
          <span class="hotel-list-sub">${item.type}</span>
        </div>
        <div class="hotel-list-actions">
          <a class="hotel-mini-btn" href="${item.direction}" target="_blank" rel="noopener noreferrer">Directions</a>
        </div>
      </div>
    `).join("");

    eventList.innerHTML = data.events.map(item => `
      <div class="hotel-list-item">
        <div class="hotel-list-num">${item.no}</div>
        <div class="hotel-list-text">
          <a class="hotel-list-title" href="${item.link}" target="_blank" rel="noopener noreferrer">${item.name}</a>
          <span class="hotel-list-sub">${item.sub}</span>
        </div>
      </div>
    `).join("");

    const detailBox = document.getElementById("hotelCourseDetail");
    const frontTitle = document.getElementById("hotelCourseFrontTitle");
    const frontDesc = document.getElementById("hotelCourseFrontDesc");
    const backTitle = document.getElementById("hotelCourseBackTitle");
    const backRoute = document.getElementById("hotelCourseBackRoute");
    const backDesc = document.getElementById("hotelCourseBackDesc");
    const backBtn = document.getElementById("hotelCourseDirectionBtn");

    document.querySelectorAll(".course-trigger").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.dataset.index);
        const course = data.courses[idx];
        if (!course) return;

        frontTitle.textContent = course.title;
        frontDesc.textContent = course.sub;
        backTitle.textContent = course.title;
        backRoute.textContent = course.route;
        backDesc.textContent = course.detail;
        backBtn.href = course.direction;
        detailBox.classList.add("is-flipped");
      });
    });

    detailBox.addEventListener("click", (e) => {
      if (!e.target.closest(".hotel-mini-btn")) {
        detailBox.classList.toggle("is-flipped");
      }
    });
  }

  // 페이지별로 이 값만 바꿔
  // soraniwa / bettei / hiyori / stitch
  renderHotelPage("soraniwa");
});
