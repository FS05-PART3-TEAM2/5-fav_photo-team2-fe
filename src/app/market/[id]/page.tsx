// 포토카드 상세페이지
// import { cookies } from "next/headers";
// import { SupplierPage } from "./SupplierPage";
// import { ConsumerPage } from "./ConsumerPage";
// import { useExchangeCardList } from "@/hooks/market/detail/useExchangeCardService";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import ClientPageComponent from "./ClientPageComponent";
import { photoCardKeys } from "@/utils/queryKeys";
import { getSaleCardExchangeListApi } from "@/services/market/getSaleCardExchangeList";
import { getSaleCardDetailApi } from "@/services/market/getSaleCardDetail";
import { redirect } from "next/navigation";

// XXX: 판매 카드 기본 상세 정보는 서버사이드 fetch,
// XXX: 교환 목록은 reactQuery로 CSR 처리
export default async function PhotoCardDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const queryClient = new QueryClient();

  try {
    const [saleCardDetail, exchangeCardList] = await Promise.all([
      getSaleCardDetailApi(id),
      getSaleCardExchangeListApi(id),
    ]);

    console.log("detail 불러왔는지:", saleCardDetail);
    console.log("exchangeList 불러왔는지:", exchangeCardList);

    // queryClient에 데이터 설정
    await Promise.all([
      queryClient.setQueryData(photoCardKeys.detail(id), saleCardDetail),
      queryClient.setQueryData(photoCardKeys.exchangeCardList(id), exchangeCardList),
    ]);

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ClientPageComponent saleCardId={id} />
      </HydrationBoundary>
    );
  } catch (error) {
    // 에러 처리
    console.error("Error fetching data:", error);
    return redirect("/not-found");
  }

  // return (
  //   <div className="w-[100%] pt-[20px] md:pt-[0px] pb-[40px] md:pb-[60px] lg:pb-[180px]">
  //     {/* XXX: 모바일에서는 페이지 타이틀 헤더에서 관리 */}
  //     <div className="hidden md:block py-[40px] lg:py-[60px] w-[100%]">
  //       <p className="text-gray-300 text-[16px] lg:text-[24px] font-BR-B">마켓플레이스</p>
  //     </div>

  //     {saleCardData.isMine ? (
  //       // 판매자 페이지
  //       <SupplierPage
  //         saleCardData={saleCardData}
  //         exchangeListData={exchangeListData}
  //         isExchangeListPending={isExchangeListPending}
  //       />
  //     ) : (
  //       // 구매자 페이지
  //       <ConsumerPage
  //         saleCardData={saleCardData}
  //         exchangeListData={exchangeListData}
  //         isExchangeListPending={isExchangeListPending}
  //       />
  //     )}
  //   </div>
  // );
}
