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

  // 교환 포토카드 목록
  exchangeCardList: (saleId: string) => [...photoCardKeys.all, "exchangeCardList", saleId] as const,

  // 마이갤러리 목록 - 검색 조건(검색어, 등급, 장르)
  myPhotoList: (params: { keyword: string; grade: Grade; genre: Genre }) =>
    [...photoCardKeys.all, "myPhotoList", params] as const,

  // 나의 판매 포토카드 목록 - 검색 조건(검색어, 등급, 장르, 판매 상태)
  mySaleList: (params: { keyword: string; grade: Grade; genre: Genre; status: TradeStatus }) =>
    [...photoCardKeys.all, "mySaleList", params] as const,
};
