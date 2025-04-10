import { AxiosError } from "axios";
import { axiosClient } from "../axiosClient/axiosClient";
import { handleApiError } from "../modules/handleApiError";
import {
  PurchaseSaleCardBodyParams,
  PurchaseSaleCardResponseDto,
  SaleCardSupplierActionResponseDto,
  UpdateSaleCardBodyParams,
} from "@/types/photocard.types";

/**
 * 판매 포토카드 구매하기 API
 * @param params PurchaseSaleCardBodyParams
 * @returns PurchaseSaleCardResponseDto
 */
export const purchaseSaleCardApi = async (
  params: PurchaseSaleCardBodyParams
): Promise<PurchaseSaleCardResponseDto> => {
  try {
    const response = await axiosClient.post<PurchaseSaleCardResponseDto>(
      "/market/purchase",
      params
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 판매 포토카드 수정하기 API
 * @param id saleCardId
 * @returns ExchangeCardActionResponseDto
 */
export const updateSaleCardApi = async (
  saleCardId: string,
  params: UpdateSaleCardBodyParams
): Promise<SaleCardSupplierActionResponseDto> => {
  try {
    const response = await axiosClient.patch<SaleCardSupplierActionResponseDto>(
      `/market/${saleCardId}`,
      params
    );
    return response.data;
  } catch (error) {
    throw handleApiError(error as AxiosError);
  }
};

/**
 * 포토카드 판매 내리기 API
 * @param id saleCardId
 * @returns SaleCardSupplierActionResponseDto
 */
export const cancelSaleCardApi = async (
  saleCardId: string
): Promise<SaleCardSupplierActionResponseDto> => {
  try {
    const response = await axiosClient.patch<SaleCardSupplierActionResponseDto>(
      `/market/${saleCardId}/cancel`
    );
    return response.data;
  } catch (error) {
    throw handleApiError(error as AxiosError);
  }
};
