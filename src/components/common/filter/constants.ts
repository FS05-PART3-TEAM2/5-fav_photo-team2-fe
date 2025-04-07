export const FILTER_CONFIG = {
  orderBy: {
    // 정렬 기준
    latest: "최신 순",
    oldest: "오래된 순",
    expensive: "높은 가격순",
    cheap: "낮은 가격순",
  },
  filter: {
    grade: {
      label: "등급",
      options: {
        default: "전체",
        COMMON: "COMMON",
        RARE: "RARE",
        SUPER_RARE: "SUPER RARE",
        LEGENDARY: "LEGENDARY",
      },
    },
    genre: {
      label: "장르",
      options: {
        default: "전체",
        TRAVEL: "여행",
        LANDSCAPE: "풍경",
        PORTRAIT: "인물",
        OBJECT: "사물",
      },
    },
    isSoldOut: {
      label: "매진 여부",
      options: {
        default: "전체",
        ON_SALE: "판매중",
        SOLD_OUT: "매진",
      },
    },
    tradeStatus: {
      label: "거래 현황",
      options: {
        default: "전체",
        ON_SALE: "판매 중",
        SOLD_OUT: "판매 완료",
        PENDING: "교환 제시 대기중",
      },
    },
  },
};
