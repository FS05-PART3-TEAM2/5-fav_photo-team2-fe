import { SaleCardExchangeListDto } from "@/types/photocard.types";
import { axiosClient } from "../axiosClient/axiosClient";
import { handleApiError } from "../modules/handleApiError";
import { AxiosError } from "axios";

/**
 * 판매 포토카드 교환 목록 조회 API
 * @param id SaleCardId (판매 포토카드 ID)
 * @returns SaleCardExchangeListDto (판매 포토카드 교환 목록 정보)
 */
export const getSaleCardExchangeList = async (id: string): Promise<SaleCardExchangeListDto> => {
  try {
    const response = await axiosClient.get<SaleCardExchangeListDto>(`/market/${id}/exchange`);
    return response.data;
  } catch (err) {
    throw handleApiError(err as AxiosError);
  }
};
