import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { photoCardKeys } from "@/utils/queryKeys";
import { getMarketPhotoCardsApi } from "@/services/market/getMarketPhotoCards";
import MarketplacePageClient from "./MarketplacePageClient";
import { Grade, Genre, SaleCardStatus, Sort } from "@/types/photocard.types";

export default async function MarketplacePage() {
  const queryClient = new QueryClient();

  const defaultFilter = {
    keyword: "",
    grade: "default",
    genre: "default",
    status: "default",
    sort: "latest",
  } as unknown as {
    keyword: string;
    grade: Grade;
    genre: Genre;
    status: SaleCardStatus;
    sort: Sort;
  };

  await queryClient.prefetchQuery({
    queryKey: photoCardKeys.saleList(defaultFilter),
    queryFn: () => getMarketPhotoCardsApi(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MarketplacePageClient />
    </HydrationBoundary>
  );
}
