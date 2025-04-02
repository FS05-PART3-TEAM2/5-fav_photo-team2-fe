import { useCallback, useState } from "react";
// import { useQueryClient } from '@tanstack/react-query';
import { useSnackbarStore } from "@/store/useSnackbarStore";
// import { useRouter } from "next/navigation";
import { Grade } from "@/types/photocard.types";

export const useSaleCardPurchase = (saleCardId: string, grade: Grade, name: string) => {
  //   const router = useRouter();
  const { openSnackbar } = useSnackbarStore();
  const [purchaseAmount, setPurchaseAmount] = useState<number>(1);
  const handleChangePurchaseAmount = (amount: number) => {
    setPurchaseAmount(amount);
  };

  // 구매 요청 핸들러
  const handlePurchaseSaleCard = useCallback(async () => {
    try {
      // const response = await postPurchaseSaleCardApi(saleCardId, purchaseAmount);
      // if (response.isSuccess) {
      // 구매 완료 후 캐시 무효화
      // - 포토카드리스트, 마이갤러리 모두 업데이트 필요
      // + 유저 포인트도 변경될 것. 업데이트 어떻게 할지 논의해보기
      //   queryClient.invalidateQueries({ queryKey: photoCardKeys.all });

      openSnackbar(
        "SUCCESS",
        `[${grade} | ${name}] ${purchaseAmount}장 구매에 성공했습니다!`,
        "구매"
      );

      // FIXME: 마이갤러리 url 확인 필요
      // 구매 성공 시 마이갤러리로 이동. 구매한 카드 확인
      //   router.push("/gallery");
    } catch (error) {
      // 구매 실패 시 구매 모달 닫고 실패 알림만 띄움. 페이지 이동x
      openSnackbar(
        "ERROR",
        `[${grade} | ${name}] ${purchaseAmount}장 구매에 실패했습니다.`,
        "구매"
      );

      throw error;
    }
  }, [purchaseAmount, saleCardId]);

  return { purchaseAmount, handleChangePurchaseAmount, handlePurchaseSaleCard };
};
