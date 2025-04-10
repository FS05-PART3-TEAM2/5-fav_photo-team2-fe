import { Genre, Grade, SaleCardStatus, Sort, TradeStatus } from "@/types/photocard.types";

// XXX: 목록 조회시 필요한 필터 파라미터들을 일단 임의로 넣어두었습니다. 세정님 하윤님 필터링 사용할때 타입이나 뭐 이상있으면 필요에맞게 수정해서 사용하시면됩니다!

export const photoCardKeys = {
  all: ["photoCard"] as const,

  // 마켓플레이스 메인 - 검색 조건(검색어, 등급, 장르, 상태, 정렬)
  saleList: (params: {
    keyword: string;
    grade: Grade;
    genre: Genre;
    status: SaleCardStatus;
    sort: Sort;
  }) => [...photoCardKeys.all, "saleList", params] as const,

  detail: (saleId: string) => [...photoCardKeys.all, "detail", saleId] as const,

  // 교환 포토카드 목록
  exchangeCardList: (saleId: string) => [...photoCardKeys.all, "exchangeCardList", saleId] as const,

  // 마이갤러리 목록 - 검색 조건(검색어, 등급, 장르)
  myPhotoList: (params: { keyword: string; grade: Grade; genre: Genre }) =>
    [...photoCardKeys.all, "myPhotoList", params] as const,

  // 나의 판매 포토카드 목록 - 검색 조건(검색어, 등급, 장르, 판매 상태)
  mySaleList: (params: {
    keyword: string;
    grade: Grade;
    genre: Genre;
    status: TradeStatus;
    limit?: number;
  }) => [...photoCardKeys.all, "mySaleList", params] as const,
};

// XXX: 유저 데이터 관련 쿼리키(현재 포인트만 있음 -> 알림도 추가해서 리액트쿼리로 받고, 일정시간마다 stale되도록해서 자동으로 뭐 한 5분마다 업데이트되게끔 해도 될거같네요-!)
export const userKeys = {
  all: ["user"] as const,
  notificationList: (userId: string) => [...userKeys.all, "notificationList", userId] as const,
  points: (userId: string) => [...userKeys.all, "points", userId] as const, // XXX: 여러 계정을 가진 유저가 있는게 애초에 실제 서비스에서는 엣지케이스이긴한데, 일단 유저아이디별로 포인트 담아두도록 파라미터 추가함
};
