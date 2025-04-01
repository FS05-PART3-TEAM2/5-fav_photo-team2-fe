export type Grade = "COMMON" | "RARE" | "SUPER RARE" | "LEGENDARY";
export type CardType = "details" | "list";
export type AmountText = "잔여" | "수량" | "보유량";
export type SaleCardStatus = "ON_SALE" | "CANCELED" | "SOLD_OUT";

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
  // TODO: 최대 가능 수량(총 보유량) 키 이름 수정 필요
  maxAmount: number;
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
  createdAt: string;
  updatedAt: string;
  creator: {
    id: string;
    nickname: string;
  };
}
