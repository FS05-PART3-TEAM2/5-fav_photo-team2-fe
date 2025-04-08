import { useSnackbarStore } from "@/store/useSnackbarStore";
import { useQueryClient } from "@tanstack/react-query";
import {
  acceptExchangeOfferApi,
  declineExchangeOfferApi,
  postExchangeOfferApi,
} from "@/services/market/exchangeCardActionService";
import { PostExchangeOfferBodyParams } from "@/types/photocard.types";
import { photoCardKeys } from "@/utils/queryKeys";

export const useExchangeCardActionHook = () => {
  const queryClient = useQueryClient();
  const { openSnackbar } = useSnackbarStore();

  /**
   * 판매 포토카드 교환 제시 등록 핸들러
   * @param saleCardId
   */
  const handlePostExchangeOffer = async (params: PostExchangeOfferBodyParams) => {
    try {
      const response = await postExchangeOfferApi(params);
      if (response) {
        // 교환 제시 등록 시 교환 목록 쿼리키 무효화
        queryClient.invalidateQueries({
          queryKey: photoCardKeys.exchangeCardList(params.saleCardId),
        });
        openSnackbar("SUCCESS", "교환 제시가 완료되었습니다.");
      }
    } catch (error) {
      openSnackbar("ERROR", "다시 시도해주세요.");
      throw error;
    }
  };

  /**
   * 판매 포토카드 교환 제시 승인 핸들러
   * @param saleCardId
   */
  const handleAcceptExchangeOffer = async (saleCardId: string) => {
    try {
      const response = await acceptExchangeOfferApi(saleCardId);
      if (response) {
        // 교환 완료 후 캐시 무효화
        // TODO: 바로 교환목록, 디테일 업데이트되는지 확인 필요
        // 교환목록에서 승인한건 사라지고, 디테일 보유량이 줄어야됨.
        queryClient.invalidateQueries({ queryKey: photoCardKeys.all });

        openSnackbar("SUCCESS", `교환이 성사되었습니다!`, "교환");
      }
    } catch (error) {
      openSnackbar("ERROR", "다시 시도해주세요.", "교환");
      throw error;
    }
  };

  // XXX: 거절/취소 같은 api를 사용하지만 토스트 메시지 다르게 띄우기 위해 분리함

  /**
   * 판매 포토카드 교환 제시 거절 핸들러
   * @param saleCardId
   */
  const handleDeclineExchangeOffer = async (saleCardId: string) => {
    try {
      const response = await declineExchangeOfferApi(saleCardId);
      if (response) {
        queryClient.invalidateQueries({ queryKey: photoCardKeys.all });
        openSnackbar("SUCCESS", "교환 제안을 거절했습니다.");
      }
    } catch (error) {
      openSnackbar("ERROR", "다시 시도해주세요.");
      throw error;
    }
  };

  /**
   * 판매 포토카드 교환 제시 취소 핸들러
   * @param saleCardId
   */
  const handleCancelExchangeOffer = async (saleCardId: string) => {
    try {
      const response = await declineExchangeOfferApi(saleCardId);
      if (response) {
        queryClient.invalidateQueries({ queryKey: photoCardKeys.all });
        openSnackbar("SUCCESS", "교환 제안을 취소했습니다.");
      }
    } catch (error) {
      openSnackbar("ERROR", "다시 시도해주세요.");
      throw error;
    }
  };

  return {
    handlePostExchangeOffer,
    handleAcceptExchangeOffer,
    handleDeclineExchangeOffer,
    handleCancelExchangeOffer,
  };
};
