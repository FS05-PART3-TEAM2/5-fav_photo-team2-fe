export type Grade = "COMMON" | "RARE" | "SUPER RARE" | "LEGENDARY";
export type CardType = "details" | "list";
export type AmountText = "잔여" | "수량" | "보유량";

export interface PhotoCardDetail {
  id: string;
  userNickname: string;
  imageUrl: string;
  name: string;
  grade: string;
  genre: string;
  description: string;
  price: number;
  availableAmount: number;
  totalAmount: number;
  exchangeDetail: {
    grade: string;
    genre: string;
    description: string;
  };
  isMine: boolean;
}
