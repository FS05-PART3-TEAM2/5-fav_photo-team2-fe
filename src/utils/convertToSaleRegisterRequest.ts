import { SaleCardDto, Grade, Genre } from "@/types/photocard.types";

interface SaleFormInput {
  price: number;
  quantity: number;
  grade: Grade;
  genre: Genre;
  description: string;
}

export const convertToSaleRegisterRequest = (card: SaleCardDto, form: SaleFormInput) => {
  return {
    userPhotoCardId: card.id,
    price: form.price,
    quantity: form.quantity,
    exchangeOffer: {
      grade: form.grade,
      genre: form.genre,
      description: form.description,
    },
  };
};
