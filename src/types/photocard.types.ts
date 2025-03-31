export type Grade = "COMMON" | "RARE" | "SUPER RARE" | "LEGENDARY";
export type CardType = "details" | "list";

//마켓 플레이스(공통)-포토카드 타입
// SEJEONG: 데이터 받아오면 수정하기
export interface PhotoCard {
  id: string;
  creatorId: string;
  name: string;
  genre: string;
  grade: Grade;
  price: number;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}
