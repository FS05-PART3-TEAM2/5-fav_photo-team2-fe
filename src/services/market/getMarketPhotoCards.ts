// services/market/getMarketPhotoCards.ts
import { axiosClient } from "../axiosClient/axiosClient";
import { MarketplacePhotoCardDto } from "@/types/photocard.types";

export async function getMarketPhotoCardsApi(): Promise<MarketplacePhotoCardDto[]> {
  const response = await axiosClient.get("/market");
  return response.data.list;
}
