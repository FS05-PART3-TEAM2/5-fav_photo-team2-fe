import { useQuery } from "@tanstack/react-query";
import { photoCardKeys } from "../../../utils/queryKeys";
import { SaleCardDetailDto, SaleCardExchangeListDto } from "@/types/photocard.types";
import { useParams } from "next/navigation";
import { axiosClient } from "@/services/axiosClient/axiosClient";
import { AxiosError } from "axios";
import { handleApiError } from "@/services/modules/handleApiError";

// 클라이언트 컴포넌트에서 사용하는 판매 포토카드 상세 조회 API
export const getSaleCardDetailClientApi = async (id: string): Promise<SaleCardDetailDto> => {
  try {
    const response = await axiosClient.get<SaleCardDetailDto>(`/market/${id}/detail`);
    return response.data;
  } catch (err) {
    throw handleApiError(err as AxiosError);
  }
};

// 클라이언트 컴포넌트에서 사용하는 판매 포토카드 교환 목록 조회 API
export const getSaleCardExchangeListClientApi = async (
  id: string
): Promise<SaleCardExchangeListDto> => {
  try {
    const response = await axiosClient.get<SaleCardExchangeListDto>(`/market/${id}/exchange`);
    return response.data;
  } catch (err) {
    throw handleApiError(err as AxiosError);
  }
};

/**
 * 판매 포토카드 교환 목록 조회 리액트 쿼리
 * @param saleId 판매 포토카드 ID
 * @returns 판매 포토카드 교환 목록
 */
export const useFetchSaleCardDetailClient = () => {
  const params = useParams();
  const saleCardId = params?.id;

  const defaultSaleCardDetailData: SaleCardDetailDto = {
    id: "",
    creatorNickname: "",
    imageUrl: "",
    name: "",
    grade: "COMMON",
    genre: "TRAVEL",
    description: "",
    price: 0,
    availableAmount: 0,
    totalAmount: 0,
    totalOwnAmount: 0,
    exchangeDetail: {
      grade: "COMMON",
      genre: "TRAVEL",
      description: "",
    },
    isMine: false,
    createdAt: "",
  };

  const defaultExchangeListData: SaleCardExchangeListDto = {
    saleId: "",
    isMine: false,
    receivedOffers: null,
    myOffers: null,
  };

  const { data: saleCardDetailData, isLoading: isSaleCardDetailLoading } = useQuery({
    queryKey: photoCardKeys.detail(saleCardId as string),
    queryFn: () => getSaleCardDetailClientApi(saleCardId as string),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const { data: exchangeListData, isPending: isExchangeListPending } = useQuery({
    queryKey: photoCardKeys.exchangeCardList(saleCardId as string),
    queryFn: () => getSaleCardExchangeListClientApi(saleCardId as string),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return {
    saleCardDetailData: saleCardDetailData ?? defaultSaleCardDetailData,
    exchangeListData: exchangeListData ?? defaultExchangeListData,
    isSaleCardDetailLoading,
    isExchangeListPending,
  };
};
