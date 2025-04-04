import { SaleCardDetailDto } from "@/types/photocard.types";
import { axiosClient } from "../axiosClient/axiosClient";
import { handleApiError } from "../modules/handleApiError";
import { AxiosError } from "axios";

/**
 * 판매 포토카드 상세 조회 API
 * @param id SaleCardId (판매 포토카드 ID)
 * @returns SaleCardDetailDto (판매 포토카드 기본 상세 정보)
 */
export const getSaleCardDetail = async (id: string): Promise<SaleCardDetailDto> => {
  try {
    const response = await axiosClient.get<SaleCardDetailDto>(`/market/${id}/detail`);
    return response.data;
  } catch (err) {
    throw handleApiError(err as AxiosError);
  }
};
