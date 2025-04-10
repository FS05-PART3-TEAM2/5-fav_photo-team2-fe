import { useCallback, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSnackbarStore } from "@/store/useSnackbarStore";
import { useRouter } from "next/navigation";
import { Grade } from "@/types/photocard.types";
import { photoCardKeys, userKeys } from "@/utils/queryKeys";
import { purchaseSaleCardApi } from "@/services/market/saleCardActionService";
import { AxiosError } from "axios";

interface ErrorResponse {
  error: string;
}

// 포토카드 구매 훅
export const useSaleCardPurchase = (saleCardId: string, grade: Grade, name: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { openSnackbar } = useSnackbarStore();
  const [purchaseAmount, setPurchaseAmount] = useState<number>(1);
  const handleChangePurchaseAmount = (amount: number) => {
    setPurchaseAmount(amount);
  };

  const successMsg = "포토카드 구매가 완료되었습니다.";

  // 구매 요청 핸들러
  const handlePurchaseSaleCard = useCallback(async () => {
    try {
      const params = {
        saleCardId,
        quantity: purchaseAmount,
      };
      const response = await purchaseSaleCardApi(params);
      if (response.message === successMsg) {
        // 구매 완료 후 캐시 무효화
        queryClient.invalidateQueries({ queryKey: photoCardKeys.all });
        // 유저 포인트 무효화 -> 포인트 차감된걸로 업데이트
        queryClient.invalidateQueries({ queryKey: userKeys.points() });

        openSnackbar(
          "SUCCESS",
          `[${grade} | ${name}] ${purchaseAmount}장 \n구매에 성공했습니다!`,
          "구매"
        );

        // 구매 성공 시 마이갤러리로 이동. 구매한 카드 확인
        router.push("/my-photos");
      }
    } catch (error) {
      // 구매 실패 시 구매 모달 닫고 실패 알림만 띄움. 페이지 이동x
      const errMsg =
        (error as AxiosError<ErrorResponse>).response?.data?.error ||
        "알 수 없는 오류가 발생했습니다";
      openSnackbar(
        "ERROR",
        `[${grade} | ${name}] ${purchaseAmount}장 \n구매에 실패했습니다. \n(${errMsg})`,
        "구매"
      );
    }
  }, [purchaseAmount, saleCardId]);

  return { purchaseAmount, handleChangePurchaseAmount, handlePurchaseSaleCard };
};
