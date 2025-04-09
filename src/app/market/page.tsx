import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { photoCardKeys } from "@/utils/queryKeys";
import { getMarketPhotoCardsApi } from "@/services/market/getMarketPhotoCards";
import MarketplacePageClient from "./MarketplacePageClient";

export default async function MarketplacePage() {
  const queryClient = new QueryClient();

  // 서버 측에서 미리 데이터를 가져와서 hydration
  await queryClient.prefetchQuery({
    queryKey: photoCardKeys.marketList(),
    queryFn: () => getMarketPhotoCardsApi(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MarketplacePageClient />
    </HydrationBoundary>
  );
}
