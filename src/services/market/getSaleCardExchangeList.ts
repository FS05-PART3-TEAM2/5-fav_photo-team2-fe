import { SaleCardExchangeListDto } from "@/types/photocard.types";
import { handleApiError } from "../modules/handleApiError";
import axios, { AxiosError } from "axios";

/**
 * 판매 포토카드 교환 목록 조회 API
 * @param id SaleCardId (판매 포토카드 ID)
 * @returns SaleCardExchangeListDto (판매 포토카드 교환 목록 정보)
 */
export const getSaleCardExchangeListApi = async (
  id: string,
  cookie: string
): Promise<SaleCardExchangeListDto> => {
  try {
    const response = await axios.get<SaleCardExchangeListDto>(
      `${process.env.NEXT_PUBLIC_API_URL}/market/${id}/exchange`,
      {
        headers: {
          Cookie: cookie,
        },
      }
    );
    return response.data;
  } catch (err) {
    throw handleApiError(err as AxiosError);
  }
};
