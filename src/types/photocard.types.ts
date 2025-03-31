export type Grade = "COMMON" | "RARE" | "SUPER RARE" | "LEGENDARY";
export type CardType = "details" | "list";
export type AmountText = "잔여" | "수량" | "보유량";

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
