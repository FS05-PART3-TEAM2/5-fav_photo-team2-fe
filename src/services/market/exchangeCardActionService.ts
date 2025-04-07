import { AxiosError } from "axios";
import { axiosClient } from "../axiosClient/axiosClient";
import { handleApiError } from "../modules/handleApiError";
import {
  ExchangeCardActionResponseDto,
  PostExchangeOfferBodyParams,
} from "@/types/photocard.types";

/**
 * 판매 포토카드 교환 제시 등록 API
 * @param params PostExchangeOfferBodyParams
 * @returns ExchangeCardActionResponseDto
 */
export const postExchangeOfferApi = async (
  params: PostExchangeOfferBodyParams
): Promise<ExchangeCardActionResponseDto> => {
  try {
    const response = await axiosClient.post<ExchangeCardActionResponseDto>(
      "/market/exchange",
      params
    );
    return response.data;
  } catch (error) {
    throw handleApiError(error as AxiosError);
  }
};

/**
 * 판매 포토카드 교환 제시 승인 API
 * @param id exchangeOfferId
 * @returns ExchangeCardActionResponseDto
 */
export const acceptExchangeOfferApi = async (
  id: string
): Promise<ExchangeCardActionResponseDto> => {
  try {
    const response = await axiosClient.patch<ExchangeCardActionResponseDto>(
      `/market/exchange/${id}/accept`
    );
    return response.data;
  } catch (error) {
    throw handleApiError(error as AxiosError);
  }
};

/**
 * 판매 포토카드 교환 제시 취소/거절 API
 * @param id exchangeOfferId
 * @returns ExchangeCardActionResponseDto
 */
export const declineExchangeOfferApi = async (
  id: string
): Promise<ExchangeCardActionResponseDto> => {
  try {
    const response = await axiosClient.patch<ExchangeCardActionResponseDto>(
      `/market/exchange/${id}/decline`
    );
    return response.data;
  } catch (error) {
    throw handleApiError(error as AxiosError);
  }
};
