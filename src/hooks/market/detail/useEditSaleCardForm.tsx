"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
// import { useQueryClient } from '@tanstack/react-query';
import { Grade, PhotoCardDetailDto, UpdateSaleCardBodyParams } from "@/types/photocard.types";

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
  const router = useRouter();
  //   const { openSnackbar } = useSnackbarStore();

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

  // 변경사항 있는지 확인
  const hasChanges = useCallback(() => {
    const isQuantityChanged = params.quantity !== initialData.availableAmount;
    const isPriceChanged = params.price !== initialData.price;
    const isGradeChanged = params.exchangeOffer.grade !== initialData.exchangeDetail.grade;
    const isGenreChanged = params.exchangeOffer.genre !== initialData.exchangeDetail.genre;
    const isDescriptionChanged =
      params.exchangeOffer.description !== initialData.exchangeDetail.description;

    return (
      isQuantityChanged ||
      isPriceChanged ||
      isGradeChanged ||
      isGenreChanged ||
      isDescriptionChanged
    );
  }, [params, initialData]);

  // 유효성 검사
  const isValid = useCallback(() => {
    // 수량 체크
    if (params.quantity < 0 || params.quantity > initialData.maxAmount) return false;

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
  }, [params, initialData.maxAmount]);

  // 버튼 활성화 여부
  const isDisabled = !hasChanges() || !isValid();

  // 수정 요청 핸들러
  const handleUpdateSaleCard = useCallback(async () => {
    try {
      // const response = await updateSaleCardApi(initialData.id, params);
      // if (response.isSuccess) {
      // 수정 완료 후 캐시 무효화
      //   queryClient.invalidateQueries({ queryKey: photoCardKeys.all });

      //   openSnackbar('SUCCESS', 'community_board_updated');

      onClose();
      console.log("업데이트 parmas: ", params);
      //   router.push(`/market/detail/${initialData.id}`);
      // }
    } catch (error) {
      //   openSnackbar('ERROR', 'career_try_again');
      console.log("업데이트 에러: ", error);
    }
  }, [params, initialData.id, router]);

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
