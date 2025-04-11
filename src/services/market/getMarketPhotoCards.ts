// services/market/getMarketPhotoCards.ts
import { axiosClient } from "../axiosClient/axiosClient";
import {
  MarketplacePhotoCardDto,
  Grade,
  Genre,
  SaleCardStatus,
  Sort,
} from "@/types/photocard.types";

type Cursor = { id: string; createdAt: string } | null;
interface GetMarketPhotoCardsParams {
  cursor?: Cursor;
  keyword?: string;
  grade?: Grade;
  genre?: Genre;
  status?: SaleCardStatus;
  sort?: Sort;
}

interface MarketPhotoCardsResponse {
  hasMore: boolean;
  nextCursor: {
    id: string;
    createdAt: string;
  } | null;
  list: MarketplacePhotoCardDto[];
}

export async function getMarketPhotoCardsApi({
  cursor,
  keyword,
  grade,
  genre,
  status,
  sort,
}: GetMarketPhotoCardsParams = {}): Promise<MarketPhotoCardsResponse> {
  const response = await axiosClient.get(`${process.env.NEXT_PUBLIC_API_URL}/market`, {
    params: {
      cursor: cursor ?? undefined,
      keyword,
      grade,
      genre,
      status,
      sort,
    },
  });
  return {
    list: response.data.list,
    nextCursor: response.data.nextCursor,
    hasMore: response.data.hasMore,
  };
}
