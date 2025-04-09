import { useCallback, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSnackbarStore } from "@/store/useSnackbarStore";
import { useRouter } from "next/navigation";
import { Grade } from "@/types/photocard.types";
import { photoCardKeys } from "@/utils/queryKeys";
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
        // TODO: 세일카드디테일 백엔드 데이터에서 availableAmount 제대로 오고있는거 맞는지 확인 필요.
        // 맞다고 하면, 프론트쪽에서 서버fetch하고 업데이트안되는거라 수정해야되고, 그쪽에서 잘못오고있던거면 수정된거 반영해서 invalidate 잘되는지 다시 확인해보기
        // TODO: 유저 포인트 업데이트 어떻게 할건지 확인 필요
        queryClient.invalidateQueries({ queryKey: photoCardKeys.all });

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
