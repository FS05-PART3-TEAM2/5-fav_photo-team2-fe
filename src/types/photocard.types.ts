export type Grade = "COMMON" | "RARE" | "SUPER RARE" | "LEGENDARY";
export type CardType = "details" | "list";

//마켓 플레이스(공통)-포토카드 타입
// SEJEONG: 백엔드데이터 받아오면 수정하기
export interface PhotoCard {
  id: string;
  userPhotoCardId: string;
  status: "ON_SALE" | "SOLD_OUT" | "CANCELED"; // 상태 추가
  name: string;
  genre: string;
  grade: Grade;
  price: number;
  image: string;
  remaining: number; // 잔여 수량 추가
  total: number; // 총 수량 추가
  owner: {
    id: string;
    nickname: string;
  };
  createdAt: string;
  updatedAt: string;
}
