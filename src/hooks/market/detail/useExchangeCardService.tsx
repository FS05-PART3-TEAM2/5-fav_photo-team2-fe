import { useQuery } from "@tanstack/react-query";
import { photoCardKeys } from "../../../utils/queryKeys";
import { getSaleCardExchangeListApi } from "@/services/market/getSaleCardExchangeList";
import { SaleCardExchangeListDto } from "@/types/photocard.types";
import { useParams } from "next/navigation";

/**
 * 판매 포토카드 교환 목록 조회 리액트 쿼리
 * @param saleId 판매 포토카드 ID
 * @returns 판매 포토카드 교환 목록
 */
export const useExchangeCardList = () => {
  const params = useParams();
  const saleCardId = params?.id;

  const defaultData: SaleCardExchangeListDto = {
    saleId: "",
    isMine: false,
    receivedOffers: null,
    myOffers: null,
  };

  const { data, isLoading, isPending } = useQuery({
    queryKey: photoCardKeys.exchangeCardList(saleCardId as string),
    queryFn: () => getSaleCardExchangeListApi(saleCardId as string),
    enabled: !!saleCardId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return {
    data: data ?? defaultData,
    isLoading,
    isPending,
  };
};
