"use client";

import { useExchangeCardList } from "@/hooks/market/detail/useExchangeCardService";
import { ConsumerPage } from "./ConsumerPage";
import { SupplierPage } from "./SupplierPage";
import { useQuery } from "@tanstack/react-query";
import { photoCardKeys } from "@/utils/queryKeys";
import { getSaleCardDetailApi } from "@/services/market/getSaleCardDetail";
import { redirect } from "next/navigation";

interface ClientPageComponentProps {
  saleCardId: string;
}

export default function ClientPageComponent({ saleCardId }: ClientPageComponentProps) {
  // 판매 카드 기본 상세 정보 불러오기
  const { data: saleCardData } = useQuery({
    queryKey: photoCardKeys.detail(saleCardId),
    queryFn: () => getSaleCardDetailApi(saleCardId),
  });

  // 교환 목록 데이터 불러오기
  const { data: exchangeListData, isPending: isExchangeListPending } = useExchangeCardList();

  if (!saleCardData) {
    return redirect("/not-found");
  }

  return (
    <div className="w-[100%] pt-[20px] md:pt-[0px] pb-[40px] md:pb-[60px] lg:pb-[180px]">
      {/* XXX: 모바일에서는 페이지 타이틀 헤더에서 관리 */}
      <div className="hidden md:block py-[40px] lg:py-[60px] w-[100%]">
        <p className="text-gray-300 text-[16px] lg:text-[24px] font-BR-B">마켓플레이스</p>
      </div>

      {saleCardData.isMine ? (
        // 판매자 페이지
        <SupplierPage
          saleCardData={saleCardData}
          exchangeListData={exchangeListData}
          isExchangeListPending={isExchangeListPending}
        />
      ) : (
        // 구매자 페이지
        <ConsumerPage
          saleCardData={saleCardData}
          exchangeListData={exchangeListData}
          isExchangeListPending={isExchangeListPending}
        />
      )}
    </div>
  );
}
