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
        travel: "여행",
        landscape: "풍경",
        portrait: "인물",
        object: "사물",
      },
    },
    isSoldOut: {
      label: "매진 여부",
      options: {
        default: "전체",
        soldOut: "매진",
      },
    },
    tradeStatus: {
      label: "거래 현황",
      options: {
        default: "전체",
        onSale: "판매 중",
        soldOut: "판매 완료",
        pending: "교환 제시 대기중",
      },
    },
  },
};
