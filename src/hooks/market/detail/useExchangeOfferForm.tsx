"use client";

import { useCallback, useState } from "react";
import { PostExchangeOfferBodyParams } from "@/types/photocard.types";
import { useSnackbarStore } from "@/store/useSnackbarStore";
import { postExchangeOfferApi } from "@/services/market/exchangeCardActionService";
import { photoCardKeys, userKeys } from "@/utils/queryKeys";
import { useQueryClient } from "@tanstack/react-query";

// 교환 제시 등록 훅
export const useExchangeOfferForm = () => {
  const [exchangeOfferContent, setExchangeOfferContent] = useState("");

  const queryClient = useQueryClient();
  const { openSnackbar } = useSnackbarStore();

  // 콘텐츠 변경 핸들러
  const handleContentChange = useCallback((value: string) => {
    setExchangeOfferContent(value);
  }, []);

  // 콘텐츠 초기화 핸들러
  const handleContentReset = useCallback(() => {
    setExchangeOfferContent("");
  }, []);

  // 유효성 검사
  const isValid = useCallback(() => {
    // 콘텐츠 1자 이상 있으면 활성화
    if (!exchangeOfferContent.trim()) return false;

    return true;
  }, [exchangeOfferContent]);

  const isBtnDisabled = !isValid();

  /**
   * 판매 포토카드 교환 제시 등록 핸들러
   * @param saleCardId
   */
  const handlePostExchangeOffer = async (params: PostExchangeOfferBodyParams) => {
    try {
      const response = await postExchangeOfferApi(params);
      if (response) {
        // 교환 제시 등록 시 교환 목록, 마이갤러리 무효화(그냥 전체 무효화로 처리)
        queryClient.invalidateQueries({
          queryKey: photoCardKeys.all,
        });
        queryClient.invalidateQueries({
          queryKey: userKeys.all,
        });
        openSnackbar("SUCCESS", "포토카드 교환 제시에 성공했습니다!", "교환 제시");
        handleContentReset();
        // XXX: 피그마에 [나의 판매 포토카드에서 확인하기]로 되어있는데, 기존 상세 페이지에서 [내가 제시한 교환 목록] 확인 가능해서 페이지 라우팅 추가 안함
      }
    } catch (error) {
      handleContentReset();
      openSnackbar("ERROR", "포토카드 교환 제시에 실패했습니다. \n다시 시도해주세요.", "교환 제시");
      throw error;
    }
  };

  return {
    exchangeOfferContent,
    isBtnDisabled,
    handleContentChange,
    handlePostExchangeOffer,
    handleContentReset,
  };
};
