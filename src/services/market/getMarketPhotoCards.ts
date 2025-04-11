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
  const response = await axiosClient.get("/market", {
    params: {
      cursor,
      keyword,
      grade,
      genre,
      status,
      sort,
    },
  });
  console.log("🧪 [1] getMarketPhotoCardsApi 응답 response.data:", response.data);
  return {
    list: response.data.list,
    nextCursor: response.data.nextCursor,
    hasMore: response.data.hasMore,
  };
}
