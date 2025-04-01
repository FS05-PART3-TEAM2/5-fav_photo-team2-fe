"use client";

import { useCallback, useState } from "react";
// import { useQueryClient } from '@tanstack/react-query';
import { Grade, PhotoCardDetailDto, UpdateSaleCardBodyParams } from "@/types/photocard.types";
import { useSnackbarStore } from "@/store/useSnackbarStore";

export const useEditSaleCardForm = (initialData: PhotoCardDetailDto, onClose: () => void) => {
  const [params, setParams] = useState<UpdateSaleCardBodyParams>({
    quantity: initialData.availableAmount,
    price: initialData.price,
    exchangeOffer: {
      grade: initialData.exchangeDetail.grade,
      genre: initialData.exchangeDetail.genre,
      description: initialData.exchangeDetail.description,
    },
  });

  //   const queryClient = useQueryClient();
  const { openSnackbar } = useSnackbarStore();

  // 각 필드 업데이트 함수
  const updateParams = useCallback(
    (
      field: keyof UpdateSaleCardBodyParams | "grade" | "genre" | "description",
      value: number | string | Grade
    ) => {
      setParams(prev => {
        if (field === "quantity" || field === "price") {
          return {
            ...prev,
            [field]: value,
          };
        } else {
          return {
            ...prev,
            exchangeOffer: {
              ...prev.exchangeOffer,
              [field]: value,
            },
          };
        }
      });
    },
    []
  );

  // 수량 변경 핸들러
  const handleQuantityChange = useCallback(
    (value: number) => {
      updateParams("quantity", value);
    },
    [updateParams]
  );

  // 가격 변경 핸들러
  const handlePriceChange = useCallback(
    (value: number) => {
      updateParams("price", value);
    },
    [updateParams]
  );

  // 등급 변경 핸들러
  const handleGradeChange = useCallback(
    (value: Grade) => {
      updateParams("grade", value);
    },
    [updateParams]
  );

  // 장르 변경 핸들러
  const handleGenreChange = useCallback(
    (value: string) => {
      updateParams("genre", value);
    },
    [updateParams]
  );

  // 설명 변경 핸들러
  const handleDescriptionChange = useCallback(
    (value: string) => {
      updateParams("description", value);
    },
    [updateParams]
  );

  // 유효성 검사
  const isValid = useCallback(() => {
    // 수량 체크 - 0이거나 음수이거나 최대 수량을 초과하면 false
    if (params.quantity <= 0 || params.quantity > initialData.totalOwnAmount) return false;

    // 가격 체크
    if (params.price <= 0) return false;

    // 교환 희망 정보 체크
    if (
      !params.exchangeOffer.grade ||
      !params.exchangeOffer.genre ||
      !params.exchangeOffer.description.trim()
    )
      return false;

    return true;
  }, [params, initialData.totalOwnAmount]);

  // 변경사항 있는지 확인
  const hasChanges = useCallback(() => {
    const isQuantityChanged = params.quantity !== initialData.availableAmount;
    const isPriceChanged = params.price !== initialData.price;
    const isGradeChanged = params.exchangeOffer.grade !== initialData.exchangeDetail.grade;
    const isGenreChanged = params.exchangeOffer.genre !== initialData.exchangeDetail.genre;
    const isDescriptionChanged =
      params.exchangeOffer.description.trim() !== initialData.exchangeDetail.description.trim();

    // 하나라도 변경된 것이 있으면 true 반환
    return (
      isQuantityChanged ||
      isPriceChanged ||
      isGradeChanged ||
      isGenreChanged ||
      isDescriptionChanged
    );
  }, [params, initialData]);

  // 버튼 활성화 여부
  const isDisabled = !hasChanges() || !isValid();

  // 수정 요청 핸들러
  const handleUpdateSaleCard = useCallback(async () => {
    try {
      // const response = await updateSaleCardApi(initialData.id, params);
      // if (response.isSuccess) {
      // 수정 완료 후 캐시 무효화
      //   queryClient.invalidateQueries({ queryKey: photoCardKeys.all });

      openSnackbar(
        "SUCCESS",
        "수정",
        `[${initialData.grade} | ${initialData.name}] 판매 카드 수정에 성공했습니다!`
      );

      onClose();
    } catch (error) {
      openSnackbar(
        "ERROR",
        "수정",
        `[${initialData.grade} | ${initialData.name}] 판매 카드 수정에 실패했습니다.`
      );
      throw error;
    }
  }, [params, initialData.id]);

  return {
    params,
    isDisabled,
    handleQuantityChange,
    handlePriceChange,
    handleGradeChange,
    handleGenreChange,
    handleDescriptionChange,
    handleUpdateSaleCard,
  };
};
