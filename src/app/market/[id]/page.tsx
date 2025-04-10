// 포토카드 상세페이지
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import ClientPageComponent from "./ClientPageComponent";
import { photoCardKeys } from "@/utils/queryKeys";
import { getSaleCardExchangeListApi } from "@/services/market/getSaleCardExchangeList";
import { getSaleCardDetailApi } from "@/services/market/getSaleCardDetail";

export default async function PhotoCardDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const queryClient = new QueryClient();

  const cookieStore = cookies();
  const cookie = (await cookieStore).toString();

  try {
    const [saleCardDetail, exchangeCardList] = await Promise.all([
      getSaleCardDetailApi(id, cookie),
      getSaleCardExchangeListApi(id, cookie),
    ]);

    await Promise.all([
      queryClient.setQueryData(photoCardKeys.detail(id), saleCardDetail),
      queryClient.setQueryData(photoCardKeys.exchangeCardList(id), exchangeCardList),
    ]);

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ClientPageComponent />
      </HydrationBoundary>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return redirect("/not-found");
  }
}
