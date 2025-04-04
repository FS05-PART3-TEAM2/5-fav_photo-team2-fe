export type Grade = "COMMON" | "RARE" | "SUPER_RARE" | "LEGENDARY";
export type Genre = "TRAVEL" | "LANDSCAPE" | "PORTRAIT" | "OBJECT";
export type CardType = "details" | "list";
export type AmountText = "잔여" | "수량" | "보유량";
export type SaleCardStatus = "ON_SALE" | "CANCELED" | "SOLD_OUT";

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
  userNickname: string;
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
  offererNickname: string;
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
  saleCardId: string;
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
    genre: string;
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
