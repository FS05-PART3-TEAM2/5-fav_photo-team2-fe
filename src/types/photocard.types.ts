export type Grade = "COMMON" | "RARE" | "SUPER_RARE" | "LEGENDARY";
export type Genre = "TRAVEL" | "LANDSCAPE" | "PORTRAIT" | "OBJECT";
export type Sort = "recent" | "old" | "cheap" | "expensive";
export type SaleCardStatus = "ON_SALE" | "CANCELED" | "SOLD_OUT"; // TODO: 여기 수정응답에서 쓰이는데 수정사항 있는지 확인 필요 + 쿼리키 saleList 에서도 그냥 이거 사용. 만약 수정하게되면 쿼리키쪽에 문제없는지 확인 필요
export type TradeStatus = "ON_SALE" | "SOLD_OUT" | "PENDING";
export type ExchangeOfferStatus = "PENDING" | "ACCEPTED" | "FAILED";
export type CardType = "details" | "list";
export type AmountText = "잔여" | "수량" | "보유량";

/**
 * 마이 갤러리 조회 API 응답 - 포토카드 타입
 */
export interface MyPhotoCardDto {
  id: string;
  grade: Grade;
  genre: Genre;
  name: string;
  price: number;
  availableAmount: number;
  totalAmount: number;
  creator: string;
  imageUrl: string;
}

/**
 * 판매 포토카드 상세 조회 API 응답 타입
 */
export interface SaleCardDetailDto {
  id: string;
  creatorNickname: string;
  imageUrl: string;
  name: string;
  grade: Grade;
  genre: Genre;
  description: string;
  price: number;
  availableAmount: number;
  totalAmount: number;
  totalOwnAmount: number;
  exchangeDetail: {
    grade: Grade;
    genre: Genre;
    description: string;
  };
  isMine: boolean;
  createdAt: string;
}

/**
 * 교환 포토카드 타입
 */
export interface ExchangeCardDto {
  id: string;
  creatorNickname: string;
  imageUrl: string;
  name: string;
  grade: Grade;
  genre: Genre;
  price: number;
  description: string;
  createdAt: string;
}

/**
 * 판매 포토카드 교환 목록 조회 API 응답 타입
 */
export interface SaleCardExchangeListDto {
  saleId: string;
  isMine: boolean;
  receivedOffers: ExchangeCardDto[] | null;
  myOffers: ExchangeCardDto[] | null;
}

/**
 * 판매 포토카드 수정 API 요청 타입
 */
export interface UpdateSaleCardBodyParams {
  quantity: number;
  price: number;
  exchangeOffer: {
    grade: Grade;
    genre: Genre;
    description: string;
  };
}

// TODO: 리스폰스 타입 수정 필요
/**
 * 판매 포토카드 수정 API 응답 타입
 */
export interface UpdateSaleCardResponseDto {
  id: string;
  userPhotocardId: string;
  status: SaleCardStatus;
  name: string;
  grade: Grade;
  genre: Genre;
  price: number;
  image: string;
  remaining: number;
  total: number;
  creator: {
    id: string;
    nickname: string;
  };
  createdAt: string;
  updatedAt: string;
}

// 마켓플레이스 페이지(공통)에서 사용하는 포토카드 타입
export interface MarketplacePhotoCardDto {
  saleCardId: string;
  userPhotoCardId: string;
  status: SaleCardStatus;
  name: string;
  grade: Grade;
  genre: Genre;
  price: number;
  image: string;
  remaining: number;
  total: number;
  exchangeDescription: string;
  exchangeGrade: Grade;
  exchangeGenre: string;
  creator: {
    id: string;
    nickname: string;
  };
  seller: {
    id: string;
    nickname: string;
  };
  createdAt: string;
  updatedAt: string;
}

// TODO: 지영님 api 명세 업데이트 완료되면 수정 필요
/**
 * 판매 포토카드 교환 제시 등록 API 요청 타입
 */
export interface PostExchangeOfferBodyParams {
  saleCardId: string;
  customerId: string;
  quantity: number;
  content: string;
}

/**
 * 판매 포토카드 교환 제시 등록/승인/거절 API 응답 타입
 */
export interface ExchangeCardActionResponseDto {
  id: string;
  saleCardId: string;
  offererId: string;
  offeredCardId: string;
  quantity: number;
  status: ExchangeOfferStatus;
  createdAt: string;
  updatedAt: string;
}
