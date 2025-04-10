import { MyPhotoCardDto, SaleCardDto } from "@/types/photocard.types";

export const convertToSaleCardDto = (card: MyPhotoCardDto, userId?: string): SaleCardDto => {
  return {
    id: card.id,
    userPhotoCardId: card.id,
    status: "ON_SALE",
    name: card.name,
    genre: card.genre,
    grade: card.grade,
    price: card.price,
    image: card.imageUrl,
    remaining: card.amount,
    total: card.amount,
    createdAt: card.createdAt,
    updatedAt: new Date().toISOString(),
    owner: {
      id: userId ?? "", // 필요 시 외부에서 유저 ID를 전달받음
      nickname: card.creatorNickname,
    },
    exchangeOffer: {
      grade: card.grade,
      genre: card.genre,
      description: "",
    },
  };
};
