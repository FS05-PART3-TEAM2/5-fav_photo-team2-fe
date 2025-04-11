// app/market/MarketplacePageClient.tsx
"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyInfoApi } from "@/services/market/getMyInfoApi";
import { photoCardKeys } from "@/utils/queryKeys";
import MarketplaceHeader from "@/components/market/list/MarketplaceHeader";
import CardGrid from "@/components/market/list/CardGrid";
import { SellerPage } from "@/components/market/list/seller/SellerPage";
import SellForm from "@/components/market/list/seller/SaleForm";
import { useState, useEffect, useRef, useMemo } from "react";
import { SaleCardDto, MarketplacePhotoCardDto } from "@/types/photocard.types";
import ResponsiveForm from "@/components/common/responsiveLayout/responsiveForm/ResponsiveForm";
import { useSnackbarStore } from "@/store/useSnackbarStore";
import { useRouter } from "next/navigation";
import { useMarketplacePhotoCards } from "@/hooks/market/list/useMarketplacePhotoCards";

export default function MarketplacePageClient() {
  const router = useRouter();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const queryClient = useQueryClient();

  const { openSnackbar } = useSnackbarStore();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useMarketplacePhotoCards();

  const photoCards: MarketplacePhotoCardDto[] = useMemo(
    () => data?.pages.flatMap(page => page.list) ?? [],
    [data]
  );
  //console.log("🧪 [4] MarketplacePageClient data.pages:", data?.pages);

  // const photoCards: MarketplacePhotoCardDto[] = data?.pages.flatMap(page => page.list) ?? [];

  //console.log("🧪 [5] MarketplacePageClient photoCards:", photoCards);

  const [filteredCards, setFilteredCards] = useState<MarketplacePhotoCardDto[]>(photoCards);
  const [isSellerPageOpen, setIsSellerPageOpen] = useState(false);
  const [isSellFormOpen, setIsSellFormOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<SaleCardDto | null>(null);

  // 👇 로그인 유저 정보 가져오기
  const { data: user } = useQuery({
    queryKey: ["me"],
    queryFn: () => getMyInfoApi(),
    retry: false, // 로그인 안 되어있을 때 무한 재시도 방지
  });
  //console.log();
  const handleOpenMyPhotoList = () => {
    if (!user) {
      openSnackbar("ERROR", "로그인 후 이용해주세요.");
      router.push("/auth/login");
      setIsSellerPageOpen(false);
      return;
    }
    setIsSellerPageOpen(true);
    setSelectedCard(null);
  };

  const handleCardSelect = (converted: SaleCardDto) => {
    setSelectedCard(converted);
    setIsSellerPageOpen(false);
    setIsSellFormOpen(true);
  };

  const handleSellFormClose = () => {
    setIsSellFormOpen(false);
    setSelectedCard(null);

    // ✅ 판매 등록 후 서버 데이터 반영을 위해 캐시 무효화
    queryClient.invalidateQueries({ queryKey: photoCardKeys.all });
  };

  // ✅ 무한스크롤 옵저버 등록
  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage || isFetchingNextPage) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        //console.log("📦 isIntersecting:", entry.isIntersecting);
        //console.log("📦 boundingClientRect:", entry.boundingClientRect);
        //console.log("📦 intersectionRect:", entry.intersectionRect);
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          //console.log("👀 [Observer] Trigger fetchNextPage");
          //console.log("✅ Intersected! fetchNextPage 호출");
          //console.log("🎀hasNextPage:", hasNextPage);
          fetchNextPage();
        }
      },
      {
        root: document.querySelector(".overflow-y-scroll"),
        threshold: 0.1,
      }
    );

    observerRef.current.observe(loadMoreRef.current);

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    setFilteredCards(photoCards); // 조건 없이 무조건 최신 데이터로 갱신
  }, [photoCards]);

  //console.log("데이터확인용", photoCards);
  return (
    <>
      <MarketplaceHeader
        photoCards={photoCards}
        onClickSellButton={handleOpenMyPhotoList}
        onFilterChange={({ searchTerm, grade, genre, isSoldOut, orderBy }) => {
          const filtered = photoCards
            .filter(card => card.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .filter(card => grade === "default" || card.grade === grade)
            .filter(card => genre === "default" || card.genre === genre)
            .filter(card =>
              isSoldOut === "default"
                ? true
                : isSoldOut === "SOLD_OUT"
                  ? card.status === "SOLD_OUT"
                  : card.status !== "SOLD_OUT"
            )
            .sort((a, b) => {
              if (orderBy === "latest") {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
              } else if (orderBy === "oldest") {
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
              } else if (orderBy === "expensive") {
                return b.price - a.price;
              } else {
                return a.price - b.price;
              }
            });

          setFilteredCards(filtered);
        }}
      />
      <CardGrid photoCards={filteredCards} />

      {/* 무한스크롤 로딩 감지 지점 */}
      <div ref={loadMoreRef} className="w-[100%] py-4 flex justify-center">
        {isFetchingNextPage && <p className="text-main">데이터를 불러오는 중...</p>}
      </div>

      {isSellerPageOpen && (
        <SellerPage
          isOpen={isSellerPageOpen}
          onClose={() => setIsSellerPageOpen(false)}
          setSelectedCard={handleCardSelect}
        />
      )}

      {isSellFormOpen && selectedCard && (
        <>
          <ResponsiveForm title="판매 등록" isOpen={isSellFormOpen} onClose={handleSellFormClose}>
            <SellForm
              data={selectedCard}
              onSubmit={handleSellFormClose} // 판매 성공 후 모달 닫기용
              onCancel={handleSellFormClose}
            />
          </ResponsiveForm>
        </>
      )}
    </>
  );
}
