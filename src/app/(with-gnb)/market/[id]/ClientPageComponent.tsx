"use client";

import { useFetchSaleCardDetailClient } from "@/hooks/market/detail/useFetchSaleCardDetailClient";
import { ConsumerPage } from "./ConsumerPage";
import { SupplierPage } from "./SupplierPage";
import { redirect } from "next/navigation";

export default function ClientPageComponent() {
  // 클라이언트 사이드 상세 정보 데이터 불러오기
  const { saleCardDetailData, exchangeListData, isExchangeListPending } =
    useFetchSaleCardDetailClient();

  if (!saleCardDetailData || !exchangeListData) {
    return redirect("/not-found");
  }

  return (
    <div className="w-[100%] pt-[20px] md:pt-[0px] pb-[40px] md:pb-[60px] lg:pb-[180px]">
      {/* XXX: 모바일에서는 페이지 타이틀 헤더에서 관리 */}
      <div className="hidden md:block py-[40px] lg:py-[60px] w-[100%]">
        <p className="text-gray-300 text-[16px] lg:text-[24px] font-BR-B">마켓플레이스</p>
      </div>

      {saleCardDetailData.isMine ? (
        // 판매자 페이지
        <SupplierPage
          saleCardData={saleCardDetailData}
          exchangeListData={exchangeListData}
          isExchangeListPending={isExchangeListPending}
        />
      ) : (
        // 구매자 페이지
        <ConsumerPage
          saleCardData={saleCardDetailData}
          exchangeListData={exchangeListData}
          isExchangeListPending={isExchangeListPending}
        />
      )}
    </div>
  );
}
