export const PATH_TITLE: [RegExp, string][] = [
  [/^\/market\/[^/]+$/, "마켓플레이스"], // /market/:id
  [/^\/my-photos\/create$/, "등록"], // /my-photos/create
  [/^\/my-photos\/[^/]+$/, ""], // /my-photos/:id  (뒤로가기만)
  [/^\/my-photos$/, "마이갤러리"], // /my-photos
  [/^\/my-sales$/, "나의 판매 포토카드"], // /my-sales
];
