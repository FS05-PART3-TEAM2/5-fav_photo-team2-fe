export type Grade = "COMMON" | "RARE" | "SUPER_RARE" | "LEGENDARY";
export type CardType = "details" | "list";
export type AmountText = "잔여" | "수량" | "보유량";
export type SaleCardStatus = "ON_SALE" | "CANCELED" | "SOLD_OUT";

export interface MyPhotoCardDto {
  id: string;
  grade: Grade;
  genre: string;
  name: string;
  price: number;
  availableAmount: number;
  totalAmount: number;
  creator: string;
  imageUrl: string;
}

export interface ExchangeCardDto {
  id: string;
  offererNickname: string;
  imageUrl: string;
  name: string;
  grade: Grade;
  genre: string;
  price: number;
  description: string;
  createdAt: string;
}
export interface PhotoCardDetailDto {
  id: string;
  userNickname: string;
  imageUrl: string;
  name: string;
  grade: Grade;
  genre: string;
  description: string;
  price: number;
  availableAmount: number;
  totalAmount: number;
  totalOwnAmount: number;
  exchangeDetail: {
    grade: Grade;
    genre: string;
    description: string;
  };
  isMine: boolean;
  createdAt: string;
  receivedOffers: ExchangeCardDto[] | null;
  myOffers: ExchangeCardDto[] | null;
}

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
export interface UpdateSaleCardResponseDto {
  id: string;
  userPhotocardId: string;
  status: SaleCardStatus;
  name: string;
  grade: Grade;
  genre: string;
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
  genre: string;
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
