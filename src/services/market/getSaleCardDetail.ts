import { SaleCardDetailDto } from "@/types/photocard.types";
import axios, { AxiosError } from "axios";
import { handleApiError } from "../modules/handleApiError";

/**
 * 판매 포토카드 상세 조회 API
 * @param id SaleCardId (판매 포토카드 ID)
 * @returns SaleCardDetailDto (판매 포토카드 기본 상세 정보)
 */
export const getSaleCardDetailApi = async (
  id: string,
  cookie: string
): Promise<SaleCardDetailDto> => {
  try {
    const response = await axios.get<SaleCardDetailDto>(
      `${process.env.NEXT_PUBLIC_API_URL}/market/${id}/detail`,
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
