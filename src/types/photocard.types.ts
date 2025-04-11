export type Grade = "COMMON" | "RARE" | "SUPER_RARE" | "LEGENDARY";
export type Genre = "TRAVEL" | "LANDSCAPE" | "PORTRAIT" | "OBJECT";
export type Sort = "recent" | "old" | "cheap" | "expensive";
export type SaleCardStatus = "ON_SALE" | "CANCELED" | "SOLD_OUT";
export type TradeStatus = "ON_SALE" | "SOLD_OUT" | "PENDING";
export type ExchangeOfferStatus = "PENDING" | "ACCEPTED" | "FAILED";
export type CardType = "details" | "list";
export type AmountText = "잔여" | "수량" | "보유량";

/**
 * 마이 갤러리 조회 API 응답 - 포토카드 타입
 */
export interface MyPhotoCardDto {
  id: string;
  name: string;
  genre: Genre;
  grade: Grade;
  price: number;
  imageUrl: string;
  amount: number;
  creatorNickname: string;
  createdAt: string;
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

/**
 * 판매 포토카드 수정/내리기 API 응답 타입
 */
export interface SaleCardSupplierActionResponseDto {
  saleCardId: string;
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
  exchangeOffer: {
    description: string;
    grade: Grade;
    genre: Genre;
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

/**
 * 판매 포토카드 교환 제시 등록 API 요청 타입
 */
export interface PostExchangeOfferBodyParams {
  saleCardId: string;
  offeredUserCardId: string;
  content: string;
}

/**
 * 판매 포토카드 교환 제시 등록 API 응답 타입
 */
export interface PostExchangeOfferResponseDto {
  message: string;
  data: {
    saleCardId: string;
    offererId: string;
    userPhotoCardId: string;
    status: ExchangeOfferStatus;
    content: string;
  };
}

/**
 * 판매 포토카드 교환 제시 승인/거절 API 응답 타입
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

// 판매 등록 포토카드 타입
export interface SaleCardDto {
  id: string;
  userPhotoCardId: string;
  status: SaleCardStatus;
  name: string;
  genre: Genre;
  grade: Grade;
  price: number;
  image: string;
  remaining: number;
  total: number;
  createdAt: string;
  updatedAt: string;
  owner: {
    id: string;
    nickname: string;
  };
  exchangeOffer: {
    description: string;
    grade: Grade;
    genre: Genre;
  };
}

// 판매 등록 요청에 사용할 타입
export interface SaleRegisterRequest {
  userPhotoCardId: string;
  price: number;
  quantity: number;
  exchangeOffer: {
    grade: Grade;
    genre: Genre;
    description: string;
  };
}
/**
 * 판매 포토카드 구매하기 API 요청 타입
 */
export interface PurchaseSaleCardBodyParams {
  saleCardId: string;
  quantity: number;
}

/**
 * 판매 포토카드 구매하기 API 응답 타입
 */
export interface PurchaseSaleCardResponseDto {
  message: string;
}
