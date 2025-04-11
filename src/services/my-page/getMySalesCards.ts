import { axiosClient } from "@/services/axiosClient/axiosClient";
import { Grade, Genre, TradeStatus } from "@/types/photocard.types";

export interface MySalesCardsResponse {
  hasMore: boolean;
  nextCursor: string | null;
  list: MySaleCard[];
  info: {
    grade: GradeInfo[];
    genre: GenreInfo[];
    status: StatusInfo[];
  };
}

export interface MySaleCard {
  saleCardId: string;
  status: TradeStatus;
  name: string;
  genre: Genre;
  grade: Grade;
  price: number;
  image: string;
  total: number;
  remaining: number;
  creator: {
    id: string;
    nickname: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface GradeInfo {
  name: Grade;
  count: number;
}

interface GenreInfo {
  name: Genre;
  count: number;
}

interface StatusInfo {
  name: TradeStatus;
  count: number;
}

interface GetMySalesCardsParams {
  cursor?: string | null;
  keyword?: string;
  grade?: Grade | undefined;
  genre?: Genre | undefined;
  status?: TradeStatus | undefined;
  limit?: number;
}

export const getMySalesCards = async ({
  cursor,
  keyword,
  grade,
  genre,
  status,
  limit,
}: GetMySalesCardsParams = {}): Promise<MySalesCardsResponse> => {
  const response = await axiosClient.get("/market/me", {
    params: {
      cursor,
      keyword,
      grade,
      genre,
      status,
      limit,
    },
  });
  return response.data;
};
