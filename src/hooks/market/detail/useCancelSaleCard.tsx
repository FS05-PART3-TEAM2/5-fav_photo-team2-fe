import { useSnackbarStore } from "@/store/useSnackbarStore";
import { useQueryClient } from "@tanstack/react-query";
import { photoCardKeys } from "@/utils/queryKeys";
import { useRouter } from "next/navigation";
import { cancelSaleCardApi } from "@/services/market/saleCardActionService";
import { SaleCardDetailDto } from "@/types/photocard.types";

// 포토카드 판매 내리기 훅
export const useCancelSaleCard = () => {
  const queryClient = useQueryClient();
  const { openSnackbar } = useSnackbarStore();
  const router = useRouter();

  /**
   * 판매 포토카드 판매 내리기 핸들러
   * @param saleCard
   */
  const handleCancelSaleCard = async (saleCard: SaleCardDetailDto) => {
    try {
      const response = await cancelSaleCardApi(saleCard.id);
      if (response) {
        queryClient.invalidateQueries({ queryKey: photoCardKeys.all });

        openSnackbar(
          "SUCCESS",
          `[${saleCard.grade} | ${saleCard.name}] 포토카드 판매를 종료했습니다.`
        );

        // 판매 내리기 요청 성공하면 마켓플레이스 리스트로 이동
        router.push("/market");
      }
    } catch (error) {
      openSnackbar("ERROR", "다시 시도해주세요.", "판매 내리기");
      throw error;
    }
  };

  return {
    handleCancelSaleCard,
  };
};
